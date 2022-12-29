import React, {useState, useEffect} from 'react';
import styled from 'styled-components'
import CurrencyInput from 'react-currency-input-field';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import useApi from '../../hooks/useApi';
import { useDispatch } from 'react-redux';
// import sportReducer from '../../../reducers/sportReducer';
// import useApi from '../../hooks/useApi'

const Input = styled.input`
font-family: "helvetica neue", Helvetica, arial, sans-serif; 

  height: 50px;
  width: 100%;
  border: 0;
  border-radius: 4px;
  font-size: 0.9em;
  background-color: #ECF1F4;
  text-indent: 20px;
  margin-bottom: 10px;
`;

const TeamRow = styled.div`
    display: flex;
    flex-direction: row;
`
const ErrorContainer = styled.div`
    color: red;
`

function TeamSelect({errors, mode, setStage, checkedTeams, handleTeamClick, cashValue, handleCashValueChange}) {

    console.log("here is cash value")
    console.log(cashValue)
    // mode can be addTeam, tradeFor, tradeAway
    const dispatch = useDispatch();

    const { props } = useSelector((state) => ({
        ...state.modalReducer
      }));

    const { currentOrganization } = useSelector((state) => ({
        ...state.authReducer
    }));

    const {sportTeams, roflYear, activeYears, playoffMonths, leagueTable} = useSelector((state) => ({
        ...state.sportReducer
    }))

    const { makeRequest, isLoading } = useApi();

    // let initialCheckedTeams = {}
    // Object.keys(props.roster).forEach(team => {
    //     if(props.roster[team].teamId){
    //         initialCheckedTeams[props.roster[team].teamId] = false
    //     }
    // })
    // if(mode === 'tradeAway'){
    //     Object.keys(props.currentUserRoster).forEach(team => {
    //         if(props.currentUserRoster[team].teamId){
    //             initialCheckedTeams[props.roster[team].teamId] = false
    //         }
    //     })
    // } else {
        
    // }


    // const [cashValue, setCashValue] = useState(null)
    const [maxBid, setMaxBid] = useState(checkedTeams.cash)
    
    // const [errors, setErrors] = useState({
    //     bid: null,
    //     leagueCount: null
    // })

    // this function sets errors in state and returns
    // true if there is an error and false if there is NO error
    // const checkForBidError = (bid, maxBid) => {
    //     let newErrors = errors
    //     if(bid > maxBid){
    //         newErrors.bid = "Your bid is too high"
    //     } else {
    //         newErrors.bid = null
    //     }
    //     setErrors(newErrors)
    //     if(bid > maxBid){
    //         return true
    //     } else {
    //         return false
    //     }
    // }

    // this function sends a toast error if there is an error and returns
    // true if there is an error and false if there is NO error
    const checkForLeagueCountError = () => {
        teamCountByLeague[Number(String(props.selectedTeam)[0])]++
        Object.keys(checkedTeams).forEach(team => {
            if(checkedTeams[team]){
                teamCountByLeague[Number(String(team)[0])]--
            }
        })
        for(let league in teamCountByLeague){
            if(teamCountByLeague[league] < 1 && Object.keys(activeYears[2022]).includes(league)){
                toast.error(`This bid would result in you having not enough ${leagueTable[league]} teams, you need at least 1`)
                return false
            } else if(teamCountByLeague[league] > 3){
                toast.error(`This bid would result in you having too many ${leagueTable[league]} teams, you may have a maximum of 3`)
                return false
            }
        }
        return true
    }

    const addTeamRequest = async () => {
        const leagueCountPassed = checkForLeagueCountError()
        if(!leagueCountPassed) return

        const bidValueHasError = checkForBidError()
        if(bidValueHasError){
            toast.error(`Your bid value is too high, maximum bid value is ${maxBid}`)
            return
        }
        
        if(bidValue <= 0){
            toast.error("Bid Value must be at least $1")
            return
        } 

        const res = await makeRequest({
            method: "post",
            route: `/users/bids`,
            data: {
                organizationId: currentOrganization.id,
                userId: currentOrganization.user_id,
                teamId: props.selectedTeam,
                roflYear,
                bidValue, 
                droppedTeams: Object.keys(checkedTeams).filter(team => checkedTeams[team] === true).map(team => Number(team)),
                roflMonth: activeYears[2022][Number(String(props.selectedTeam)[0])].roflMonth + 1
                // roflMonth: activeYears[roflYear][Number(String(props.selectedTeam)[0])].roflMonth
            }
        });
        if(res.statusCode === 201){
            toast.success('Request submitted successfully')
            dispatch({
                type: "CLOSE_MODAL",
              });
        } else {
            toast.error("There was an error submitting your request")
        }
    }

    let teamCountByLeague= {
        1: 0,
        2: 0,
        3: 0,
        4: 0
      };
      Object.keys(props.currentRoster)
        .filter((key) => key !== "cash")
        .forEach((team) => {
          let leagueId = props.currentRoster[team].leagueId;
          if(leagueId) teamCountByLeague[leagueId]++;
        });

        const goBack = () => {
            setStage('tradeFor')
        }

        const topText = {
            addTeam: <><p>Submit Bid</p><p>Choose team(s) to drop.</p><p>Teams in their last month before the playoffs have no cash value when dropped</p></>,
            tradeFor: <><p>Choose teams to trade for</p></>,
            tradeAway: <><p>Choose teams to trade away</p></>
        }

        const submitText = {
            addTeam: "Submit",
            tradeFor: "Next",
            tradeAway: "Review Trade"
        }

        const aboveCashValue = {
            addTeam: "Bid Amount",
            tradeFor: "Rofl Cash (optional)",
            tradeAway: "roflCash (optional)"
        }

        const maxCashAllowed = {
            addTeam: <><p>Max bid allowed</p><p>{maxBid}</p></>,
            tradeFor: <><p>User cash: {props.currentRoster.cash}</p></>,
            tradeAway: <><p>User cash: {props.currentUserRoster.cash}</p></> 
        }

        const handleSubmit = () => {
            switch(mode){
                case 'addTeam': addTeamRequest()
                    break;
                case 'tradeFor': setStage('tradeAway')
                    break;
                case 'tradeAway': setStage('reviewTrade')
                    break;
                default: console.error('stage not found')
            }
            
        }

    // const getRosterForDisplay = () => {
    //     switch(mode){
    //         case 'addTeam': props.roster
    //             break;
    //         case 'tradeFor': props.currentRoster
    //             break;
    //         case 'tradeAway': props.currentUserRoster
    //             break;
    //     }
    //     Object.keys(props.roster)
    // }

    return(
    <div>
        {topText[mode]}
        {
           Object.keys(checkedTeams).filter(key => key!=='cash').map(teamId => {
                const teamValue = checkedTeams[teamId].val
                const leagueId = Number(String(teamId)[0])
                const teamName = `${sportTeams[leagueId][teamId].city} ${sportTeams[leagueId][teamId].name}`
                
                // only return team if they are droppable (active league not in playoffs)
                if(
                    activeYears[2022][leagueId] && activeYears[2022][leagueId].playoffs === 1
                    ||
                    activeYears[2022][leagueId].roflMonth !== activeYears[2022][leagueId].roflMonth
                    ){
                    return null
                } else {
                    return(
                    <TeamRow>
                        <p>{teamName} {playoffMonths[2022][leagueId] - 1 === activeYears[2022][leagueId].roflMonth ? null : `($${teamValue})`}</p>
                        <input
                            type="checkbox"
                            checked={checkedTeams[teamId].checked}
                            onChange={() => handleTeamClick(teamId)}
                            disabled={teamCountByLeague[Number(String(props.selectedTeam)[0])] >= 3 && Number(String(props.selectedTeam)[0]) !== leagueId}
                        />
                    </TeamRow>
                    )
                }
                
            })
        }
        
        {
            maxCashAllowed[mode]
        }

        <p>{aboveCashValue[mode]}</p>
        <CurrencyInput
            prefix={'$'}
            placeholder="Cash Value"
            value={cashValue}
            onValueChange={(value) => handleCashValueChange(value)}
            allowDecimals={false}
            allowNegativeValue={false}
          />
          <ErrorContainer>{errors?.bid ? <p>{errors.bid}</p> : null}</ErrorContainer>
          {mode==='tradeAway' ? <button onClick={goBack}>Go Back</button>: null}
          <button disabled={errors?.bid} onClick={() => handleSubmit()}>{submitText[mode]}</button>
          
    </div>
    )
}

export default TeamSelect