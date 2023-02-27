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
    display: flex;
    flex-direction: column;
    align-items: center;
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

`;

const MemberTeamLists = styled.div`

`;

const FillTeamsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
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

const Dummy = styled.div`
  width: 57px;
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
    slotHashMap,
  } = cnlProps;

  // const handleTeamValueChange = () => {
  //   console.log('changing')
  // }
  return (
    <Container>
      <p>
        Fill out the teams and values of teams for each of the members
        in your season. Use the arrow buttons to switch between members
      </p>
      {memberRosters.map((member, index) => (
        index === memberRosterIndex
          ? (
            <FillTeamsContainer>
              {
                index === 0
                  ? <Dummy />
                  : <Button style={{ marginRight: '15px' }} onClick={() => setMemberRosterIndex(memberRosterIndex - 1)}>⬅️</Button>
              }
              <MemberTeamLists>
                <div key={`${member.name}-${index}-fillTeams`}>
                  <MemberTeamList
                    currentMember={member}
                    changeTeamInput={changeTeamInput}
                    getAutocompleteSuggestions={getAutocompleteSuggestions}
                    changeTeamValue={changeTeamValue}
                    slotHashMap={slotHashMap}
                  />
                </div>
              </MemberTeamLists>
              {index === memberRosters.length - 1 ? <Dummy /> : <Button style={{ marginLeft: '15px' }} onClick={() => setMemberRosterIndex(memberRosterIndex + 1)}>➡️</Button>}
            </FillTeamsContainer>
          )
          : null
      ))}

      <Button type="button" onClick={submitRoster}>Review Rosters</Button>
    </Container>
  );
}

export default FillTeams;
