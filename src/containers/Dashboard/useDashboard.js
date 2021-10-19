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

    const {activeYears} = useSelector(state => ({
      ...state.sportReducer
    }))
    
    const [roster, setRoster] = useState(null)
    const [year, setYear]  = useState('2021')
    const [month, setMonth] =  useState('1')

    const fetchRoster = async  () => {
        try{
            var res = await makeRequest({
                method: "get",
                route: `/users/roster/2/${currentOrganization.id}/${year}`
              });
              setRoster({
                [year]: JSON.parse(res.body)
              })
        } catch(e){
          console.log('problem')
          console.error(e)
        }
    }

  useEffect(() => {
    if(activeYears){
      fetchRoster()
    }
  }, [activeYears]);

  return {
    year,
    month,
    roster,
    currentOrganization
  }
}

export default useDashboard
