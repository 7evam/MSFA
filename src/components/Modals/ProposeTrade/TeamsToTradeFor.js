import React, {useState, useEffect} from 'react';
import styled from 'styled-components'
import CurrencyInput from 'react-currency-input-field';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import useApi from '../../../hooks/useApi';
import { useDispatch } from 'react-redux';

const TeamRow = styled.div`
    display: flex;
    flex-direction: row;
`
const ErrorContainer = styled.div`
    color: red;
`

function TeamsToTradeFor() {
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

    let initialCheckedTeams = {}
    Object.keys(props.roster).forEach(team => {
        if(props.roster[team].teamId){
            initialCheckedTeams[props.roster[team].teamId] = false
        }
    })

    const [bidValue, setBidValue] = useState(null)
    const [maxBid, setMaxBid] = useState(props.roster.cash)
    const [checkedTeams, setCheckedTeams] = useState(initialCheckedTeams)
    const [errors, setErrors] = useState({
        bid: null,
        leagueCount: null
    })

    // this function sets errors in state and returns
    // true if there is an error and false if there is NO error
    const checkForBidError = (bid, maxBid) => {
        let newErrors = errors
        if(bid > maxBid){
            newErrors.bid = "Your bid is too high"
        } else {
            newErrors.bid = null
        }
        setErrors(newErrors)
        if(bid > maxBid){
            return true
        } else {
            return false
        }
    }

    const handleBidChange = (value) => {
        checkForBidError(value, maxBid)
        setBidValue(value)
    }

    const handleTeamClick = (team) => {
        const newCheckedTeams = {...checkedTeams}
        newCheckedTeams[team.teamId] = !newCheckedTeams[team.teamId]
        if(Object.values(newCheckedTeams).filter(val => val === true).length >3){
            toast.error('You can conditionally drop a maximum of 3 teams')
            return
        } else {
            let newMaxBid = maxBid
            // if team is league with active playoff month it cannot be dropped for cash
            if(playoffMonths[2022][team.leagueId] - 1 !== activeYears[2022][team.leagueId].roflMonth){
                newCheckedTeams[team.teamId] === true ? newMaxBid += team.val : newMaxBid -= team.val
                setMaxBid(newMaxBid)
            }
            setCheckedTeams(newCheckedTeams)
            checkForBidError(bidValue, newMaxBid)
        }
    }

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

    const handleSubmit = async () => {
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

    return(
    <div>
        <p>Submit Bid</p>
        <p>Choose team(s) to drops</p>
        <p>Teams in their last month before the playoffs have no cash value when dropped</p>
        {
            Object.keys(props.roster).filter(key => key!=='cash' && props.roster[key].teamId).map(key => {
                const team = props.roster[key]
                const leagueId = team.leagueId ? team.leagueId : Number(String(team)[0])
                // only return team if they are droppable (active league not in playoffs)
                if(
                    activeYears[2022][leagueId] && activeYears[2022][leagueId].playoffs === 1
                    ||
                    activeYears[2022][leagueId].roflMonth !== activeYears[2022][Number(String(props.selectedTeam)[0])].roflMonth
                    ){
                    return null
                } else {
                    return(
                        team.teamId ?
                    <TeamRow>
                        <p>{sportTeams[team.leagueId][team.teamId].city} {sportTeams[team.leagueId][team.teamId].name} {playoffMonths[2022][team.leagueId] - 1 === activeYears[2022][team.leagueId].roflMonth ? null : `($${team.val})`}</p>
                        <input
                            type="checkbox"
                            checked={checkedTeams[team.teamId]}
                            onChange={() => handleTeamClick(team)}
                            disabled={teamCountByLeague[Number(String(props.selectedTeam)[0])] >= 3 && Number(String(props.selectedTeam)[0]) !== team.leagueId}
                        />
                    </TeamRow> : null
                    )
                }
                
            })
        }
        <p>Max bid allowed</p>
        <p>{maxBid}</p>
        <p>Bid Amount</p>
        <CurrencyInput
            prefix={'$'}
            placeholder="Cash Value"
            defaultValue={0}
            value={bidValue}
            onValueChange={(value) => handleBidChange(value)}
            allowDecimals={false}
            allowNegativeValue={false}
          />
          <ErrorContainer>{errors.bid ? <p>{errors.bid}</p> : null}</ErrorContainer>
          <button onClick={() => handleSubmit()}>Submit</button>
    </div>
    )
}


export default TeamsToTradeFor