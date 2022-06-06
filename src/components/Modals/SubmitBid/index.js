import React, {useState, useEffect} from 'react';
import styled from 'styled-components'
import CurrencyInput from 'react-currency-input-field';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

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

function SubmitBid() {

    const { props } = useSelector((state) => ({
        ...state.modalReducer
      }));

      const {sportTeams} = useSelector((state) => ({
        ...state.sportReducer
      }))

    let initialCheckedTeams = {}
    Object.keys(props.roster).forEach(team => {
        // console.log('here is team in for each')
        // console.log(props.roster[team])
        if(props.roster[team].teamId){
            initialCheckedTeams[props.roster[team].teamId] = false
        }
    })


    const [bidValue, setBidValue] = useState(null)
    const [maxBid, setMaxBid] = useState(props.roster.cash)
    const [checkedTeams, setCheckedTeams] = useState(initialCheckedTeams)
    const [errors, setErrors] = useState({
        bid: null
    })

    // useEffect(() => {
    //     console.log('using effect')
    //     let newErrors = errors
    //     if(bidValue > maxBid){
    //         console.log('error')
    //         newErrors.bid = "Your bid is too high"
    //     } else {
    //         newErrors.bid = null
    //     }
    //     setErrors(newErrors)
    // }, [bidValue, maxBid]);

    const checkForBidError = (bid, maxBid) => {
        let newErrors = errors
        if(bid > maxBid){
            newErrors.bid = "Your bid is too high"
        } else {
            newErrors.bid = null
        }
        setErrors(newErrors)
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
            newCheckedTeams[team.teamId] === true ? newMaxBid += team.val : newMaxBid -= team.val
            setCheckedTeams(newCheckedTeams)
            setMaxBid(newMaxBid)
            checkForBidError(bidValue, newMaxBid)
        }
    }
    
    return(
    <div>
        <p>Submit Bid</p>
        <p>Choose team(s) to drops</p>
        {
            Object.keys(props.roster).filter(key => key!=='cash').map(key => {
                const team = props.roster[key]
                return(
                    team.teamId ?
                <TeamRow>
                    <p>{sportTeams[team.leagueId][team.teamId].city} {sportTeams[team.leagueId][team.teamId].name} (${team.val})</p>
                    <input
                        type="checkbox"
                        checked={checkedTeams[team.teamId]}
                        onChange={() => handleTeamClick(team)}
                    />
                </TeamRow> : null
                )
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
          <button>Submit</button>
    </div>
    )
}


export default SubmitBid