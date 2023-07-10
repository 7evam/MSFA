import React, { useRef } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { mobileBreakPoint, lightBlue, mediumBlue } from '../../constants/style';

const Select = styled.div`
    font-size: 16px;
    padding: 10px;
    width: 500px;
    height: 400px;
    overflow-y: scroll;
    background-color: ${lightBlue};
    @media (max-width: ${mobileBreakPoint}){
      width: 90vw;
  }
`;

const Option = styled.div`
    padding: 6px;
    margin-right: 6px;
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    background-color: ${(props) => (props.isSelected ? mediumBlue : null)}; 
    text-decoration: ${(props) => (props.removed ? 'line-through' : null)}; 
    &:hover {
      font-weight: 700;
      cursor: pointer;
    }
    @media (max-width: ${mobileBreakPoint}){
      width: 90vw;
  }
`;

function TeamList({ teams, setSelectedTeam, selectedTeam }) {
  return (
    <Select>
      {teams.map((team, index) => (
        <Option
          isSelected={selectedTeam?.name === team.name}
          key={team.name}
          value={team.name}
          onClick={() => setSelectedTeam(team)}
          removed={team.removed === true}
        >
          <span>{team.name}</span>
          <span>
            $
            {team.value ? team.value : 0}
          </span>
        </Option>
      ))}
    </Select>
  );
}

export default TeamList;
