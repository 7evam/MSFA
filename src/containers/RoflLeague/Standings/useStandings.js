import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { checkIfRostersAreEqual } from '../../../utils';
import useApi from '../../../hooks/useApi';

function useStandings() {
  const { selectedYear } = useSelector((state) => ({
    ...state.sportReducer,
  }));

  const { currentOrganization } = useSelector((state) => ({
    ...state.authReducer,
  }));

  const navigate = useNavigate();

  const { makeRequest, isLoading } = useApi();

  const [standings, setStandings] = useState(null);
  const [roflMonth, setRoflMonth] = useState(null);
  const [finalMonthForDisplay, setFinalMonthForDisplay] = useState(null);
  const [readyToRender, setReadyToRender] = useState(false);

  const getInitialMonth = (roster) => {
    const arrayOfMonths = [];
    Object.keys(roster).forEach((monthKey) => {
      arrayOfMonths.push(Number(monthKey.split('-')[0]));
    });
    const maxMonth = Math.max(...arrayOfMonths);
    setRoflMonth(maxMonth);
    setFinalMonthForDisplay(maxMonth);
  };

  const fetchStandings = async (year) => {
    const res = await makeRequest({
      method: 'get',
      route: `/organizations/memberStandings/${currentOrganization.id}/${year}}`,
    });

    const { body } = res;
    getInitialMonth(body);
    setStandings(body);
    setReadyToRender(true);
    // const fullStandings = fillStandings(JSON.parse(res.body), selectedRoflYear)
    // setStandings(fullStandings)
  };

  useEffect(() => {
    if (selectedYear) fetchStandings(selectedYear);
  }, [selectedYear]);

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

  const goToSquad = (userId) => {
    navigate(`/rofleague/${userId}/${selectedYear}/${roflMonth}`);
  };

  return {
    standings,
    roflMonth,
    setRoflMonth,
    finalMonthForDisplay,
    goToSquad,
    selectedYear,
    readyToRender,
  };
}

export default useStandings;
