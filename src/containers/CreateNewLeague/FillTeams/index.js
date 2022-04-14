import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import Autocomplete from './Autocomplete';
import Datalist from './Datalist'
import MemberTeamList from "./MemberTeamList";

const Container = styled.div`
    margin-top: 40px;
`;

const Input = styled.input`
  height: 50px;
  width: 340px;
  border: 0;
  border-radius: 4px;
  padding-left: 20px;
  font-size: 0.9em;
  background-color: #ECF1F4;
`;

const TeamList = styled.div`
border: 1px solid black;
`

const MemberTeamLists = styled.div`
  border: 1px solid black;
`

const TeamText = styled.p``

const Option = styled.option``

const Select = styled.select``

const TeamValue = styled.div``
const TeamName = styled.div``
const SlotContent = styled.div``
const SlotName = styled.div``
const Slot = styled.div``
const SlideButton = styled.button``

function FillTeams({cnlProps}) {

  const {
    leaguesUsed,
    sportTeams,
    memberRosters,
    memberRosterIndex,
    setMemberRosterIndex,
    getAutocompleteSuggestions,
    changeTeamInput,
    submitRoster,
    changeTeamValue
  } = cnlProps

  // const handleTeamValueChange = () => {
  //   console.log('changing')
  // }
  return (
    <Container>
        <MemberTeamLists>
          {memberRosters.map((member, index) => (
            index === memberRosterIndex ?
            <div key={`${member.name}-${index}-fillTeams`}>
            <SlideButton disabled={index===0 ? true : false} onClick={() => setMemberRosterIndex(memberRosterIndex-1)}>{'<-'}</SlideButton>
            <MemberTeamList
              currentMember={member}
              changeTeamInput={changeTeamInput}
              getAutocompleteSuggestions={getAutocompleteSuggestions}
              changeTeamValue={changeTeamValue}
            />
            <SlideButton disabled={index===memberRosters.length-1 ? true : false} onClick={() => setMemberRosterIndex(memberRosterIndex+1)}>{'->'}</SlideButton>
            </div>
            : null
          ))}

        </MemberTeamLists>
        <button type='button' onClick={submitRoster}>Submit Roster</button>
        {/* {
          leaguesUsed.map(league => (
            <TeamList>
              <p>League {league}</p>
              {sportTeams[league].map(team => (
                <TeamText crossedOut={team.crossedOut}>{team.city} {team.name}</TeamText>
              ))}
              
            </TeamList>
          ))
        } */}
    </Container>
  );
}

export default FillTeams;