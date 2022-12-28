import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function ReviewTrade({setStage, teamsForTrade, cash}) {

    const {sportTeams} = useSelector((state) => ({
        ...state.sportReducer
    }))

  const tradeForTeams = []
  Object.keys(teamsForTrade['tradeFor']).forEach(teamId => {
    if(teamsForTrade['tradeFor'][teamId].checked === true){
        const leagueId = Number(String(teamId)[0])
        tradeForTeams.push({
            name: `${sportTeams[leagueId][teamId].city} ${sportTeams[leagueId][teamId].name}`,
            value: teamsForTrade['tradeFor'][teamId].val
        })
    }
  })

  const tradeAwayTeams = []
  Object.keys(teamsForTrade['tradeAway']).forEach(teamId => {
    if(teamsForTrade['tradeAway'][teamId].checked === true){
        const leagueId = Number(String(teamId)[0])
        tradeAwayTeams.push({
            name: `${sportTeams[leagueId][teamId].city} ${sportTeams[leagueId][teamId].name}`,
            value: teamsForTrade['tradeAway'][teamId].val
        })
    }
  })

  console.log('trade for teams')
  console.log(tradeForTeams)

  console.log('trade away teams')
  console.log(tradeAwayTeams)

  return <div>
    <p>Review Trade</p>
    <p>You receive</p>
    {tradeForTeams.map(team => (
        <p>{team.name} (${team.value})</p>
    ))}
    {cash.tradeFor > 0 ? <p>${cash.tradeFor} Rofl Cash</p> : null}
    <p>Opponent receives</p>
    {tradeAwayTeams.map(team => (
        <p>{team.name} (${team.value})</p>
    ))}
    {cash.tradeAway > 0 ? <p>${cash.tradeAway} Rofl Cash</p> : null}
    <button onClick={() => setStage('tradeAway')}>Go Back</button>
  </div>
}

export default ReviewTrade;
