import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import "@fontsource/open-sans";
import useApi from "../../hooks/useApi";
import RosterComponent from '../../components/Roster'
import Loading from "../../components/Loading";
import useHydration from "../../hooks/useHydration";
import {Section, Select, Label, Headline, ActionButton, Container, League, LeagueSelector, slotData, SlotRow, Th, TitleRow, Td, Table, CashContainer} from './components'
import useAddTeam from "./useAddTeam";
import { convertRealToRofl, convertDateObjToReadable } from "../../utils";
import MonthTicker from "../../components/MonthTicker";
import YearSelector from "../../components/YearSelector";
import { toast } from "react-toastify";

const MonthContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-family: "Roboto", sans-serif;
  font-size: 18px;
`;

const YearContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-family: "Roboto", sans-serif;
  font-size: 18px;
`;

function CurrentBids({allBids, sportTeams, currentOrganization, reFetchBids}) {
    const { makeRequest, isLoading } = useApi();

    const [selectedRoflYear, setSelectedRoflYear] = useState(2022)
    // default value should be latest month in allBids table
    const [roflMonth, setRoflMonth] = useState(Math.max(...Object.keys(allBids)))
    const [currentMonthIncludesCurrentBid, setCurrentMonthIncludesCurrentBid] = useState(false)

    useEffect(() => {
        if(roflMonth){
            let newValue = false
            allBids[roflMonth].forEach(bid => {if(bid.current === 1) newValue = true})
            setCurrentMonthIncludesCurrentBid(newValue)
        }
      }, [roflMonth]);

    let activeYearArray = Object.keys(currentOrganization.activeYears)

    const leagueFromTeamId = (team) => {
        return Number(String(team)[0])
    }

    const deleteBid = async (bidId) => {
        try {
          var res = await makeRequest({
            method: "delete",
            route: `users/bids/${bidId}`
          });
          const body = res.body;
        //   if success show message
          if(body === "success"){
            toast.success("Sucessfully deleted bid")
          }
        // then refetch bids
          await reFetchBids()
        } catch (e) {
          console.log("problem");
          console.error(e);
        }
      };
    
  return (
      <div>
        {activeYearArray.length === 2 ? (
            <YearSelector
              activeYearArray={activeYearArray}
              setSelectedRoflYear={setSelectedRoflYear}
              selectedRoflYear={selectedRoflYear}
            />
          ) : (
            <YearContainer>
              <p>RoFL Year: {selectedRoflYear}</p>
            </YearContainer>
          )}

          <MonthTicker
            roflMonth={roflMonth}
            setRoflMonth={setRoflMonth}
            selectedRoflYear={selectedRoflYear}
            onlyShownMonths={Object.keys(allBids).map(n => Number(n))}
          />
          <MonthContainer>
            <p>RoFL Month: {roflMonth}</p>
          </MonthContainer>

          <TitleRow>
        <Th style={{ width: "200px" }}>Team</Th>
        <Th style={{ width: "70px" }}>Value</Th>
        <Th style={{ width: "200px" }}>Teams Dropped</Th>
        <Th style={{ width: "70px" }}>Priority</Th>
        {currentMonthIncludesCurrentBid ? <Th style={{ width: "70px" }}>Delete Bid</Th>: null}
      </TitleRow>
      {allBids[roflMonth].map(bid => 
        <SlotRow key={bid.team_id}>
          <Td>
            {sportTeams[leagueFromTeamId(bid.team_id)][bid.team_id].city} {sportTeams[leagueFromTeamId(bid.team_id)][bid.team_id].name}
          </Td>
          <Td>${bid.bid_value}</Td>
          <Td>
          {bid.dropped_team_1 ? `${sportTeams[leagueFromTeamId(bid.dropped_team_1)][bid.dropped_team_1].city} ${sportTeams[leagueFromTeamId(bid.dropped_team_1)][bid.dropped_team_1].name}` : 'None'}
          {bid.dropped_team_2 ? `, ${sportTeams[leagueFromTeamId(bid.dropped_team_2)][bid.dropped_team_2].city} ${sportTeams[leagueFromTeamId(bid.dropped_team_2)][bid.dropped_team_2].name}` : null}
          {bid.dropped_team_3 ? `, ${sportTeams[leagueFromTeamId(bid.dropped_team_3)][bid.dropped_team_3].city} ${sportTeams[leagueFromTeamId(bid.dropped_team_3)][bid.dropped_team_3].name}` : null}
          </Td>
          <Td>{bid.priority}</Td>
          {currentMonthIncludesCurrentBid ? <Td>{bid.current ? <button onClick={() => deleteBid(bid.id)}>Delete</button> : null}</Td> : null}
        </SlotRow>
      )}

</div>
  );
}

export default CurrentBids;

// {
//     currentBids.map(bid => {
//         let teamsForDrop = []
//         teamsForDrop.push(bid.dropped_team_1, bid.dropped_team_2, bid.dropped_team_3)
//         return(
//         <div key={bid.id} style={{border: '1px solid black'}}>
//             <p>Priority: {bid.priority}</p>
//             <p>Team: {sportTeams[String(bid.team_id)[0]][bid.team_id].city} {sportTeams[String(bid.team_id)[0]][bid.team_id].name}</p>
//             <p>Value: {bid.bid_value}</p>
//             {
//                 !teamsForDrop[0] 
//                 ? 
//                 <p>No teams will be conditionally dropped for this transaction</p>
//                 : 
//                 <>
//                     <p>If this bid is successful the following teams will be conditionally dropped:</p> 
//                     <ul>
//                         {<li>{sportTeams[String(teamsForDrop[0])[0]][teamsForDrop[0]].city} {sportTeams[String(teamsForDrop[0])[0]][teamsForDrop[0]].name}</li>}
//                         {teamsForDrop[1] ? <li>{sportTeams[String(teamsForDrop[1])[0]][teamsForDrop[1]].city} {sportTeams[String(teamsForDrop[1])[0]][teamsForDrop[1]].name}</li> : null }
//                         {teamsForDrop[2] ? <li>{sportTeams[String(teamsForDrop[2])[0]][teamsForDrop[2]].city} {sportTeams[String(teamsForDrop[2])[0]][teamsForDrop[2]].name}</li> : null }
                        
//                     </ul>
//                 </>
//             }
//         </div>
//         )
//     })
// }