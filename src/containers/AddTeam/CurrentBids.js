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
  ActionButton,

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

const MonthContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 18px;
`;

const YearContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 18px;
`;

const Table = styled.table`
@media (max-width: ${mobileBreakPoint}){
   width: 100%;
  }

`;

const Test = styled.div`
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
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
      console.log('in if');
      setSelectedBid(bidIndex);
    } else {
      console.log('in else');
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
                <div>
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

                  <MonthTicker
                    roflMonth={roflMonth}
                    setRoflMonth={setRoflMonth}
                    onlyShownMonths={Object.keys(allBids).map((n) => Number(n))}
                    selectedYear={selectedYear}
                  />
                  <MonthContainer>
                    <p>
                      MSFA Month:
                      {roflMonth}
                    </p>
                  </MonthContainer>
                  <Table>
                    <tbody>
                      <TitleRow>
                        {currentMonthIncludesCurrentBid ? (
                          <Th width="col1width">Move</Th>
                        ) : null}
                        <Th width="col2width">Team</Th>
                        <Th width="col3width">Priority</Th>
                        <Th width="col4width">Value</Th>
                        <Th width="col5width">Teams Dropped</Th>
                        <DetailsHeader>Details</DetailsHeader>
                        {currentMonthIncludesCurrentBid ? (
                          <Th width="col6width">Delete</Th>
                        ) : null}
                      </TitleRow>
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
                        />
                      ))}
                    </tbody>
                  </Table>
                  {havePrioritiesChanged ? (
                    <div>
                      Your roster priorities have changed
                      <button onClick={saveRoster}>Save</button>
                    </div>
                  ) : null}
                </div>
              )
              : <p>There are no bids to show</p>
        }
    </Container>
  );
}

export default CurrentBids;
