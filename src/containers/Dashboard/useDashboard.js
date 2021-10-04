import React, {useState, useEffect} from 'react';
import useApi from '../../hooks/useApi'
import {useHistory} from 'react-router-dom'
import { useDispatch } from "react-redux";


function useDashboard() {

    const {makeRequest, isLoading} =  useApi()
    const history = useHistory()
    const dispatch = useDispatch()

    const {entityId, userId} = useSelector(state => ({
        ...state.userReducer
      }));
    
    const [roster, setRoster] = useState(null)

    const fetchRoster = async  () => {
        try{
            var res = await makeRequest({
                method: "get",
                route: "/users/roster/2/1/2020",
                data:  {
                    email: values.email,
                    password:  values.password
                }
              });
            
        } catch(e){

        }
    }

  useEffect(() => {
    fetchRoster
  }, []);



  return {
    roster
  }
}

export default useDashboard
