import React, { useState, useEffect, useInsertionEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import '@fontsource/open-sans';
import { toast } from 'react-toastify';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import useApi from '../../hooks/useApi';
import RosterComponent from '../../components/Roster';
import Loading from '../../components/Loading';
import useHydration from '../../hooks/useHydration';
import {
  Section,
  Select,
  Label,
  Headline,
  League,
  LeagueSelector,
  slotData,
  SlotRow,
  Th,
  TitleRow,
  Td,
  Details,
  DetailsHeader,
  CashContainer,
} from './components';
import useAddTeam from './useAddTeam';
import { convertRealToRofl, convertDateObjToReadable } from '../../utils';
import MonthTicker from '../../components/MonthTicker';
import YearSelector from '../../components/YearSelector';
import BidRow from './BidRow';
import { mobileBreakPoint } from '../../constants/style';
import MonthSelector from '../../components/MonthSelector';

const Container = styled.div`
width: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
    margin-top: 50px;
`;

const ScoringContainer = styled.div`
    display: grid;
    grid-template-columns: ${(props) => (props.currentMonthIncludesCurrentBid ? '1fr 2fr 1fr 1fr 2fr 1fr' : '2fr 1fr 1fr 2fr')};
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    margin-top: 15px;
    border: 2px solid #E5EAF4;
    width: 90%;
    border-radius: 10px;
    @media (max-width: ${mobileBreakPoint}){
      
      grid-template-columns: ${(props) => (props.currentMonthIncludesCurrentBid ? '1fr 2fr 1fr 1fr' : '1fr 1fr')};
     }
`;

const HeaderLabel = styled.div`
    padding: 16px 0px 8px 16px;
    text-align:center;
    background-color: #F7FBFF;
    font-weight: 800;
    font-size: 14px;
    display: ${(props) => (props.onlyMobile && 'none')};

    &:hover{
      cursor: pointer;
      text-decoration: underline;
  }
    @media (max-width: ${mobileBreakPoint}){
      display: ${(props) => (props.mobile ? 'inline-block' : 'none')};
      font-size: 10px;
      padding-right: 16px;
     }
`;


function CurrentBids({
  allBids,
  setAllBids,
  sportTeams,
  currentOrganization,
  reFetchBids,
  originalBids,
}) {
  const { makeRequest, isLoading } = useApi();

  const { selectedYear } = useSelector((state) => ({
    ...state.sportReducer,
  }));

  const dispatch = useDispatch();

  // const [selectedRoflYear, setSelectedRoflYear] = useState(2022);
  // default value should be latest month in allBids table
  const [roflMonth, setRoflMonth] = useState(allBids ? Math.max(...Object.keys(allBids)) : null);
  const [
    currentMonthIncludesCurrentBid,
    setCurrentMonthIncludesCurrentBid,
  ] = useState(false);
  const [havePrioritiesChanged, setHavePrioritiesChanged] = useState(false);
  const [selectedBid, setSelectedBid] = useState(null);

  // useEffect(() => {
  //   console.log('selected bid changed');
  //   console.log(selectedBid);
  // }, [selectedBid]);

  // uncomment this after redesign
  useEffect(() => {
    if (roflMonth && allBids && allBids[roflMonth]) {
      let newValue = false;
      allBids[roflMonth].forEach((bid) => {
        if (bid.current === 1) newValue = true;
      });
      setCurrentMonthIncludesCurrentBid(newValue);
    }
  }, [roflMonth]);

  const activeYearArray = Object.keys(currentOrganization.activeYears);

  const sleep = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const saveRoster = async () => {
    try {
      const res = await makeRequest({
        method: 'patch',
        route: 'users/bids',
        data: { bids: allBids[roflMonth] },
      });
      const { body } = res;
      if (body === 'success') {
        toast.success('Sucessfully changed bids');
        setHavePrioritiesChanged(false);
        // sleep is necessary to fetch correct data
        // yeah, theres probably a better way
        await sleep(300);
        await reFetchBids();
      }
    } catch (e) {
      console.log('problem');
      console.error(e);
    }
  };

  const leagueFromTeamId = (team) => Number(String(team)[0]);

  const deleteBid = async (bidId) => {
    const isConfirmed = confirm('Are you sure you want to delete this bid?');
    if (!isConfirmed) {
      return;
    }
    try {
      const res = await makeRequest({
        method: 'delete',
        route: `users/bids/delete/${bidId}`,
      });
      const { body } = res;
      //   if success show message
      if (body === 'success') {
        toast.success('Sucessfully deleted bid');
      }
      // then refetch bids
      await reFetchBids();
    } catch (e) {
      console.log('problem');
      console.error(e);
    }
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    for (let i = 0; i < result.length; i++) {
      result[i].priority = i + 1;
    }

    return result;
  };

  const mobileSwitch = (bidIndex) => {
    if (selectedBid === null) {
      setSelectedBid(bidIndex);
    } else {
      const newMonthBids = reorder(
        allBids[roflMonth],
        selectedBid,
        bidIndex,
      );
      const newBids = allBids;
      newBids[roflMonth] = newMonthBids;
      if (originalBids !== JSON.stringify(newBids)) {
        setHavePrioritiesChanged(true);
      } else {
        setHavePrioritiesChanged(false);
      }
      setAllBids(newBids);
      setSelectedBid(null);
    }
  };

  const showBidDetails = (bid) => {
    dispatch({
      type: 'SHOW_MODAL',
      payload: {
        modalContent: 'BID_DETAILS',
        props: {
          bid,
        },
      },
    });
  };

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const newMonthBids = reorder(
      allBids[roflMonth],
      result.source.index,
      result.destination.index,
    );
    const newBids = allBids;
    newBids[roflMonth] = newMonthBids;
    if (originalBids !== JSON.stringify(newBids)) {
      setHavePrioritiesChanged(true);
    } else {
      setHavePrioritiesChanged(false);
    }
    setAllBids(newBids);
  };

  return (
    <Container>
      {
        allBids && allBids[roflMonth] && allBids[roflMonth].length
          ? (
            <>
              {/* {activeYearArray.length === 2 ? (
                    <YearSelector
                      activeYearArray={activeYearArray}
                    />
                  ) : (
                    <YearContainer>
                      <p>
                        MSFAs Year:
                        {selectedRoflYear}
                      </p>
                    </YearContainer>
                  )} */}

              <MonthSelector
                selectedMonth={roflMonth}
                setSelectedMonth={setRoflMonth}
                onlyShownMonths={Object.keys(allBids).map((n) => Number(n))}
              />
              <ScoringContainer currentMonthIncludesCurrentBid={currentMonthIncludesCurrentBid}>
                {currentMonthIncludesCurrentBid ? (
                  <HeaderLabel mobile>Move</HeaderLabel>
                ) : null}
                <HeaderLabel mobile>Team</HeaderLabel>
                <HeaderLabel>Priority</HeaderLabel>
                <HeaderLabel>Value</HeaderLabel>
                <HeaderLabel>Teams Dropped</HeaderLabel>
                <HeaderLabel mobile onlyMobile>Details</HeaderLabel>
                {currentMonthIncludesCurrentBid ? (
                  <HeaderLabel mobile>Delete</HeaderLabel>
                ) : null}
                {allBids[roflMonth].map((bid, index) => (
                  <BidRow
                    bid={bid}
                    index={index}
                    sportTeams={sportTeams}
                    currentMonthIncludesCurrentBid={currentMonthIncludesCurrentBid}
                    deleteBid={deleteBid}
                    leagueFromTeamId={leagueFromTeamId}
                    mobileSwitch={mobileSwitch}
                    selectedBid={selectedBid}
                    setSelectedBid={setSelectedBid}
                    showBidDetails={showBidDetails}
                    colored={!!(index % 2 === 1)}
                  />
                ))}
              </ScoringContainer>
              {
                havePrioritiesChanged ? (
                  <div>
                    Your roster priorities have changed
                    <button onClick={saveRoster}>Save</button>
                  </div>
                ) : null
              }
            </>
          )
          : <p>There are no bids to show</p>
      }
    </Container >
  );
}

export default CurrentBids;
