import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { checkIfRostersAreEqual } from '../../utils';
import useApi from '../../hooks/useApi';

function useRoster() {
  const { makeRequest, isLoading } = useApi();
  const history = useHistory();
  const dispatch = useDispatch();

  const { currentOrganization } = useSelector((state) => ({
    ...state.authReducer,
  }));

  const { activeYears, selectedYear } = useSelector((state) => ({
    ...state.sportReducer,
  }));

  const activeYearArray = Object.keys(currentOrganization.activeYears);

  const [roster, setRoster] = useState(null);
  const [originalRoster, setOriginalRoster] = useState(null);
  // const [selectedRoflYear, setSelectedRoflYear] = useState(null);
  const [roflMonth, setRoflMonth] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [areRostersEqual, setAreRostersEqual] = useState(true);
  const [activeRoflYears, setActiveRoflYears] = useState(null);
  // this is an object like {2021: [{league_id: 3, rofl_month: 10}, {league_id: 4, rofl_month: 10}]} to help know which slots are locked
  const [activeRoflMonths, setActiveRoflMonths] = useState(null);

  // const getAndSetActiveRoflYearsAndReturnSelectedYear = () => {
  //   // let populatedActiveYears = [];

  //   // activeYears.forEach((year) => {
  //   //   populatedActiveYears.push(Object.keys(year)[0]);
  //   // });
  //   setActiveRoflYears(activeYearArray);
  //   setSelectedRoflYear(activeYearArray[0]);
  //   return activeYearArray[0];
  // };

  const getAndSetActiveRoflMonths = () => {
    const result = {};
    Object.keys(activeYears).forEach((roflYear) => {
      result[roflYear] = [];
      Object.keys(activeYears[year]).forEach((leagueId) => {
        result[roflYear].push({
          leagueId,
          roflMonth: activeYears[roflYear][leagueId].roflMonth,
        });
      });
    });
    setActiveRoflMonths(result);
    if (!roster) {
      const lowestMonth = getLowestRoflMonthOfYear(
        Object.keys(activeYears)[0],
        result,
      );
      setRoflMonth(lowestMonth);
    }
  };

  const getLowestRoflMonthOfYear = (year, activeRoflMonths) => {
    let lowestMonth = 100;
    activeRoflMonths[year].forEach((league) => {
      if (league.roflMonth < lowestMonth) lowestMonth = league.roflMonth;
    });
    if (lowestMonth > 50) {
      console.error('mistake getting lowest rofl month');
    } else {
      return lowestMonth;
    }
  };

  const fillRoster = (roster, selectedYear) => {
    let mostRecentSlot = null;
    for (let i = 1; i <= 15; i++) {
      if (roster[`${i}-${selectedYear}`]) {
        mostRecentSlot = { ...roster[`${i}-${selectedYear}`] };
      } else {
        roster[`${i}-${selectedYear}`] = { ...mostRecentSlot, id: null };
      }
    }
    return { ...roster };
  };

  const fetchRoster = async (selectedYear) => {
    try {
      // console.log(`fetching for ${selectedRoflYear}`)
      const res = await makeRequest({
        method: 'get',
        route: `/users/roster/2/${currentOrganization.id}/${selectedYear}`,
      });
      const originalRoster = JSON.parse(res.body);
      const updatedRoster = fillRoster(originalRoster, selectedYear);
      setRoster({ ...updatedRoster });
      setOriginalRoster(fillRoster(JSON.parse(res.body), selectedYear));
      // setOriginalRoster(JSON.parse(res.body))
    } catch (e) {
      console.log('problem');
      console.log('here is params');
      console.log(currentOrganization.id);
      console.log(selectedYear);
      console.error(e);
    }
  };

  useEffect(() => {
    if (activeYearArray) {
      getAndSetActiveRoflMonths();
      const returnedSelectedYear = getAndSetActiveRoflYearsAndReturnSelectedYear();

      fetchRoster(returnedSelectedYear);
    }
  }, [activeYearArray]);

  useEffect(() => {
    if (
      activeRoflYears
      && activeRoflYears.length === 2
      && selectedYear === activeRoflYears[1]
    ) {
      console.log('this should log ONLY if you switched to new year');
    }
  }, [selectedYear]);

  const checkIfSwapable = (team1, team2, slot1, slot2) => {
    // if both slots are league slots, return false. this assumes only slot team per league
    if (slot1.includes('league') && slot2.includes('league')) {
      return false;
      // if neither slot is a league slot, return true
    } if (!slot1.includes('league') && !slot2.includes('league')) {
      return true;
    }
    if (slot1.includes('league')) {
      if (
        Number(currentOrganization[slot1].id)
          === Number(team2.sport_league.id)
      ) {
        return true;
      }
      return false;
    } if (slot2.includes('league')) {
      if (
        Number(currentOrganization[slot2].id)
          === Number(team1.sport_league.id)
      ) {
        return true;
      }
      return false;
    }
    console.log('edge case uh oh');

    return true;
  };

  const test = (slot) => {
    if (selectedSlot) {
      const team1 = { ...roster[`${roflMonth}-${selectedYear}`][slot] };
      const team2 = {
        ...roster[`${roflMonth}-${selectedYear}`][selectedSlot],
      };
      if (checkIfSwapable(team1, team2, slot, selectedSlot)) {
        const newRoster = { ...roster };
        newRoster[`${roflMonth}-${selectedYear}`][slot] = team2;
        newRoster[`${roflMonth}-${selectedYear}`][selectedSlot] = team1;

        setAreRostersEqual(
          checkIfRostersAreEqual(
            originalRoster[`${roflMonth}-${selectedYear}`],
            newRoster[`${roflMonth}-${selectedYear}`],
          ),
        );
      } else {
        console.log('teams not swapable');
      }
      setSelectedSlot(null);
    } else {
      setSelectedSlot(slot);
    }
  };

  const handleSubmit = async () => {
    const updatedRoster = {};
    // consruct updated roster object by only getting slots with league flex or bench in them and adding them to object
    Object.keys(roster[`${roflMonth}-${selectedYear}`])
      .filter(
        (key) => key.includes('league')
          || key.includes('flex')
          || key.includes('bench'),
      )
      .forEach((slot) => {
        if (roster[`${roflMonth}-${selectedYear}`][slot]) {
          updatedRoster[slot] = Number(
            roster[`${roflMonth}-${selectedYear}`][slot].id,
          );
        }
      });
    try {
      const res = await makeRequest({
        method: 'patch',
        route: `/users/roster/${currentOrganization.user_id}/${currentOrganization.id}/${selectedYear}/${roflMonth}`,
        data: updatedRoster,
      });

      if (res.statusCode === 200 && JSON.parse(res.body).success === true) {
        // JSON.parse(JSON.stringify()) creates a deep copy
        setOriginalRoster(
          fillRoster(JSON.parse(JSON.stringify(roster)), selectedYear),
        );
        setAreRostersEqual(true);
        toast.success('Roster updated successfully');
      } else {
        setRoster({ ...originalRoster });
        setAreRostersEqual(true);
        setSelectedSlot(null);
        toast.error('Failed to update roster');
        console.error(res.message);
      }
    } catch (e) {
      console.log('problem');
      console.error(e);
    }
  };

  return {
    selectedYear,
    roflMonth,
    roster,
    currentOrganization,
    test,
    selectedSlot,
    areRostersEqual,
    setRoflMonth,
    handleSubmit,
    activeYears,
    activeRoflMonths,
  };
}

export default useRoster;
