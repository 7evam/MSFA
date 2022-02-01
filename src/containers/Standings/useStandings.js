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

    useEffect(() => {
        fetchStandings()
    }, []);

    const fetchStandings = async () => {
        var res = await makeRequest({
            method: "get",
            route: `/organizations/memberStandings/1`
          });
          setRoflMonth(10)
          setSelectedRoflYear(2021)
          setStandings(JSON.parse(res.body))
    }

    const test = 'hi'

  return {
    standings,
    roflMonth,
    selectedRoflYear,
    setRoflMonth
  }
}

export default useStandings

// 1-2021: {
//    user_id: points
// }

// {
//     1-2021: [
//         {
//             user_id
//             user_team_name:
//             user_name:
//             monthlyPoints:
//             cumulativePoints:
//         }
//     ]
// }