import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { mobileBreakPoint } from '../../constants/style';

const SchemeContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr; 
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    width: 90%;
    border: 2px solid #E5EAF4;
    border-radius: 10px;
    & div:nth-child(4n + 6){
      background-color: #F7FBFF;
    }
    & div:nth-child(4n + 5){
      background-color: #F7FBFF;
    }
    }
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

const Cell = styled.div`
    padding: 16px 0px 8px 16px;
    border-bottom: ${(props) => (props.isLastInList ? null : '2px solid #E5EAF4')}; 
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

function Scheme({ league, scheme }) {
  const displayTable = {
    1: {
      playoff_bonus: 'Clinch Playoffs',
      playoff_bonus_bye: 'Clinch Playoff Bye',
      r1_lose_game: 'Lose Game in Wild Card Round',
      r1_win_game: 'Win Game in Wild Card Round',
      r1_win_series: 'Win Series for Wild Card Round',
      r2_lose_game: 'Lose Game in Divisional Series',
      r2_win_game: 'Win Game in Divisional Series',
      r2_win_series: 'Win Divisional Series',
      r3_lose_game: 'Lose Game in League Championship Series',
      r3_win_game: 'Win Game in League Championship Series',
      r3_win_series: 'Win League Championship Series',
      r4_lose_game: 'Lose Game in World Series',
      r4_win_game: 'Win Game in World Series',
      r4_win_series: 'Win World Series',
      rs_losses: 'Lose Regular Season Game',
      rs_wins: 'Win Regular Season Game',
    },
    2: {
      playoff_bonus: 'Clinch Playoffs',
      playoff_bonus_bye: 'Clinch Playoff Bye',
      r1_win_series: 'Win Wild Card Playoff Game',
      r2_win_series: 'Win Divisional Playoff Game',
      r3_win_series: 'Win Conference Championship',
      r4_win_series: 'Win Super Bowl',
      rs_losses: 'Lose Regular Season Game',
      rs_tie_otl: 'Tie Regular Season Game',
      rs_wins: 'Win Regular Season Game',
    },
    3: {
      playoff_bonus: 'Playoff Bonus',
      r1_lose_game: 'Lose Game in Round 1',
      r1_win_game: 'Win Game in Round 1',
      r1_win_series: 'Win Series for Round 1',
      r2_lose_game: 'Lose Game in Round 2',
      r2_win_game: 'Win Game in Round 2',
      r2_win_series: 'Win Series for Round 2',
      r3_lose_game: 'Lose Game in Round 3',
      r3_win_game: 'Win Game in Round 3',
      r3_win_series: 'Win Series for Round 3',
      r4_lose_game: 'Lose Game in Stanley Cup Finals',
      r4_win_game: 'Win Game in Stanley Cup Finals',
      r4_win_series: 'Win Stanlley Cup Finals',
      rs_losses: 'Lose Regular Season Game',
      rs_tie_otl: 'OT Loss',
      rs_wins: 'Win Regular Season Game',
    },
    4: {
      nba_7_8_playin_win: '7/8 Play-in win',
      nba_9_10_playin_win: '9/10 Play-in win',
      nba_final_playin_win: 'Final Play-in win',
      playoff_bonus: 'Playoff Bonus',
      r1_lose_game: 'Lose Game in Round 1',
      r1_win_game: 'Win Game in Round 1',
      r1_win_series: 'Win Series for Round 1',
      r2_lose_game: 'Lose Game in Round 2',
      r2_win_game: 'Win Game in Round 2',
      r2_win_series: 'Win Series for Round 2',
      r3_lose_game: 'Lose Game in Conference Championship',
      r3_win_game: 'Win Game in Conference Championship',
      r3_win_series: 'Win Conference Championship',
      r4_lose_game: 'Lose Game in NBA Finals',
      r4_win_game: 'Win Game in NBA Finals',
      r4_win_series: 'Win NBA Finals',
      rs_losses: 'Lose Regular Season Game',
      rs_wins: 'Win Regular Season Game',
    },
  };
  return (
    <SchemeContainer>
      <HeaderLabel>Achievement</HeaderLabel>
      <HeaderLabel>Points</HeaderLabel>
      {
        Object.keys(scheme).filter((item) => displayTable[league][item]).map((item) => (
          <>
            <Cell firstItem><b>{displayTable[league][item]}</b></Cell>
            <Cell>{scheme[item]}</Cell>
          </>
        ))
      }
    </SchemeContainer>
  );
}

export default Scheme;
