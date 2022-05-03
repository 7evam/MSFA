import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { useSelector, useDispatch } from 'react-redux';
import MonthTicker from "../../components/MonthTicker";

const Th = styled.th`
    &:hover {
        font-weight: 700;
        text-decoration: underline;
        cursor: pointer;
    }
    padding-right: 1em;
`

function ScoringTable({league, roflMonth, scores, roflYear, teams}) {

    const [sortedTeams, setSortedTeams] = useState(null)
    const [sortedField, setSortedField] = useState('team')
    const [sortDirectionAsc, setSortDirectionAsc] = useState(true)

    useEffect(() => {
        const teamArray = []
        Object.keys(scores.points[league][`${roflMonth}-${roflYear}`]).forEach(teamId => {
            teamArray.push({
                id: teamId,
                teamName: `${teams[league][teamId].city} ${teams[league][teamId].name}`,
                points: scores.points[league][`${roflMonth}-${roflYear}`][teamId]
            })
        })
        setSortedTeams(teamArray)
        setSortedField('team')
        setSortDirectionAsc(true)
    }, [roflMonth, league]);

    useEffect(() => {
        if(sortedTeams && sortedTeams.length){
            const newTeams = [...sortedTeams]
            if(sortedField === 'team'){
                if(sortDirectionAsc){
                    newTeams.sort((a, b) => (a.teamName > b.teamName) ? 1 : -1)
                } else {
                    newTeams.sort((a, b) => (a.teamName > b.teamName) ? -1 : 1)
                }
            }
            if(sortedField === 'points'){
                if(sortDirectionAsc){
                    newTeams.sort((a, b) => (a.points > b.points) ? 1 : -1)
                } else {
                    newTeams.sort((a, b) => (a.points > b.points) ? -1 : 1)
                }
            }
            setSortedTeams(newTeams)
        }
      }, [sortedField, sortDirectionAsc]);

      const requestSort = (param) => {
        setSortDirectionAsc(!sortDirectionAsc)
        setSortedField(param)
      }

  return (
    sortedTeams ?
    <table>
    <caption>Teams</caption>
    <thead>
        <tr>
            <Th onClick={() => requestSort('team')}>Team {sortedField === 'team' ? sortDirectionAsc ? '↑' : '↓' : null}</Th>
            <Th onClick={() => requestSort('points')}>Points {sortedField === 'points' ? sortDirectionAsc ? '↑' : '↓' : null}</Th>
        </tr>
    </thead>
    <tbody>
      {sortedTeams.map(team => (
          <tr key={team.id}>
              <td>{team.teamName}</td>
              <td>{team.points}</td>
          </tr>
      ))}
    </tbody>
    </table>
    : null
  );
}

export default ScoringTable;
