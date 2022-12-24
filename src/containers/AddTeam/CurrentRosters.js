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
import { toast } from "react-toastify";

function CurrentRosters({selectedMember, handleChange, handleTrade, currentRoster, dropTeam}) {
    
    const { sportTeams, orgMembers } = useSelector((state) => ({
        ...state.sportReducer
    }));

    const { currentOrganization } = useSelector((state) => ({
        ...state.authReducer
      }));

    const getMemberActionButton = (teamId) => {
        if(Number(selectedMember) === Number(currentOrganization.user_id)){
            return <ActionButton onClick={() => dropTeam(teamId)}>{"Drop"}</ActionButton>
            // return <ActionButton onClick={() => dropTeam(teamId)}>{"Drop"}</ActionButton>
        } else {
            return <ActionButton onClick={handleTrade}>{"Trade"}</ActionButton>
        }
    }

  return (
<Container>
        <Label>Choose a member</Label>
        <Select value={selectedMember} onChange={e => handleChange(e.target.value)}name="currentTeams">
        {
            Object.keys(orgMembers).map(memberId => (
                <option key={memberId} value={memberId}>{orgMembers[memberId].team_name}</option>
            ))
        }
        </Select>
        <CashContainer>
        <p>RoFL cash: ${currentRoster.cash}</p>
        </CashContainer>
        <TitleRow>
            <Th style={{ width: "200px" }}>
            Team
            </Th>
            <Th style={{ width: "70px" }}>
            Value
            </Th>
            <Th style={{ width: "70px" }}>
            Action
            </Th>
        </TitleRow>
        {
            Object.keys(currentRoster).filter(el => el!=='cash').map(el => {
                let teamId = currentRoster[el].teamId
                let leagueId = currentRoster[el].leagueId
                if(currentRoster[el].teamId) {
                    return(
                        <SlotRow key={el}>
                        <Td style={{ width: "200px" }}>{sportTeams[leagueId][teamId].city} {sportTeams[leagueId][teamId].name} </Td>
                        <Td style={{ width: "70px" }}>${currentRoster[el].val}</Td>
                        <Td style={{ width: "70px" }}>
                            {getMemberActionButton(currentRoster[el].teamId)}
                        </Td>
                        {/* <button>{selectedMember === currentOrganization.user_id ? "Trade" : "Drop"}</button> */}
                        </SlotRow>
                        )
                }
            })
        }
</Container>
  );
}

export default CurrentRosters;
