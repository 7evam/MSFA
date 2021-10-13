import React, {useState, useEffect} from 'react';
import useApi from '../../hooks/useApi'
import {useHistory} from 'react-router-dom'
import { useDispatch } from "react-redux";
import {useSelector} from 'react-redux'

function useDashboard() {

    const {makeRequest, isLoading} =  useApi()
    const history = useHistory()
    const dispatch = useDispatch()

    const {currentOrganization} = useSelector(state => ({
        ...state.authReducer
      }));
    
    const [roster, setRoster] = useState(null)
    const [year, setYear]  = useState('2021')
    const [month, setMonth] =  useState('1')

    const fetchRoster = async  () => {
      console.log('hiiii')

        try{
            var res = await makeRequest({
                method: "get",
                route: `/users/roster/2/${month}/${year}`
              });
              console.log('here is res')
              console.log(JSON.parse(res.body))
              setRoster({
                [year]: {
                  [month]: JSON.parse(res.body)
                }
              })
        } catch(e){
          console.log('problem')
          console.error(e)
        }
    }

  useEffect(() => {
    console.log('hi')
    fetchRoster()
  }, []);



  return {
    year,
    month,
    roster,
    currentOrganization
  }
}

export default useDashboard
