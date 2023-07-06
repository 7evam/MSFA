import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { mobileBreakPoint } from '../../constants/style';
import TeamList from './TeamList';
import ValueInput from './ValueInput';
import { teamsInitial } from './initialTeams';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: "helvetica neue", Helvetica, arial, sans-serif; 

    @media (max-width: ${mobileBreakPoint}){
        width: 100vw;
    }
  `;
const Text = styled.p`
  width: 30vw;
`;
function ValueTool(props) {
  const sortTeams = (teams) => {
    function compare(a, b) {
      if (b.removed) return -2;
      if (a.value < b.value) {
        return 1;
      }
      if (a.value > b.value) {
        return -1;
      }
      return 0;
    }
    return teams.sort(compare);
  };

  const storedItems = localStorage.getItem('draft-values');
  const [teams, setTeams] = useState(storedItems ? JSON.parse(storedItems) : sortTeams(teamsInitial));
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [filter, setFilter] = useState('ALL');

  const saveTeams = (teams) => {
    localStorage.setItem('draft-values', JSON.stringify(teams));
  };

  const updateValue = (newValue, teamName) => {
    let newTeams = [...teams];
    const newTeam = newTeams.find((team) => team.name === teamName);
    newTeam.value = Number(newValue);
    newTeams = sortTeams(newTeams);
    saveTeams(newTeams);

    setTeams(newTeams);
  };

  const removeTeam = (teamName) => {
    let newTeams = [...teams];
    const newTeam = newTeams.find((team) => team.name === teamName);
    if (newTeam.removed) {
      newTeam.removed = false;
    } else {
      newTeam.removed = true;
    }
    newTeams = sortTeams(newTeams);

    saveTeams(newTeams);

    setTeams(newTeams);
  };

  const handleFilterChange = (newValue) => {
    setFilter(newValue);
  };

  return (
    <Container>
      <Text>
        Use this value tool to help prepare for your draft.
        You can set your own values for each of the draftable teams.
        Default values based on the advice from the
        commish and Vegas betting odds has been included by default.
        Your values will save to your browser and re-load
        even if you close your browser
      </Text>
      <label htmlFor="leagueFilter">Filter teams by league:</label>
      <select id="leagueFilter" value={filter} onChange={(e) => handleFilterChange(e.target.value)}>
        <option value="ALL">ALL</option>
        <option value="MLB">MLB</option>
        <option value="NFL">NFL</option>
        <option value="NHL">NHL</option>
        <option value="NBA">NBA</option>
      </select>
      {
            selectedTeam
              ? (
                <div>
                  <b>{selectedTeam.name}</b>
                  {' '}
                  :
                  {' '}

                  <ValueInput selectedTeam={selectedTeam} removeTeam={removeTeam} updateValue={updateValue} />
                </div>
              )
              : <h3>Select a team below</h3>
        }
      <TeamList selectedTeam={selectedTeam} teams={teams.filter((team) => (filter === 'ALL' ? true : team.league === filter))} setSelectedTeam={setSelectedTeam} />
    </Container>
  );
}

export default ValueTool;
