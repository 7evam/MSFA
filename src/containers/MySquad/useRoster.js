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

    const {activeYears} = useSelector(state => ({
      ...state.sportReducer
    }))

    const [roster, setRoster] = useState(null)
    const [originalRoster, setOriginalRoster] = useState(null)
    const [selectedRoflYear, setSelectedRoflYear] = useState(null)
    const [roflMonth, setRoflMonth] =  useState(null)
    const [selectedSlot, setSelectedSlot] = useState(null)
    const [areRostersEqual, setAreRostersEqual] = useState(true)
    const [activeRoflYears, setActiveRoflYears] = useState(null)
    // this is an object like {2021: [{league_id: 3, rofl_month: 10}, {league_id: 4, rofl_month: 10}]} to help know which slots are locked
    const [activeRoflMonths, setActiveRoflMonths] = useState(null)

    const getAndSetActiveRoflYearsAndReturnSelectedYear = () => {
      let populatedActiveYears = []

      activeYears.forEach(year => {
        populatedActiveYears.push(Object.keys(year)[0])
      })
      setActiveRoflYears(populatedActiveYears)
      setSelectedRoflYear(populatedActiveYears[0])
      return populatedActiveYears[0]
    }

    const getAndSetActiveRoflMonths = () => {
      let result = {}
      activeYears.forEach(yearObject => {
        const year = Object.keys(yearObject)[0]
        result[year] = []
        yearObject[year].forEach(league => {
          result[year].push({leagueId: league.leagueId, roflMonth: league.roflMonth})
        })
      })
      setActiveRoflMonths(result)
      if(!roster){
        const lowestMonth = getLowestRoflMonthOfYear(Object.keys(activeYears[0])[0], result)

        setRoflMonth(lowestMonth)
      }
    }

    const getLowestRoflMonthOfYear = (year, activeRoflMonths) => {

      let lowestMonth = 100

      activeRoflMonths[year].forEach(league => {
        if(league.roflMonth < lowestMonth) lowestMonth = league.roflMonth
      })
      if(lowestMonth > 50){
        console.error('mistake getting lowest rofl month')
      } else {
        return lowestMonth
      }
    }

    // const fillRoster = (roster, year) => {
    //   const unlockSlotsInMonth = (month) => {
    //     for(let slot in month){
    //       month[slot].locked = false
    //     }
    //     return month
    //   }
    //   for(let i=2;i<=15;i++){
    //     let key = `${i}-${year}`
    //     if(!roster[key]){
    //       console.log(`unlocking for month ${i}`)
    //       roster[key] = unlockSlotsInMonth(JSON.parse(JSON.stringify(roster[`${i-1}-${year}`])))
    //     }
    //   }
    //   return roster
    // }



    const fetchRoster = async (selectedRoflYear) => {
        try{
            var res = await makeRequest({
                method: "get",
                route: `/users/roster/2/${currentOrganization.id}/${selectedRoflYear}`
              });
              const roster = JSON.parse(res.body)
              // const originalRoster = fillRoster(JSON.parse(res.body), selectedRoflYear)
              // console.log("here is original roster")
              // console.log(originalRoster)
              // setRoster({...originalRoster})
              setRoster({...roster})
              setOriginalRoster({...roster})
        } catch(e){
          console.log('problem')
          console.log('here is params')
          console.log(currentOrganization.id)
          console.log(selectedRoflYear)
          console.error(e)
        }
    }

    // useEffect(() => {
    //     if(activeYears){
    //         setYear(Object.keys(activeYears[0])[0])
    //         setMonth(activeYears[0][Object.keys(activeYears[0])[0]])
    //     }
    //   }, [activeYears]);

    // useEffect(() => {
    //     if(year){
    //       fetchRoster()
    //     }
    //   }, [year]);

    useEffect(() => {
      if(activeYears){
        getAndSetActiveRoflMonths()
        const returnedSelectedYear = getAndSetActiveRoflYearsAndReturnSelectedYear()
        fetchRoster(returnedSelectedYear)
      }
    }, [activeYears]);
  
    useEffect(() => {
      if(activeRoflYears && activeRoflYears.length === 2 && selectedRoflYear === activeRoflYears[1]){
        console.log('this should log ONLY if you switched to new year')
      }
    }, [selectedRoflYear]);

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


const changeRoster = (slot) => {
  if(selectedSlot){
    const team1 = {...roster[`${roflMonth}-${selectedRoflYear}`][slot]}
    const team2 = {...roster[`${roflMonth}-${selectedRoflYear}`][selectedSlot]}
    if(checkIfSwapable(team1, team2, slot, selectedSlot)){
      const newRoster = {...roster}
      newRoster[`${roflMonth}-${selectedRoflYear}`][slot] = team2
      newRoster[`${roflMonth}-${selectedRoflYear}`][selectedSlot] = team1
      setAreRostersEqual(checkIfRostersAreEqual(originalRoster[`${roflMonth}-${selectedRoflYear}`], newRoster[`${roflMonth}-${selectedRoflYear}`]))
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
  // consruct updated roster object by only getting slots with league flex or bench in them and adding them to object
  Object.keys(roster[`${roflMonth}-${selectedRoflYear}`]).filter(key => key.includes('league') || key.includes('flex') || key.includes('bench')).forEach(slot => {
    if(roster[`${roflMonth}-${selectedRoflYear}`][slot]) updatedRoster[slot] = Number(roster[`${roflMonth}-${selectedRoflYear}`][slot].id)
  })
  try{
    const res = await makeRequest({
      method: "patch",
      route: `/users/roster/${currentOrganization.user_id}/${currentOrganization.id}/${selectedRoflYear}/${roflMonth}`,
      data: updatedRoster
    });

    if(res.statusCode === 200 && JSON.parse(res.body).success === true){
      // JSON.parse(JSON.stringify()) creates a deep copy
      setOriginalRoster(fillRoster(JSON.parse(JSON.stringify(roster)), selectedRoflYear))
      setAreRostersEqual(true)
      toast.success("Roster updated successfully")
    } else {
      setRoster({...originalRoster})
      setAreRostersEqual(true)
      setSelectedSlot(null)
      toast.error('Failed to update roster')
      console.error(res.message)
    }
  } catch(e){
    console.log('problem')
    console.error(e)
  }
}

  return {
    selectedRoflYear,
    roflMonth,
    roster,
    currentOrganization,
    changeRoster,
    selectedSlot,
    areRostersEqual,
    setRoflMonth,
    handleSubmit,
    activeRoflMonths,
    setSelectedRoflYear
  }
}

export default useRoster
