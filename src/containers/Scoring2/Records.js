import React, { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { mobileBreakPoint } from '../../constants/style';
import MonthSelector from '../../components/MonthSelector';
import { PLAYOFF_MONTHS } from '../../constants';
import { getTeamName } from '../../utils';

const RecordsContainer = styled.div`
    display: grid;
    grid-template-columns: ${(props) => {
    // column count has been previously calculated
    // all columns are 1fr except first which is 2fr
    const columns = props.columnCount;
    const columnWidths = Array.from({ length: columns }, () => '1fr');
    columnWidths[0] = '2fr';
    return columnWidths.join(' ');
  }}; 
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    border: 2px solid #E5EAF4;
    border-radius: 10px;
    width: 90%;
    overflow-x: scroll;
    
`;

const TeamColumn = styled.div`
  flex: 0 0 auto;
  min-width: 200px;
  padding: 16px 0px 8px 16px;
  border-bottom: ${(props) => (props.isLastInList ? null : '2px solid #E5EAF4')}; 
  position: sticky;
  left: 0;
  z-index: 1;
  background-color: white;
`;

const Cell = styled.div`
    padding: 16px 0px 8px 16px;
    border-bottom: ${(props) => (props.isLastInList ? null : '2px solid #E5EAF4')}; 
    &:hover{
        text-decoration: ${(props) => (props.teamName ? 'underline' : null)}; 
        cursor: ${(props) => (props.teamName ? 'pointer' : null)}; 
    }
    @media (min-width: ${mobileBreakPoint}){
        &:before{
            content: "";
            right: 0;
            z-index: 100;
            top: 0;
            height: 50%; 
            border-right: 2px solid #E5EAF4;
            margin-right: 8px;
        }
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
    position: ${(props) => (props.sticky ? "sticky" : null)}; 
    left: 0;
    &:hover{
        text-decoration: underline;
        cursor: pointer;
    }
    @media (max-width: ${mobileBreakPoint}){
      font-size: 10px;
      padding-right: 16px;
     }
`;

function Records(props) {
  const leagueHeadersSwitch = (league, isPlayoffs) => {
    switch (league) {
      case 1: return (
        isPlayoffs
          ? (
            <>
              <HeaderLabel sticky>Team</HeaderLabel>
              <HeaderLabel>WC Game Won</HeaderLabel>
              <HeaderLabel>WC Game Lost</HeaderLabel>
              <HeaderLabel>WC Series Won</HeaderLabel>
              <HeaderLabel>DS Game Won</HeaderLabel>
              <HeaderLabel>DS Game Lost</HeaderLabel>
              <HeaderLabel>DS Series Won</HeaderLabel>
              <HeaderLabel>CS Game Won</HeaderLabel>
              <HeaderLabel>CS Game Lost</HeaderLabel>
              <HeaderLabel>CS Series Won</HeaderLabel>
              <HeaderLabel>WS Game Won</HeaderLabel>
              <HeaderLabel>WS Game Lost</HeaderLabel>
              <HeaderLabel>WS Won</HeaderLabel>
            </>
          )
          : (
            <>
              <HeaderLabel sticky>Team</HeaderLabel>
              <HeaderLabel>Wins</HeaderLabel>
              <HeaderLabel>Losses</HeaderLabel>
            </>
          ));
      case 2: return (
        isPlayoffs
          ? (
            <>
              <HeaderLabel sticky>Team</HeaderLabel>
              <HeaderLabel>WC Game Won</HeaderLabel>
              <HeaderLabel>Divisional Game Won</HeaderLabel>
              <HeaderLabel>CC Game Won</HeaderLabel>
              <HeaderLabel>Super Bowl Won</HeaderLabel>
            </>
          )
          : (
            <>
              <HeaderLabel sticky>Team</HeaderLabel>
              <HeaderLabel>Wins</HeaderLabel>
              <HeaderLabel>Losses</HeaderLabel>
              <HeaderLabel>Ties</HeaderLabel>

            </>
          ));
      case 3: return (
        isPlayoffs
          ? (
            <>
              <HeaderLabel sticky>Team</HeaderLabel>
              <HeaderLabel>Round 1 Game Won</HeaderLabel>
              <HeaderLabel>Round 1 Game Lost</HeaderLabel>
              <HeaderLabel>Round 1 Series Won</HeaderLabel>
              <HeaderLabel>Round 2 Game Won</HeaderLabel>
              <HeaderLabel>Round 2 Game Lost</HeaderLabel>
              <HeaderLabel>Round 2 Series Won</HeaderLabel>
              <HeaderLabel>CC Game Won</HeaderLabel>
              <HeaderLabel>CC Game Lost</HeaderLabel>
              <HeaderLabel>CC Series Won</HeaderLabel>
              <HeaderLabel>Stanley Cup Game Won</HeaderLabel>
              <HeaderLabel>Stanley Cup Game Lost</HeaderLabel>
              <HeaderLabel>Stanley Cup Series Won</HeaderLabel>
            </>
          )
          : (
            <>
              <HeaderLabel sticky>Team</HeaderLabel>
              <HeaderLabel>Wins</HeaderLabel>
              <HeaderLabel>Losses</HeaderLabel>
              <HeaderLabel>OT Losses</HeaderLabel>

            </>
          ));

      case 4: return (
        isPlayoffs
          ? (
            <>
              <HeaderLabel sticky>Team</HeaderLabel>
              <HeaderLabel>Round 1 Game Won</HeaderLabel>
              <HeaderLabel>Round 1 Game Lost</HeaderLabel>
              <HeaderLabel>Round 1 Series Won</HeaderLabel>
              <HeaderLabel>Round 2 Game Won</HeaderLabel>
              <HeaderLabel>Round 2 Game Lost</HeaderLabel>
              <HeaderLabel>Round 2 Series Won</HeaderLabel>
              <HeaderLabel>CC Game Won</HeaderLabel>
              <HeaderLabel>CC Game Lost</HeaderLabel>
              <HeaderLabel>CC Series Won</HeaderLabel>
              <HeaderLabel>Finals Game Won</HeaderLabel>
              <HeaderLabel>Finals Game Lost</HeaderLabel>
              <HeaderLabel>Finals Series Won</HeaderLabel>
            </>
          )
          : (
            <>
              <HeaderLabel sticky>Team</HeaderLabel>
              <HeaderLabel>Wins</HeaderLabel>
              <HeaderLabel>Losses</HeaderLabel>
            </>
          ));
      default: return <p>error</p>;
    }
  };

  const dataSwitch = (team, league, isPlayoffs) => {
    const playoffData = [
      'r1_win_game',
      'r1_lose_game',
      'r1_win_series',
      'r2_win_game',
      'r2_lose_game',
      'r2_win_series',
      'r3_win_game',
      'r3_lose_game',
      'r3_win_series',
      'r4_win_game',
      'r4_lose_game',
      'r4_win_series',
    ];
    switch (league) {
      case 1: return (
        isPlayoffs
          ? (
            <>
              {
                playoffData.map((game) => (
                  <Cell key={game.id}>{team[game] === null ? 0 : team[game]}</Cell>
                ))
              }
            </>
          )
          : (
            <>
              <Cell>{team.rs_wins}</Cell>
              <Cell>{team.rs_losses}</Cell>
            </>
          ));
      case 2: return (
        isPlayoffs
          ? (
            <>
              <Cell>{team.r1_win_series || 0}</Cell>
              <Cell>{team.r2_win_series || 0}</Cell>
              <Cell>{team.r3_win_series || 0}</Cell>
              <Cell>{team.r4_win_series || 0}</Cell>
            </>
          )
          : (
            <>
              <Cell>{team.rs_wins}</Cell>
              <Cell>{team.rs_losses}</Cell>
              <Cell>{team.rs_tie_otl}</Cell>

            </>
          ));
      case 3: return (
        isPlayoffs
          ? (
            <>
              {
                playoffData.map((game) => (
                  <Cell key={game.id}>{team[game] === null ? 0 : team[game]}</Cell>
                ))
              }
            </>
          )
          : (
            <>
              <Cell>{team.rs_wins}</Cell>
              <Cell>{team.rs_losses}</Cell>
              <Cell>{team.rs_tie_otl}</Cell>

            </>
          ));

      case 4: return (
        isPlayoffs
          ? (
            <>
              {
                playoffData.map((game) => (
                  <Cell key={game.id}>{team[game] === null ? 0 : team[game]}</Cell>
                ))
              }
            </>
          )
          : (
            <>
              <Cell>{team.rs_wins}</Cell>
              <Cell>{team.rs_losses}</Cell>
            </>
          ));
      default: return <p>error</p>;
    }
  };

  const isPlayoffs = props.selectedMonth === PLAYOFF_MONTHS[props.selectedYear][props.league];
  const columnCount = leagueHeadersSwitch(props.league, isPlayoffs).props.children.length;

  return (
    props.filteredRecords
      ? (
        <>
          <MonthSelector
            firstMonthForDisplay={props.firstMonthForDisplay}
            finalMonthForDisplay={props.finalMonthForDisplay}
            selectedMonth={props.selectedMonth}
            setSelectedMonth={props.setSelectedMonth}
          />
          <RecordsContainer league={props.league} columnCount={columnCount}>
            {leagueHeadersSwitch(props.league, isPlayoffs)}
            {
              Object.values(props.filteredRecords).map((team) => (
                <Fragment key={team.team_id}>
                  <TeamColumn sticky>{getTeamName(team.team_id, props.sportTeams)}</TeamColumn>

                  {dataSwitch(team, props.league, isPlayoffs)}
                </Fragment>
              ))
            }
          </RecordsContainer>
        </>
      ) : null
  );
}

export default Records;
