import React, {useState, useEffect} from 'react';
import useApi from '../../hooks/useApi'
import {useHistory} from 'react-router-dom'
import { useDispatch } from "react-redux";
import {useSelector} from 'react-redux'
import {checkIfRostersAreEqual} from '../../utils'
import { toast } from 'react-toastify';

function useRoster() {

    const {makeRequest, isLoading} =  useApi()
    const history = useHistory()
    const dispatch = useDispatch()

    const {currentOrganization} = useSelector(state => ({
        ...state.authReducer
      }));
    
    const [roster, setRoster] = useState(null)
    const [originalRoster, setOriginalRoster] = useState(null)
    const [year, setYear]  = useState('2021')
    const [month, setMonth] =  useState('1')
    const [selectedSlot, setSelectedSlot] = useState(null)
    const [areRostersEqual, setAreRostersEqual] = useState(true)

    const fetchRoster = async  () => {
        try{
            var res = await makeRequest({
                method: "get",
                route: `/users/roster/2/${currentOrganization.id}/${year}`
              });
              setRoster({
                [year]: JSON.parse(res.body)
              })
              setOriginalRoster({
                [year]: JSON.parse(res.body)
              })
        } catch(e){
          console.log('problem')
          console.error(e)
        }
    }

  useEffect(() => {
    fetchRoster()
  }, []);

  const checkIfSwapable = (team1, team2, slot1, slot2) => {
    
    // if both slots are league slots, return false. this assumes only slot team per league
    if(slot1.includes('league') && slot2.includes('league')){
      return false
    // if neither slot is a league slot, return true
    } else if(!slot1.includes('league') && !slot2.includes('league')){
      return true
    } else {
      if(slot1.includes('league')){
        if(Number(currentOrganization[slot1].id) === Number(team2.sport_league.id)){
          return true
        } else {
          return false
        }
      } else if(slot2.includes('league')){
        if(Number(currentOrganization[slot2].id) === Number(team1.sport_league.id)){
          return true
        } else {
          return false
        }
      } else {
        console.log('edge case uh oh')
      }
    }
    return true
  }


const test = (slot) => {
  if(selectedSlot){
    console.log('here is original roster')
    console.log(originalRoster)
    const team1 = roster[year][month][slot]
    const team2 = roster[year][month][selectedSlot]
    if(checkIfSwapable(team1, team2, slot, selectedSlot)){
      const newRoster = {...roster}
      newRoster[year][month][slot] = team2
      newRoster[year][month][selectedSlot] = team1
      setAreRostersEqual(checkIfRostersAreEqual(originalRoster[year][month], newRoster[year][month]))
    } else {
      console.log('teams not swapable')
    }
    setSelectedSlot(null)
    
  } else {
    setSelectedSlot(slot)
  }
}

const handleSubmit = async () => {
  const updatedRoster = {}
  Object.keys(roster[year][month]).filter(key => key.includes('league') || key.includes('flex') || key.includes('bench')).forEach(slot => {
    if(roster[year][month][slot]) updatedRoster[slot] = Number(roster[year][month][slot].id)
  })
  try{
    const res = await makeRequest({
      method: "patch",
      route: `/users/roster/${currentOrganization.user_id}/${currentOrganization.id}/${year}/${month}`,
      data: updatedRoster
    });

    if(res.statusCode === 200 && JSON.parse(res.body).success === true){
      console.log('success')
      console.log('here is original roster then roster')
      console.log(originalRoster)
      console.log(roster)
      // JSON.parse(JSON.stringify()) creates a deep copy
      setOriginalRoster(JSON.parse(JSON.stringify(roster)))
      setAreRostersEqual(true)
      toast.success("Roster updated successfully")
    }
  } catch(e){
    console.log('problem')
    console.error(e)
  }
}

  return {
    year,
    month,
    roster,
    currentOrganization,
    test,
    selectedSlot,
    originalRoster,
    areRostersEqual,
    setMonth,
    handleSubmit
  }
}

export default useRoster
