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

function AddTeam(props) {

    const {handleClaim, currentDate, activeYears, deadlines, dropTeam, handleAction, readyToRender, orgMembers, selectedMember, handleChange, currentRoster, sportTeams, league, setLeague, unownedTeams, currentOrganization} = useAddTeam()

    const getMemberActionButton = (teamId) => {
        if(Number(selectedMember) === Number(currentOrganization.user_id)){
            return <ActionButton onClick={() => dropTeam(teamId)}>{"Drop"}</ActionButton>
        } else {
            return <ActionButton onClick={handleAction}>{"Trade"}</ActionButton>
        }
    }

    const getUnownedActionButton = (leagueId) => {
        const claim = <ActionButton onClick={handleClaim}>{"Claim"}</ActionButton>
        const add = <ActionButton onClick={handleAction}>{"Add"}</ActionButton>
        // TOODO return claim if 3 days before end of real month or season start, add otherwise
        if(!activeYears[2022][leagueId]) return claim
        const currentRoflMonth = activeYears[2022][leagueId].roflMonth
        if(currentDate.date < deadlines[2022][leagueId][currentRoflMonth].deadline){
            return claim
        } else {
            return add
        }
        
    }

  return (
    readyToRender ?
    <Container>
        <Section>
        <Headline>Current Rosters</Headline>
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
                        <Td>{sportTeams[leagueId][teamId].city} {sportTeams[leagueId][teamId].name} </Td>
                        <Td>${currentRoster[el].val}</Td>
                        <Td>
                            {getMemberActionButton(currentRoster[el].teamId)}
                        </Td>
                        {/* <button>{selectedMember === currentOrganization.user_id ? "Trade" : "Drop"}</button> */}
                        </SlotRow>
                        )
                }
            })
        }
        </Section>
        <Section>
        <Headline>Unowned Teams</Headline>
            <LeagueSelector>
                <League selected={league == 1} onClick={() => setLeague(1)}>
                MLB
                </League>
                <League selected={league == 2} onClick={() => setLeague(2)}>
                NFL
                </League>
                <League selected={league == 3} onClick={() => setLeague(3)}>
                NHL
                </League>
                <League selected={league == 4} onClick={() => setLeague(4)}>
                NBA
                </League>
            </LeagueSelector>
            <TitleRow>
            <Th style={{ width: "200px" }}>
            Team
            </Th>
            <Th style={{ width: "70px" }}>
            Action
            </Th>
        </TitleRow>
          {unownedTeams[league].map(team => (
              <SlotRow key={team}>
                  <Td>{sportTeams[league][team].city} {sportTeams[league][team].name}</Td>
                  <Td>{getUnownedActionButton(league)}</Td>
              </SlotRow>
          ))}
 </Section>
    </Container>  : <Loading/>
  );
}

export default AddTeam;
