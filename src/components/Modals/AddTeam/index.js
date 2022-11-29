import React, {useState, useEffect} from 'react';
import styled from 'styled-components'
import CurrencyInput from 'react-currency-input-field';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import useApi from '../../../hooks/useApi';
import { useDispatch } from 'react-redux';
import sportReducer from '../../../reducers/sportReducer';
import { checkIfEmptySlot } from '../../../utils';
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

function AddTeam() {
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

    const leagueFromTeamId = (team) => {
        return Number(String(team)[0]);
      };

    const [maxBid, setMaxBid] = useState(props.roster.cash)
    const [checkedTeams, setCheckedTeams] = useState(initialCheckedTeams)
    const [errors, setErrors] = useState({
        leagueCount: null
    })

    // const roflMonth = activeYears[2022][Number(String(props.selectedTeam)[0])].roflMonth + 1
    const userMustDropTeam = !checkIfEmptySlot(props.currentRoster, activeYears[2022][Number(String(props.selectedTeam)[0])].roflMonth + 1)
    const selectedTeamName = `${sportTeams[leagueFromTeamId(props.selectedTeam)][props.selectedTeam].city} ${sportTeams[leagueFromTeamId(props.selectedTeam)][props.selectedTeam].name}`

    const handleTeamClick = (team) => {
        const newCheckedTeams = {...checkedTeams}
        newCheckedTeams[team.teamId] = !newCheckedTeams[team.teamId]
        if(Object.values(newCheckedTeams).filter(val => val === true).length >1){
            toast.error('You can only drop 1 team to add a team')
            return
        } else {
            let newMaxBid = maxBid
            // if team is league with active playoff month it cannot be dropped for cash
            if(playoffMonths[2022][team.leagueId] - 1 !== activeYears[2022][team.leagueId].roflMonth){
                newCheckedTeams[team.teamId] === true ? newMaxBid += team.val : newMaxBid -= team.val
                setMaxBid(newMaxBid)
            }
            setCheckedTeams(newCheckedTeams)
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
                toast.error(`This add would result in you having not enough ${leagueTable[league]} teams, you need at least 1`)
                return false
            } else if(teamCountByLeague[league] > 3){
                toast.error(`This add would result in you having too many ${leagueTable[league]} teams, you may have a maximum of 3`)
                return false
            }
        }
        return true
    }

    // const sleep = async (ms) => {
    //     return new Promise(resolve => setTimeout(resolve, ms));
    //   }

    const handleSubmit = async () => {
        const leagueCountPassed = checkForLeagueCountError()
        if(!leagueCountPassed) return

        const res = await makeRequest({
            method: "post",
            route: `/users/addTeam`,
            data: {
                organizationId: Number(currentOrganization.id),
                userId: currentOrganization.user_id,
                teamId: Number(props.selectedTeam),
                roflYear,
                droppedTeams: Object.keys(checkedTeams).filter(team => checkedTeams[team] === true).map(team => Number(team)),
                roflMonth: activeYears[2022][Number(String(props.selectedTeam)[0])].roflMonth + 1
                // roflMonth: activeYears[roflYear][Number(String(props.selectedTeam)[0])].roflMonth
            }
        });
        if(res.statusCode === 200 && res.body === 'success'){
            toast.success('Request submitted successfully')
            // sleep is necessary to refetch bids
            // await sleep(3000)
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
        <p>Add Team</p>
        {
            userMustDropTeam ?
            <div>
            <p>In order to add the {selectedTeamName} you need an empty slot. Select which team you would like to drop to add the {selectedTeamName}. You will receive the cash value for the team you drop and add the {selectedTeamName} for $1</p>
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
            </div>
            :
            <p>You have an empty slot on your roster and may add the {selectedTeamName} for $1. Press confirm below to continue.</p>
        }
          <button onClick={() => handleSubmit()}>Confirm</button>
    </div>
    )
}


export default AddTeam