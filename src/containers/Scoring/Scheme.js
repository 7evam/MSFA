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

    // TODO
    // make this specific for each league
    const displayTable ={
        nba_7_8_playin_win: "7/8 Play-in win",
        nba_9_10_playin_win: "9/10 Play-in win",
        nba_final_playin_win: "Final Play-in win",
        playoff_bonus: "Playoff Bonus",
        playoff_bonus_bye: "Playoff Bye Bonus",
        r1_lose_game: "Lose Game in Round 1",
        r1_win_game: "Win Game in Round 1",
        r1_win_series: "Win Series for Round 1",
        r2_lose_game: "Lose Game in Round 2",
        r2_win_game: "Win Game in Round 2",
        r2_win_series: "Win Series for Round 2",
        r3_lose_game: "Lose Game in Round 3",
        r3_win_game: "Win Game in Round 3",
        r3_win_series: "Win Series for Round 3",
        r4_lose_game: "Lose Game in Championship",
        r4_win_game: "Win Game in Championship",
        r4_win_series: "Win Championship",
        rs_losses: "Lose Regular Season Game",
        rs_tie_otl: "Tie Regular Season Game",
        rs_wins: "Win Regular Season Game"
    }

  return (
      <Container>
          <p>this is scheme</p>
          {
              Object.keys(scheme).filter(item => displayTable[item]).map(item => (
                  <p><b>{displayTable[item]}</b>: {scheme[item]}</p>
              ))
          }
      </Container>
  );
}

export default Scheme;
