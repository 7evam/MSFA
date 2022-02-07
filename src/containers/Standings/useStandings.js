import React, {useState, useEffect} from 'react';
import useApi from '../../hooks/useApi'
import {useHistory} from 'react-router-dom'
import { useDispatch } from "react-redux";
import {useSelector} from 'react-redux'
import {checkIfRostersAreEqual} from '../../utils'
import { toast } from 'react-toastify';

function useStandings() {

    const {activeYears} = useSelector(state => ({
        ...state.sportReducer
    }))

    const {makeRequest, isLoading} =  useApi()

    const [standings, setStandings] = useState(null)
    const [roflMonth, setRoflMonth] = useState(null)
    const [selectedRoflYear, setSelectedRoflYear] = useState(null)
    const [lastMonth, setLastMonth] = useState(null)

    useEffect(() => {
      activeYears && fetchStandings()
    }, [activeYears]);

    const getInitialMonthAndYear = () => {
      const year = Object.keys(activeYears[0])[0]
      const maxMonth = Math.max.apply(Math, activeYears[0][year].map(function(o) { return o.roflMonth; }))
      setRoflMonth(maxMonth)
      setLastMonth(maxMonth)
      setSelectedRoflYear(year)
    }

    const fillStandings = (standings, year) => {

      let mostRecentSlot = null
      for(let i=1;i<=15;i++){
        if(standings[`${i}-${year}`]){
          mostRecentSlot = [...standings[`${i}-${year}`]]
        } else {
          standings[`${i}-${year}`] = mostRecentSlot
        }
      }

      return standings
    }

    const fetchStandings = async () => {
      getInitialMonthAndYear()
        var res = await makeRequest({
            method: "get",
            route: `/organizations/memberStandings/1`
          });
          const fullStandings = fillStandings(JSON.parse(res.body), selectedRoflYear)
          setStandings(fullStandings)
    }

  return {
    standings,
    roflMonth,
    selectedRoflYear,
    setRoflMonth,
    lastMonth
    }
}

export default useStandings