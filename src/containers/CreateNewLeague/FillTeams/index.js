import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { lightBlue } from '../../../constants/style';
// import Autocomplete from './Autocomplete';
import Datalist from './Datalist';
import MemberTeamList from './MemberTeamList';
import Button from '../../../components/Button';

const Container = styled.div`
    margin-top: 40px;
    width: 100%;
    
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
`;

const MemberTeamLists = styled.div`
  border: 1px solid black;
`;

const FillTeamsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TeamText = styled.p``;

const Option = styled.option``;

const Select = styled.select``;

const TeamValue = styled.div``;
const TeamName = styled.div``;
const SlotContent = styled.div``;
const SlotName = styled.div``;
const Slot = styled.div``;
const SlideButton = styled.button`
  display: flex;
  align-items: center;
  background-color: ${lightBlue};
  padding: 20px;
  width: 80px;
  height: 40px;
  color: black;
  text-align: center;
  border: 4px double #cccccc;
  border-radius: 10px;
  font-size: 28px;
  cursor: pointer;
  margin: 5px;
  -webkit-transition: all 0.5s; 
  -moz-transition: all 0.5s; 
  -o-transition: all 0.5s; 
  transition: all 0.5s;
`;

function FillTeams({ cnlProps }) {
  const {
    leaguesUsed,
    sportTeams,
    memberRosters,
    memberRosterIndex,
    setMemberRosterIndex,
    getAutocompleteSuggestions,
    changeTeamInput,
    submitRoster,
    changeTeamValue,
  } = cnlProps;

  // const handleTeamValueChange = () => {
  //   console.log('changing')
  // }
  return (
    <Container>

      {memberRosters.map((member, index) => (
        index === memberRosterIndex
          ? (
            <FillTeamsContainer>
              {
                index === 0
                  ? null
                  : <Button onClick={() => setMemberRosterIndex(memberRosterIndex - 1)}>⬅️</Button>
              }
              <MemberTeamLists>
                <div key={`${member.name}-${index}-fillTeams`}>
                  <MemberTeamList
                    currentMember={member}
                    changeTeamInput={changeTeamInput}
                    getAutocompleteSuggestions={getAutocompleteSuggestions}
                    changeTeamValue={changeTeamValue}
                  />
                </div>
              </MemberTeamLists>
              {index === memberRosters.length - 1 ? null : <Button onClick={() => setMemberRosterIndex(memberRosterIndex + 1)}>➡️</Button>}
            </FillTeamsContainer>
          )
          : null
      ))}

      <button type="button" onClick={submitRoster}>Submit Roster</button>
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
