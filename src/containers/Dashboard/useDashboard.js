import React, {useState, useEffect} from 'react';
import useApi from '../../hooks/useApi'
import {useHistory} from 'react-router-dom'
import { useDispatch } from "react-redux";
import {useSelector} from 'react-redux'
import {checkIfRostersAreEqual} from '../../utils'
import { toast } from 'react-toastify';

function useDashboard() {

    const {makeRequest, isLoading} =  useApi()
    const history = useHistory()
    const dispatch = useDispatch()

    const {currentOrganization} = useSelector(state => ({
        ...state.authReducer
      }));

    const {activeYears, currentDate} = useSelector(state => ({
      ...state.sportReducer
    }))

    const getAndSetActiveRoflYearsAndReturnSelectedYear = () => {
      let populatedActiveYears = []
      console.log('get and set active rofl years called, here is raw active years data')
      console.log(activeYears)
      activeYears.forEach(year => {
        console.log("here is one year")
        console.log(year)
        console.log(Object.keys(year)[0])
        populatedActiveYears.push(Object.keys(year)[0])
      })
      setActiveRoflYears(populatedActiveYears)
      setSelectedRoflYear(populatedActiveYears[0])
      return populatedActiveYears[0]
    }
    
    const [roster, setRoster] = useState(null)
    const [activeRoflYears, setActiveRoflYears]  = useState(null)
    const [selectedRoflYear, setSelectedRoflYear] = useState(null)
    const [roflMonth, setRoflMonth] =  useState(null)
    // this is an object like {2021: [{league_id: 3, rofl_month: 10}, {league_id: 4, rofl_month: 10}]} to help know which slots are locked
    const [activeRoflMonths, setActiveRoflMonths] = useState(null)

    // const fetchDate = async () => {
    //   try{
    //     var res = await makeRequest({
    //         method: "get",
    //         route: `/organizations/date/${currentOrganization.id}`
    //       });
    //       console.log('here is date')
    //       console.log(res)
    // } catch(e){
    //   console.log('problem')
    //   console.error(e)
    // }
    // }


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
        console.log('there is no roster setting lowest rofl month')
        const lowestMonth = getLowestRoflMonthOfYear(Object.keys(activeYears[0])[0], result)
        console.log('heres lowest active month')
        console.log(lowestMonth)
        setRoflMonth(lowestMonth)
      }
    }

    const getLowestRoflMonthOfYear = (year, activeRoflMonths) => {
      console.log('calling getlowest rofl month of year')
      console.log('here is year and 2nd param')
      console.log(year)
      console.log(activeRoflMonths)

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

    const fetchRoster = async (selectedRoflYear) => {
        try{
            var res = await makeRequest({
                method: "get",
                route: `/users/roster/2/${currentOrganization.id}/${selectedRoflYear}`
              });
              console.log('here is res')
              console.log(res)
              // setRoster({
              //   [`${month}-${year}`]: JSON.parse(res.body)
              // })
              setRoster(JSON.parse(res.body))
        } catch(e){
          console.log('problem')
          console.error(e)
        }
    }

  useEffect(() => {
    if(activeYears){
      console.log('here is active Years')
      console.log(activeYears)
      getAndSetActiveRoflMonths()
      const returnedSelectedYear = getAndSetActiveRoflYearsAndReturnSelectedYear()
      console.log('here is returned selected year')
      console.log(returnedSelectedYear)
      fetchRoster(returnedSelectedYear)
    }
  }, [activeYears]);

  useEffect(() => {
    console.log('selected rofl year changed :)')
    if(activeRoflYears && activeRoflYears.length === 2 && selectedRoflYear === activeRoflYears[1]){
      console.log('this should log ONLY if you switched to new year')
    }
  }, [selectedRoflYear]);

  const changeSelectedYear = async (newYear) => {
    setRoster(null)
    setSelectedRoflYear(newYear)
    setRoflMonth(getLowestRoflMonthOfYear(newYear, activeRoflMonths))
    await fetchRoster(newYear)
  }


  return {
    activeRoflYears,
    selectedRoflYear,
    roflMonth,
    roster,
    currentOrganization,
    activeYears,
    setSelectedRoflYear,
    changeSelectedYear
  }
}

export default useDashboard
