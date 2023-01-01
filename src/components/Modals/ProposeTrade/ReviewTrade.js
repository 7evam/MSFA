import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useApi from "../../../hooks/useApi";
import {toast} from 'react-toastify'

function ReviewTrade({setStage, teamsForTrade, cash}) {

    const {sportTeams,playoffMonths, activeYears} = useSelector((state) => ({
        ...state.sportReducer
    }))

    const { props } = useSelector((state) => ({
        ...state.modalReducer
      }));

      const { currentOrganization } = useSelector((state) => ({
        ...state.authReducer
    }));

    const {makeRequest, isLoading} = useApi()

    const dispatch = useDispatch()

  const tradeForTeams = []
  Object.keys(teamsForTrade['tradeFor']).forEach(teamId => {
    if(teamsForTrade['tradeFor'][teamId].checked === true){
        const leagueId = Number(String(teamId)[0])
        tradeForTeams.push({
            teamId,
            name: `${sportTeams[leagueId][teamId].city} ${sportTeams[leagueId][teamId].name}`,
            value: teamsForTrade['tradeFor'][teamId].val,
            leagueId: teamsForTrade['tradeFor'][teamId].leagueId,
        })
    }
  })

  const tradeAwayTeams = []
  Object.keys(teamsForTrade['tradeAway']).forEach(teamId => {
    if(teamsForTrade['tradeAway'][teamId].checked === true){
        const leagueId = Number(String(teamId)[0])
        tradeAwayTeams.push({
            teamId,
            name: `${sportTeams[leagueId][teamId].city} ${sportTeams[leagueId][teamId].name}`,
            value: teamsForTrade['tradeAway'][teamId].val,
            leagueId: teamsForTrade['tradeAway'][teamId].leagueId,
        })
    }
  })

  const submitTrade = async () => {
    console.log('here is user to trade with')
    console.log(props.userToTradeWith)
    // validate trade
    const proposerTrades = {
        cash: cash.tradeAway,
        teams: []
    }
    tradeAwayTeams.forEach(team => {
        proposerTrades.teams.push({
            teamId: team.teamId,
            value: team.value
        })
    })
    
    const receiverTrades = {
        cash:cash.tradeFor,
        teams: []
    }
    tradeForTeams.forEach(team => {
        receiverTrades.teams.push({
            teamId: team.teamId,
            value: team.value
        })
    })

    const res = await makeRequest({
        method: "post",
        route: `/users/trades`,
        data: {
            organizationId: currentOrganization.id,
            proposerId: currentOrganization.user_id,
            receiverId: props.userToTradeWith,
            proposerTrades,
            receiverTrades,
            roflMonth: activeYears[2022][Number(String(props.selectedTeam)[0])].roflMonth + 1,
            roflYear: 2022
        }
    });
    if(res.statusCode === 201){
        toast.success('Trade submitted successfully')
        dispatch({
            type: "CLOSE_MODAL",
          });
    } else {
        toast.error("There was an error submitting your request")
    }
  }

  console.log('trade for teams')
  console.log(tradeForTeams)

  console.log('trade away teams')
  console.log(tradeAwayTeams)

  return <div>
    <p>Review Trade</p>
    <p>You receive</p>
    {tradeForTeams.map(team => (
        <p>{team.name} {playoffMonths[2022][team.leagueId] - 1 === activeYears[2022][team.leagueId].roflMonth ? null : `($${team.value})`}</p>
    ))}
    {cash.tradeFor > 0 ? <p>${cash.tradeFor} Rofl Cash</p> : null}
    <p>Opponent receives</p>
    {tradeAwayTeams.map(team => (
        <p>{team.name} {playoffMonths[2022][team.leagueId] - 1 === activeYears[2022][team.leagueId].roflMonth ? null : `($${team.value})`}</p>
        ))}
    {cash.tradeAway > 0 ? <p>${cash.tradeAway} Rofl Cash</p> : null}
    <button onClick={() => setStage('tradeAway')}>Go Back</button>
    <button onClick={submitTrade}>Submit</button>
  </div>
}

export default ReviewTrade;


