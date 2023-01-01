import React, {useState, useEffect} from 'react';
import styled from 'styled-components'
import CurrencyInput from 'react-currency-input-field';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import useApi from '../../../hooks/useApi';
import { useDispatch } from 'react-redux';
import sportReducer from '../../../reducers/sportReducer';
import { checkIfEmptySlot } from '../../../utils';
import TeamSelect from '../TeamSelect';
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

    const { props } = useSelector((state) => ({
        ...state.modalReducer
      }));

    // let initialCheckedTeams = {}
    // Object.keys(props.roster).forEach(team => {
    //     if(props.roster[team].teamId){
    //         initialCheckedTeams[props.roster[team].teamId] = false
    //     }
    // })

    const transformToCheckable = (roster) => {
        console.log("transforming this roster")
        console.log(roster)
        let checkableRoster = {}
        checkableRoster.cash = roster.cash
        Object.keys(roster).forEach(teamNum => {
            const team = roster[teamNum]
            console.log("here is team")
            console.log(team)
            if(team.teamId){
                checkableRoster[team.teamId] = {
                    checked: props.selectedTeam === team.teamId ? true : false,
                    val: team.val,
                    leagueId: team.leagueId
                }
            }
        })
        console.log('here is transformed roster')
        console.log(checkableRoster)
        return checkableRoster
    }

    const [checkedTeams, setCheckedTeams] = useState(transformToCheckable(props.roster))
    const [bid, setBid] = useState(0)
    const [errors, setErrors] = useState({
        bid: null,
        leagueCount: null
    })

    const handleCashValueChange = (val, maxBid) => {
        checkForBidError(val, maxBid)
        setBid(val)
    }

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

    const handleTeamClick = (teamId) => {
        const newCheckedTeams = {...checkedTeams}
        newCheckedTeams[teamId].checked = !newCheckedTeams[teamId].checked
        if(Object.values(newCheckedTeams[stage]).filter(team => team.checked === true).length > 3){
            toast.error('You can drop a maximum of 3 teams')
            return
        } else {
            setCheckedTeams(newCheckedTeams)
        }
    }

    return <TeamSelect mode={'addTeam'} errors={errors} checkedTeam={checkedTeams} handleTeamClick={handleTeamClick} cashValue={bid} handleCashValueChange={handleCashValueChange}/>
}


export default AddTeam