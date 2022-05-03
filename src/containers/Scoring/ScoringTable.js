import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { useSelector, useDispatch } from 'react-redux';
import MonthTicker from "../../components/MonthTicker";

const Container = styled.div`
    margin-top: 40px;
`;

const LeagueSelector = styled.div`
    display: flex;
    flex-direction: row;
`

const League = styled.p`
    margin-right: 10px;
    &:hover {
        font-weight: 700;
        text-decoration: underline;
        cursor: pointer;
      }
`

function ScoringTable({league, roflMonth, scores, roflYear, teams}) {
    console.log('---')
    console.log(teams)

    console.log(Object.keys(scores.points[league][`${roflMonth}-${roflYear}`]))
  return (
      <Container>
          {Object.keys(scores.points[league][`${roflMonth}-${roflYear}`]).map(teamId => (
              <div>
                  <p><b>{teams[league][teamId].city} {teams[league][teamId].name}:</b> {scores.points[league][`${roflMonth}-${roflYear}`][teamId]}</p>
              </div>
          ))}
      </Container>
  );
}

export default ScoringTable;
