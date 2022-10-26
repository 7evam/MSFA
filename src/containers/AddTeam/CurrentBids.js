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

function CurrentBids({currentBids, sportTeams}) {
    
    // const {currentBids, handleClaim, currentDate, activeYears, deadlines, dropTeam, handleAction, readyToRender, orgMembers, selectedMember, handleChange, currentRoster, sportTeams, league, setLeague, unownedTeams, currentOrganization} = useAddTeam()

  return (
      <div>
    {
        currentBids.map(bid => {
            let teamsForDrop = []
            teamsForDrop.push(bid.dropped_team_1, bid.dropped_team_2, bid.dropped_team_3)
            return(
            <div key={bid.id} style={{border: '1px solid black'}}>
                <p>Priority: {bid.priority}</p>
                <p>Team: {sportTeams[String(bid.team_id)[0]][bid.team_id].city} {sportTeams[String(bid.team_id)[0]][bid.team_id].name}</p>
                <p>Value: {bid.bid_value}</p>
                {
                    !teamsForDrop[0] 
                    ? 
                    <p>No teams will be conditionally dropped for this transaction</p>
                    : 
                    <>
                        <p>If this bid is successful the following teams will be conditionally dropped:</p> 
                        <ul>
                            {<li>{sportTeams[String(teamsForDrop[0])[0]][teamsForDrop[0]].city} {sportTeams[String(teamsForDrop[0])[0]][teamsForDrop[0]].name}</li>}
                            {teamsForDrop[1] ? <li>{sportTeams[String(teamsForDrop[1])[0]][teamsForDrop[1]].city} {sportTeams[String(teamsForDrop[1])[0]][teamsForDrop[1]].name}</li> : null }
                            {teamsForDrop[2] ? <li>{sportTeams[String(teamsForDrop[2])[0]][teamsForDrop[2]].city} {sportTeams[String(teamsForDrop[2])[0]][teamsForDrop[2]].name}</li> : null }
                            
                        </ul>
                    </>
                }
            </div>
            )
        })
    }
</div>
  );
}

export default CurrentBids;
