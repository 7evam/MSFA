import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { useSelector, useDispatch } from 'react-redux';
import MonthTicker from "../../components/MonthTicker";
// import { getTableColumns, getTableHeaders } from "./getTableData";

const Th = styled.th`
    &:hover {
        font-weight: 700;
        text-decoration: underline;
        cursor: pointer;
    }
    padding-right: 8em;
`

const Td = styled.td`
`

function RecordsTable({league, roflMonth, scores, roflYear, teams}) {

    const { playoffMonths } = useSelector((state) => ({
        ...state.sportReducer
      }));

    const [sortedTeams, setSortedTeams] = useState(null)
    const [sortedField, setSortedField] = useState('teamName')
    const [sortDirectionAsc, setSortDirectionAsc] = useState(true)
    const [playoffs, setPlayoffs] = useState(playoffMonths[2022][league] === roflMonth ? true : false)

    useEffect(() => {
        const teamArray = []
        Object.keys(scores.records[league][`${roflMonth}-${roflYear}`]).forEach(teamId => {
            teamArray.push({
                id: teamId,
                teamName: `${teams[league][teamId].city} ${teams[league][teamId].name}`,
                rsWins: scores.records[league][`${roflMonth}-${roflYear}`][teamId].rs_wins,
                rsLosses: scores.records[league][`${roflMonth}-${roflYear}`][teamId].rs_losses,
                playoffBonus: Number(scores.records[league][`${roflMonth}-${roflYear}`][teamId].playoff_bonus),
                r1WinGame: Number(scores.records[league][`${roflMonth}-${roflYear}`][teamId].r1_win_game),
                r1LoseGame: Number(scores.records[league][`${roflMonth}-${roflYear}`][teamId].r1_lose_game),
                r1WinSeries: Number(scores.records[league][`${roflMonth}-${roflYear}`][teamId].r1_win_series),
                r2WinGame: Number(scores.records[league][`${roflMonth}-${roflYear}`][teamId].r2_win_game),
                r2LoseGame: Number(scores.records[league][`${roflMonth}-${roflYear}`][teamId].r2_lose_game),
                r2WinSeries: Number(scores.records[league][`${roflMonth}-${roflYear}`][teamId].r2_win_series),
                r3WinGame: Number(scores.records[league][`${roflMonth}-${roflYear}`][teamId].r3_win_game),
                r3LoseGame: Number(scores.records[league][`${roflMonth}-${roflYear}`][teamId].r3_lose_game),
                r3WinSeries: Number(scores.records[league][`${roflMonth}-${roflYear}`][teamId].r3_win_series),
                r4WinGame: Number(scores.records[league][`${roflMonth}-${roflYear}`][teamId].r4_win_game),
                r4LoseGame: Number(scores.records[league][`${roflMonth}-${roflYear}`][teamId].r4_lose_game),
                r4WinSeries: Number(scores.records[league][`${roflMonth}-${roflYear}`][teamId].r4_win_series),
            })
        })
        setSortedTeams(teamArray)
        setSortedField('teamName')
        setSortDirectionAsc(true)
        setPlayoffs(playoffMonths[2022][league] === roflMonth ? true : false)
    }, [roflMonth, league]);

    useEffect(() => {
        if(sortedTeams && sortedTeams.length){
            const newTeams = [...sortedTeams]

            if(sortDirectionAsc){
                newTeams.sort((a, b) => (a[sortedField] > b[sortedField]) ? 1 : -1)
            } else {
                newTeams.sort((a, b) => (a[sortedField] > b[sortedField]) ? -1 : 1)
            }
            setSortedTeams(newTeams)
        }
      }, [sortedField, sortDirectionAsc]);

      const requestSort = (param) => {
        setSortDirectionAsc(!sortDirectionAsc)
        setSortedField(param)
      }

      const getTableHeaders = () => {
        if(league === 1){
            if(playoffs){
                return <>
                <Th onClick={() => requestSort('r1WinGame')}>Win Round 1 Game{sortedField === 'r1WinGame' ? sortDirectionAsc ? '↑' : '↓' : null}</Th>
                <Th onClick={() => requestSort('r1LoseGame')}>Lose Round 1 Game{sortedField === 'r1LoseGame' ? sortDirectionAsc ? '↑' : '↓' : null}</Th>
                <Th onClick={() => requestSort('r1WinSeries')}>Win Round 1 Series{sortedField === 'r1WinSeries' ? sortDirectionAsc ? '↑' : '↓' : null}</Th>

                <Th onClick={() => requestSort('r2WinGame')}>Win Round 2 Game{sortedField === 'r2WinGame' ? sortDirectionAsc ? '↑' : '↓' : null}</Th>
                <Th onClick={() => requestSort('r2LoseGame')}>Lose Round 2 Game{sortedField === 'r2LoseGame' ? sortDirectionAsc ? '↑' : '↓' : null}</Th>
                <Th onClick={() => requestSort('r2WinSeries')}>Win Round 2 Series{sortedField === 'r2WinSeries' ? sortDirectionAsc ? '↑' : '↓' : null}</Th>

                <Th onClick={() => requestSort('r3WinGame')}>Win Round 3 Game{sortedField === 'r3WinGame' ? sortDirectionAsc ? '↑' : '↓' : null}</Th>
                <Th onClick={() => requestSort('r3LoseGame')}>Lose Round 3 Game{sortedField === 'r3LoseGame' ? sortDirectionAsc ? '↑' : '↓' : null}</Th>
                <Th onClick={() => requestSort('r3WinSeries')}>Win Round 3 Series{sortedField === 'r3WinSeries' ? sortDirectionAsc ? '↑' : '↓' : null}</Th>

                <Th onClick={() => requestSort('r4WinGame')}>Win World Series Game{sortedField === 'r4WinGame' ? sortDirectionAsc ? '↑' : '↓' : null}</Th>
                <Th onClick={() => requestSort('r4LoseGame')}>Lose World Series Game{sortedField === 'r4LoseGame' ? sortDirectionAsc ? '↑' : '↓' : null}</Th>
                <Th onClick={() => requestSort('r4WinSeries')}>Win World Series{sortedField === 'r4WinSeries' ? sortDirectionAsc ? '↑' : '↓' : null}</Th>
                </>
            } else {
                return <>
                <Th onClick={() => requestSort('rsWins')}>Regular Season Wins {sortedField === 'rsWins' ? sortDirectionAsc ? '↑' : '↓' : null}</Th>
                <Th onClick={() => requestSort('rsLosses')}>Regular Season Losses {sortedField === 'rsLosses' ? sortDirectionAsc ? '↑' : '↓' : null}</Th>
                <Th onClick={() => requestSort('playoffBonus')}>Playoff Bonus {sortedField === 'playoffBonus' ? sortDirectionAsc ? '↑' : '↓' : null}</Th>
                </>
            } 
        }
      }

    const getTableColumns = (team) => {
        if(league === 1){
            if(playoffs){
                return(<>
                    <Td>{team.r1WinGame}</Td>
                    <Td>{team.r1LoseGame}</Td>
                    <Td>{team.r1WinSeries}</Td>

                    <Td>{team.r2WinGame}</Td>
                    <Td>{team.r2LoseGame}</Td>
                    <Td>{team.r2WinSeries}</Td>

                    <Td>{team.r3WinGame}</Td>
                    <Td>{team.r3LoseGame}</Td>
                    <Td>{team.r3WinSeries}</Td>

                    <Td>{team.r4WinGame}</Td>
                    <Td>{team.r4LoseGame}</Td>
                    <Td>{team.r4WinSeries}</Td>
                </>)
            } else {
                return (<>
                    <Td>{team.rsWins}</Td>
                    <Td>{team.rsLosses}</Td>
                    <Td>{team.playoffBonus}</Td>
                    </>)
            }
        }
        
    }

  return (
    sortedTeams ?
    <table>
    <caption>Records</caption>
    <thead>
        <tr>
            <Th onClick={() => requestSort('teamName')}>Team {sortedField === 'teamName' ? sortDirectionAsc ? '↑' : '↓' : null}</Th>
            {getTableHeaders()}
            
        </tr>
    </thead>
    <tbody>
      {sortedTeams.map(team => (
          <tr key={team.id}>
              <Td>{team.teamName}</Td>
              {getTableColumns(team)}
          </tr>
      ))}
    </tbody>
    </table>
    : null
  );
}

export default RecordsTable;
