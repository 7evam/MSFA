import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "@fontsource/open-sans";
import useApi from "../../hooks/useApi";

import {
  Th,
  TitleRow,
} from "./components";
import MonthTicker from "../../components/MonthTicker";
import YearSelector from "../../components/YearSelector";
import { toast } from "react-toastify";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import BidRow from "./BidRow";

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

const Test = styled.div`
`

function CurrentBids({
  allBids,
  setAllBids,
  sportTeams,
  currentOrganization,
  reFetchBids,
  originalBids
}) {
  const { makeRequest, isLoading } = useApi();

  const [selectedRoflYear, setSelectedRoflYear] = useState(2022);
  // default value should be latest month in allBids table
  const [roflMonth, setRoflMonth] = useState(allBids ? Math.max(...Object.keys(allBids)) : null);
  const [
    currentMonthIncludesCurrentBid,
    setCurrentMonthIncludesCurrentBid
  ] = useState(false);
  const [havePrioritiesChanged, setHavePrioritiesChanged] = useState(false)


  useEffect(() => {
    if (roflMonth && allBids && allBids[roflMonth]) {
      let newValue = false;
      allBids[roflMonth].forEach((bid) => {
        if (bid.current === 1) newValue = true;
      });
      setCurrentMonthIncludesCurrentBid(newValue);
    }
  }, [roflMonth]);

  let activeYearArray = Object.keys(currentOrganization.activeYears);

  const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const saveRoster = async () => {
    try {
      var res = await makeRequest({
        method: "patch",
        route: `users/bids`,
        data: { bids: allBids[roflMonth] }
      })
      const body = res.body
      if (body === 'success') {
        toast.success('Sucessfully changed bids')
        setHavePrioritiesChanged(false)
        // sleep is necessary to fetch correct data 
        // yeah, theres probably a better way
        await sleep(300)
        await reFetchBids()
      }
    } catch (e) {
      console.log('problem')
      console.error(e)
    }
  }

  const leagueFromTeamId = (team) => {
    return Number(String(team)[0]);
  };

  const deleteBid = async (bidId) => {
    try {
      var res = await makeRequest({
        method: "delete",
        route: `users/bids/delete/${bidId}`
      });
      const body = res.body;
      //   if success show message
      if (body === "success") {
        toast.success("Sucessfully deleted bid");
      }
      // then refetch bids
      await reFetchBids();
    } catch (e) {
      console.log("problem");
      console.error(e);
    }
  };

  const reorder = (list, startIndex, endIndex) => {

    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    for (let i = 0; i < result.length; i++) {
      result[i].priority = i + 1
    }

    return result
  }

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const newMonthBids = reorder(
      allBids[roflMonth],
      result.source.index,
      result.destination.index
    )
    const newBids = allBids
    newBids[roflMonth] = newMonthBids
    if (originalBids !== JSON.stringify(newBids)) {
      setHavePrioritiesChanged(true)
    } else {
      setHavePrioritiesChanged(false)
    }
    setAllBids(newBids)
  }

  console.log('here is all bids')
  console.log(allBids)

  return (
    <div>
      {
        allBids && allBids[roflMonth] && allBids[roflMonth].length
          ?
          <div>
            {activeYearArray.length === 2 ? (
              <YearSelector
                activeYearArray={activeYearArray}
                setSelectedRoflYear={setSelectedRoflYear}
                selectedRoflYear={selectedRoflYear}
              />
            ) : (
              <YearContainer>
                <p>MSFA Year: {selectedRoflYear}</p>
              </YearContainer>
            )}

            <MonthTicker
              roflMonth={roflMonth}
              setRoflMonth={setRoflMonth}
              selectedRoflYear={selectedRoflYear}
              onlyShownMonths={Object.keys(allBids).map((n) => Number(n))}
            />
            <MonthContainer>
              <p>MSFA Month: {roflMonth}</p>
            </MonthContainer>
            <Test>
              <TitleRow>
                {currentMonthIncludesCurrentBid ? (
                  <Th width={'col1width'}>Move</Th>
                ) : null}
                <Th width={'col2width'}>Team</Th>
                <Th width={'col3width'}>Priority</Th>
                <Th width={'col4width'}>Value</Th>
                <Th width={'col5width'}>Teams Dropped</Th>
                {currentMonthIncludesCurrentBid ? (
                  <Th width={'col6width'}>Delete</Th>
                ) : null}
              </TitleRow>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    //   style={getListStyle(snapshot.isDraggingOver)}
                    >
                      {allBids[roflMonth].map((bid, index) => (
                        <BidRow
                          bid={bid}
                          index={index}
                          sportTeams={sportTeams}
                          currentMonthIncludesCurrentBid={currentMonthIncludesCurrentBid}
                          deleteBid={deleteBid}
                          leagueFromTeamId={leagueFromTeamId}
                        />
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
              {havePrioritiesChanged ? <div>Your roster priorities have changed <button onClick={saveRoster}>Save</button></div> : null}
            </Test>
          </div>
          : <p>There are no bids to show</p>
      }
    </div>
  );
};

export default CurrentBids;