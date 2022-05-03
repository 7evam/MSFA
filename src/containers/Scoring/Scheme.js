import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { useSelector, useDispatch } from 'react-redux';
import MonthTicker from "../../components/MonthTicker";

const Container = styled.div`
    margin-top: 40px;
`;

function Scheme({scheme, league}) {
    
    const displayTable ={
        1: {
            playoff_bonus: "Clinch Playoffs",
            playoff_bonus_bye: "Clinch Playoff Bye",
            r1_lose_game: "Lose Game in Wild Card Round",
            r1_win_game: "Win Game in Wild Card Round",
            r1_win_series: "Win Series for Wild Card Round",
            r2_lose_game: "Lose Game in Divisional Series",
            r2_win_game: "Win Game in Divisional Series",
            r2_win_series: "Win Divisional Series",
            r3_lose_game: "Lose Game in League Championship Series",
            r3_win_game: "Win Game in League Championship Series",
            r3_win_series: "Win League Championship Series",
            r4_lose_game: "Lose Game in World Series",
            r4_win_game: "Win Game in World Series",
            r4_win_series: "Win World Series",
            rs_losses: "Lose Regular Season Game",
            rs_wins: "Win Regular Season Game"
        },
        2: {
            playoff_bonus: "Clinch Playoffs",
            playoff_bonus_bye: "Clinch Playoff Bye",
            r1_win_series: "Win Wild Card Playoff Game",
            r2_win_series: "Win Divisional Playoff Game",
            r3_win_series: "Win Conference Championship",
            r4_win_series: "Win Super Bowl",
            rs_losses: "Lose Regular Season Game",
            rs_tie_otl: "Tie Regular Season Game",
            rs_wins: "Win Regular Season Game"
        }, 
        3: {
            playoff_bonus: "Playoff Bonus",
            r1_lose_game: "Lose Game in Round 1",
            r1_win_game: "Win Game in Round 1",
            r1_win_series: "Win Series for Round 1",
            r2_lose_game: "Lose Game in Round 2",
            r2_win_game: "Win Game in Round 2",
            r2_win_series: "Win Series for Round 2",
            r3_lose_game: "Lose Game in Round 3",
            r3_win_game: "Win Game in Round 3",
            r3_win_series: "Win Series for Round 3",
            r4_lose_game: "Lose Game in Stanley Cup Finalls",
            r4_win_game: "Win Game in Stanley Cup Finals",
            r4_win_series: "Win Stanlley Cup Finalls",
            rs_losses: "Lose Regular Season Game",
            rs_tie_otl: "OT Loss",
            rs_wins: "Win Regular Season Game"
        },
        4: {
            nba_7_8_playin_win: "7/8 Play-in win",
            nba_9_10_playin_win: "9/10 Play-in win",
            nba_final_playin_win: "Final Play-in win",
            playoff_bonus: "Playoff Bonus",
            r1_lose_game: "Lose Game in Round 1",
            r1_win_game: "Win Game in Round 1",
            r1_win_series: "Win Series for Round 1",
            r2_lose_game: "Lose Game in Round 2",
            r2_win_game: "Win Game in Round 2",
            r2_win_series: "Win Series for Round 2",
            r3_lose_game: "Lose Game in Conference Championship",
            r3_win_game: "Win Game in Conference Championship",
            r3_win_series: "Win Conference Championship",
            r4_lose_game: "Lose Game in NBA Finals",
            r4_win_game: "Win Game in NBA Finals",
            r4_win_series: "Win NBA Finals",
            rs_losses: "Lose Regular Season Game",
            rs_wins: "Win Regular Season Game"
        }
        
    }

  return (
      <Container>
          <p>Scoring Scheme</p>
          {
              Object.keys(scheme).filter(item => displayTable[league][item]).map(item => (
                  <p><b>{displayTable[league][item]}</b>: {scheme[item]}</p>
              ))
          }
      </Container>
  );
}

export default Scheme;
