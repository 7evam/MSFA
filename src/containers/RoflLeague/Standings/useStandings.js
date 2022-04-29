import React, {useState, useEffect} from 'react';
import useApi from '../../../hooks/useApi'
import {useHistory} from 'react-router-dom'
import { useDispatch } from "react-redux";
import {useSelector} from 'react-redux'
import {checkIfRostersAreEqual} from '../../../utils'
import { toast } from 'react-toastify';

function useStandings() {

    // const {activeYears} = useSelector(state => ({
    //     ...state.sportReducer
    // }))

    const {currentOrganization} = useSelector(state => ({
      ...state.authReducer
  }))

  const history = useHistory()

  let activeYearArray = Object.keys(currentOrganization.activeYears)

    const {makeRequest, isLoading} =  useApi()

    const [standings, setStandings] = useState(null)
    const [roflMonth, setRoflMonth] = useState(null)
    const [selectedRoflYear, setSelectedRoflYear] = useState(activeYearArray[0])
    const [finalMonthForDisplay, setFinalMonthForDisplay] = useState(null)

    useEffect(() => {
      selectedRoflYear && fetchStandings()
    }, [selectedRoflYear]);

    const getInitialMonthAndYear = () => {
      // TODO get latest current rofl month
      const year = activeYearArray[0]
      // const maxMonth = Math.max.apply(Math, activeYear[0][year].map(function(o) { return o.roflMonth; }))
      const maxMonth = 1
      setRoflMonth(maxMonth)
      setFinalMonthForDisplay(maxMonth)
      setSelectedRoflYear(year)
    }

    // const fillStandings = (standings, year) => {

    //   let mostRecentSlot = null
    //   for(let i=1;i<=15;i++){
    //     if(standings[`${i}-${year}`]){
    //       mostRecentSlot = [...standings[`${i}-${year}`]]
    //     } else {
    //       standings[`${i}-${year}`] = mostRecentSlot
    //     }
    //   }

    //   return standings
    // }

    const fetchStandings = async () => {
      getInitialMonthAndYear()
        var res = await makeRequest({
            method: "get",
            route: `/organizations/memberStandings/${currentOrganization.id}/${selectedRoflYear}`
          });
          console.log('here is standings')
          console.log(JSON.parse(res.body))
          setStandings(JSON.parse(res.body))
          // const fullStandings = fillStandings(JSON.parse(res.body), selectedRoflYear)
          // setStandings(fullStandings)
    }

    const goToSquad = (userId) => {
      history.push(`/rofleague/${userId}/${selectedRoflYear}/${roflMonth}`)
    }

  return {
    standings,
    roflMonth,
    selectedRoflYear,
    setRoflMonth,
    finalMonthForDisplay,
    goToSquad
    }
}

export default useStandings