import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import "@fontsource/open-sans";
import useApi from "../../hooks/useApi";
import RosterComponent from '../../components/Roster'
import Loading from "../../components/Loading";
import useHydration from "../../hooks/useHydration";
import {Container, League, LeagueSelector} from './components'
import useAddTeam from "./useAddTeam";

function AddTeam(props) {

    const {readyToRender, orgMembers, selectedMember, handleChange, currentRoster, sportTeams, league, setLeague, unownedTeams} = useAddTeam()


  return (
    readyToRender ?
    <Container>
        <p>Add Team</p>
        <p>Add Team</p>
        <h1>Current Rosters</h1>
        <label>Choose a member</label>
        <select value={selectedMember} onChange={e => handleChange(e.target.value)}name="currentTeams">
        {
            Object.keys(orgMembers).map(memberId => (
                <option key={memberId} value={memberId}>{orgMembers[memberId].team_name}</option>
            ))
        }
        </select>
        <h2>Here is roster</h2>
        <p>RoFL cash: ${currentRoster.cash}</p>
        {
            Object.keys(currentRoster).filter(el => el!=='cash').map(el => {
                let teamId = currentRoster[el].teamId
                let leagueId = currentRoster[el].leagueId
                if(currentRoster[el].teamId) {
                    return(
                        <div key={el}>
                        <p>{sportTeams[leagueId][teamId].city} {sportTeams[leagueId][teamId].name} - ${currentRoster[el].val}</p>
                        {/* <button>{selectedMember === currentOrganization.user_id ? "Trade" : "Drop"}</button> */}
                        </div>
                        )
                }
            })
        }
        <h3>Unowned Teams</h3>
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
        
          {unownedTeams[league].map(team => (
              <p key={team}>{sportTeams[league][team].city} {sportTeams[league][team].name}</p>
          ))}
 
    </Container>  : <Loading/>
  );
}

export default AddTeam;
