import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import "@fontsource/open-sans";
import TeamSelect from "../TeamSelect";
import ReviewTrade from './ReviewTrade'
import {toast} from 'react-toastify'

function ProposeTrade() {

    const { props } = useSelector((state) => ({
        ...state.modalReducer
      }));

    const transformToCheckable = (roster) => {
        let checkableRoster = {}
        checkableRoster.cash = roster.cash
        Object.keys(roster).forEach(teamNum => {
            const team = roster[teamNum]
            // don't show a team if it wont be active next month
            if(team.teamId && props.currentRoflMonths[team.leagueId] +1 >= props.firstActiveMonthForClaim) {
                checkableRoster[team.teamId] = {
                    checked: props.selectedTeam === team.teamId ? true : false,
                    val: team.val,
                    leagueId: team.leagueId
                }
            }
        })
        return checkableRoster
    }    


    const [stage, setStage] = useState('tradeFor')
    const [teamsForTrade, setTeamsForTrade] = useState({
        tradeFor: transformToCheckable(props.receiverRoster),
        tradeAway: transformToCheckable(props.currentUserRoster)
    })   
    const [cash, setCash] = useState({
        tradeFor: null,
        tradeAway: null
    })

    const handleTeamClick = (teamId) => {
        const newTeamsForTrade = {...teamsForTrade}
        newTeamsForTrade[stage][teamId].checked = !newTeamsForTrade[stage][teamId].checked
        if(Object.values(newTeamsForTrade[stage]).filter(team => team.checked === true).length > 3){
            toast.error('You can trade a maximum of 3 teams')
            // must explicitly set team as unchecked or else it shows up as checked again
            newTeamsForTrade[stage][teamId].checked = !newTeamsForTrade[stage][teamId].checked
            setTeamsForTrade(newTeamsForTrade)
            return
        } else {
            setTeamsForTrade(newTeamsForTrade)
        }
    }

    const handleCashValueChange = (value) => {
        if(value > teamsForTrade[stage].cash){
            console.log("user doesnt have that money")
        } else {
            let newCash = {...cash}
            newCash[stage] = value
            setCash(newCash)
        }
    }
    
    const getContent = (stage) => {
        switch(stage){
            case 'tradeFor':
                return <TeamSelect mode="tradeFor" roflYear={roflYear} handleCashValueChange={handleCashValueChange} cashValue={cash.tradeFor} handleTeamClick={handleTeamClick} setStage={setStage} checkedTeams={teamsForTrade['tradeFor']} />
            case 'tradeAway':
                return <TeamSelect mode="tradeAway" roflYear={roflYear} handleCashValueChange={handleCashValueChange} cashValue={cash.tradeAway} handleTeamClick={handleTeamClick} setStage={setStage} checkedTeams={teamsForTrade['tradeAway']}/>
            case 'reviewTrade':
                return <ReviewTrade roflYear={roflYear} setStage={setStage} teamsForTrade={teamsForTrade} cash={cash}/>
        }
    }
    
  return getContent(stage)
}

export default ProposeTrade;
