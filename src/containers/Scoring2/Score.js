import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { mobileBreakPoint } from '../../constants/style';
import MonthSelector from '../../components/MonthSelector';

const ScoringContainer = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr; 
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    width: 90%;
`;

const Cell = styled.div`
padding: 16px 0px 8px 16px;
border-bottom: ${(props) => (props.isLastInList ? null : '2px solid #E5EAF4')}; 
background-color: lightBlue;
`;
const HeaderLabel = styled.div`
    padding: 16px 0px 8px 16px;
    text-align:center;
    background-color: #EAEEF480;
    font-weight: 800;
    font-size: 14px;
    @media (max-width: ${mobileBreakPoint}){
      font-size: 10px;
      padding-right: 16px;
     }
`;

function Score({
  finalMonthForDisplay, selectedMonth, setSelectedMonth, scores, league, selectedYear,
}) {
  const [currentScores, setCurrentScores] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: null,
  });

  useEffect(() => {
    // Update currentScores when scores prop changes
    const newCurrentScores = scores?.points[league][`${selectedMonth}-${selectedYear}`];
    if (newCurrentScores) {
      const scoreArray = Object.entries(newCurrentScores).map(
        ([teamId, score]) => ({ teamId, score }),
      );
      setCurrentScores(scoreArray);
    }
  }, [scores, league, selectedMonth, selectedYear]);

  const sortTable = (key) => {
    const direction = sortConfig.direction === 'asc' ? 'asc' : 'dsc';

    const sortedScores = [...currentScores].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setCurrentScores(sortedScores);

    setSortConfig({
      key,
      direction: sortConfig.direction === 'asc' ? 'dsc' : 'asc',
    });
  };

  return (
    (currentScores) ? (
      <>
        <MonthSelector
          finalMonthForDisplay={finalMonthForDisplay}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
        />
        <ScoringContainer>
          <HeaderLabel onClick={() => sortTable('teamId')}>Team</HeaderLabel>
          <HeaderLabel onClick={() => sortTable('score')}>Points</HeaderLabel>
          {
  currentScores.map((team) => (
    <>
      <Cell>{team.teamId}</Cell>
      <Cell>{team.score}</Cell>
    </>
  ))
}
        </ScoringContainer>
      </>
    ) : <div>not calculating</div>
  );
}

export default Score;
