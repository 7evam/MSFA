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

  const { name, currentOrganization } = useSelector((state) => ({
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
  const [updateOneMonth, setUpdateOneMonth] = useState(false);
  const [loadingRoster, setLoadingRoster] = useState(false);
  // const [currentTeams, setCurrentTeams] = useState(null)

  const fetchRoster = async (selectedYear) => {
    try {
      setLoadingRoster(true);
      const res = await makeRequest({
        method: 'get',
        route: `/users/roster/${currentOrganization.user_id}/${currentOrganization.id}/${selectedYear}`,
      });
      const fetchedRoster = res.body;
      console.log(`here is roster from fetch roster year ${selectedYear}`);
      console.log(roster);
      if (roster) {
        console.log('roster exiists, adding roster');
        setRoster({
          ...roster,
          ...fetchedRoster,
        });
        setLoadingRoster(false);
      } else {
        setRoster(fetchedRoster);
        setOriginalRoster(JSON.parse(JSON.stringify(fetchedRoster)));
        setLoadingRoster(false);
      }
    } catch (e) {
      setLoadingRoster(false);
      console.log('problem');
      console.log('here is params');
      console.log(currentOrganization.id);
      console.log(selectedYear);
      console.error(e);
    }
  };

  // const fetchCurrentTeams = async (selectedRoflYear) => {
  //   try {
  //     var res = await makeRequest({
  //       method: "get",
  //       route: `/users/currentTeams/${currentOrganization.user_id}/${currentOrganization.id}/${selectedRoflYear}`
  //     });
  //     const currentTeams = JSON.parse(res.body);
  //     setCurrentTeams(currentTeams);
  //   } catch (e) {
  //     console.log("problem");
  //     console.log("here is params");
  //     console.log(currentOrganization.id);
  //     console.log(selectedRoflYear);
  //     console.error(e);
  //   }
  // }

  const initiateAndReturnRoflMonth = () => {
    // initiate active rofl months for all active years within org
    let activeRoflMonths = {};
    Object.keys(activeYears).forEach((roflYear) => {
      if (activeYearArray.includes(roflYear)) {
        activeRoflMonths = {
          ...activeRoflMonths,
          ...activeYears,
        };
      }
    });

    // show the latest current rofl month
    let roflMonthToShow = 1;
    Object.keys(activeRoflMonths[selectedYear]).forEach((activeLeague) => {
      // console.log('here is an active league')
      // console.log(activeRoflMonths[initialYear][activeLeague].roflMonth)
      if (activeRoflMonths[selectedYear][activeLeague].roflMonth > roflMonthToShow) {
        roflMonthToShow = activeRoflMonths[selectedYear][activeLeague].roflMonth;
      }
    });

    // set rofl month/year valules and return year
    setActiveRoflMonths(activeRoflMonths);
    setActiveRoflYears(activeYearArray);
    setRoflMonth(roflMonthToShow);
  };

  // useEffect(() => {
  //   if (activeYears) {
  //     const initialYear = initiateAndReturnRoflMonthAndYear();
  //     fetchRoster(initialYear);
  //   }
  // }, [activeYears]);

  useEffect(() => {
    if (activeYears && selectedYear) {
      initiateAndReturnRoflMonth();
      fetchRoster(selectedYear);
    }
  }, [activeYears, selectedYear]);

  // const addYearToRoster = async (newYear) => {
  //   const oldRoster = roster
  //   setRoster(null)
  //   const newRoster = await
  // }

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

  const changeRoster = (slot) => {
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
        toast.error('Teams not swapable');
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
        data: {
          updateOneMonth,
          roster: updatedRoster,
        },
      });
      if (res.statusCode === 200 && res.body.success === true) {
        // JSON.parse(JSON.stringify()) creates a deep copy
        // setRoster(JSON.parse(JSON.stringify(roster)));
        setOriginalRoster(JSON.parse(JSON.stringify(roster)));
        // setOriginalRoster(
        //   fillRoster(JSON.parse(JSON.stringify(roster)), selectedRoflYear)
        // );
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

  // useEffect(() => {
  //   if (
  //     activeRoflYears
  //     && activeRoflYears.length === 2
  //   ) {
  //     console.log('this should log ONLY if you switched to new year');
  //     fetchRoster(selectedRoflYear);
  //   }
  // }, [selectedRoflYear]);

  return {
    selectedYear,
    roflMonth,
    roster,
    currentOrganization,
    changeRoster,
    selectedSlot,
    areRostersEqual,
    setRoflMonth,
    handleSubmit,
    activeRoflMonths,
    updateOneMonth,
    setUpdateOneMonth,
    name,
    loadingRoster,
  };
}

export default useRoster;
