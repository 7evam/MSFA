import React, { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { mobileBreakPoint } from '../../constants/style';
import MonthSelector from '../../components/MonthSelector';
import { getTeamName } from '../../utils';
import Loading from '../../components/Loading';

const ScoringContainer = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr; 
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    width: 90%;
    margin-top: 15px;
    border: 2px solid #E5EAF4;
    border-radius: 10px;
    & div:nth-child(4n+1){
      background-color: #F7FBFF;
    }
    & div:nth-child(4n+2){
      background-color: #F7FBFF;
    }
    }
`;

const Cell = styled.div`
    padding: 16px 0px 8px 16px;
    border-bottom: ${(props) => (props.isLastInList ? null : '2px solid #E5EAF4')}; 
    &:hover{
        text-decoration: ${(props) => (props.teamName ? 'underline' : null)}; 
        cursor: ${(props) => (props.teamName ? 'pointer' : null)}; 
    }
    @media (min-width: ${mobileBreakPoint}){
        ${(props) => !props.firstItem && `
            &:before {
                content: "";
                right: 0;
                z-index: 100;
                top: 0;
                height: 50%; 
                border-right: 2px solid #E5EAF4;
                margin-right: 8px;
            }
        `}
    }
    
    @media (max-width: ${mobileBreakPoint}){
        font-size: 14px;
    }
`;

const HeaderLabel = styled.div`
    padding: 16px 0px 8px 16px;
    text-align:center;
    background-color: #F7FBFF;
    font-weight: 800;
    font-size: 14px;
    &:hover{
      cursor: pointer;
      text-decoration: underline;
  }
    @media (max-width: ${mobileBreakPoint}){
      font-size: 10px;
      padding-right: 16px;
     }
`;

function Score({
  finalMonthForDisplay, firstMonthForDisplay, selectedMonth, setSelectedMonth, scores, league, selectedYear, sportTeams,
}) {
  const [currentScores, setCurrentScores] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: 'teamId',
    direction: 'asc',
  });

  useEffect(() => {
    // Update currentScores when scores prop changes
    if (!selectedMonth) return
    const newCurrentScores = scores?.points[league][`${selectedMonth}-${selectedYear}`];
    if (newCurrentScores) {
      const scoreArray = Object.entries(newCurrentScores).map(
        ([teamId, score, city, name]) => ({
          teamId, score, city, name,
        }),
      );
      setCurrentScores(scoreArray);
    }
  }, [scores, league, selectedMonth, selectedYear]);

  const sortTable = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    const sortedScores = [...currentScores].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setCurrentScores(sortedScores);

    setSortConfig({
      key,
      direction,
    });
  };

  const displayArrow = (column) => {
    if (sortConfig.key === column) {
      if (column === 'score') return sortConfig.direction === 'asc' ? '↓' : '↑'
      return sortConfig.direction === 'asc' ? '↑' : '↓'
    }
  }

  return (
    (currentScores) ? (
      <>
        <MonthSelector
          firstMonthForDisplay={firstMonthForDisplay}
          finalMonthForDisplay={finalMonthForDisplay}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
        />
        <ScoringContainer>
          <HeaderLabel onClick={() => sortTable('teamId')}>Team {displayArrow('teamId')}</HeaderLabel>
          <HeaderLabel onClick={() => sortTable('score')}>Points {displayArrow('score')}</HeaderLabel>
          {
            currentScores.map((team) => (
              <Fragment key={team.teamId}>
                <Cell firstItem>

                  {getTeamName(team.teamId, sportTeams)}
                </Cell>
                <Cell>{team.score}</Cell>
              </Fragment>
            ))
          }
        </ScoringContainer>
      </>
    ) : <Loading />
  );
}

export default Score;
