import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import useApi from '../../hooks/useApi';

function useRoster(selectedUserId) {
  const { makeRequest, isLoading } = useApi();
  const history = useNavigate();
  const dispatch = useDispatch();

  const { name, currentOrganization } = useSelector((state) => ({
    ...state.authReducer,
  }));

  const { selectedYear, activeYears } = useSelector((state) => ({
    ...state.sportReducer,
  }));

  const activeYearArray = Object.keys(currentOrganization.activeYears);

  const [roster, setRoster] = useState(null);
  const [originalRoster, setOriginalRoster] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [areRostersEqual, setAreRostersEqual] = useState(true);

  // activeRoflMonths is an object like
  // {2021: [{league_id: 3, rofl_month: 10}, {league_id: 4, rofl_month: 10}]}
  // to help know which slots are locked
  const [activeRoflMonths, setActiveRoflMonths] = useState(null);
  const [updateOneMonth, setUpdateOneMonth] = useState(false);
  const [loadingRoster, setLoadingRoster] = useState(false);

  const fetchRoster = async (selectedYear) => {
    const userId = selectedUserId || currentOrganization.user_id;
    try {
      setLoadingRoster(true);
      const res = await makeRequest({
        method: 'get',
        route: `/users/roster/${userId}/${currentOrganization.id}/${selectedYear}`,
      });

      const fetchedRoster = res.body;

      if (roster) {
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
      console.error('Problem fetching roster:', e);
      console.error('Params used:', currentOrganization.id, selectedYear);
    }
  };

  const initiateAndReturnRoflMonth = () => {
    // initiate active rofl months for all active years within org
    let activeRoflMonths = {};
    Object.keys(currentOrganization.activeYears).forEach((roflYear) => {
      if (activeYearArray.includes(roflYear)) {
        activeRoflMonths = {
          ...activeRoflMonths,
          ...currentOrganization.activeYears,
        };
      }
    });

    // show the latest current rofl month
    let roflMonthToShow = 1;
    const activeRoflLeagueObjects = Object.values(activeYears[selectedYear]);
    activeRoflLeagueObjects.forEach((item) => {
      if (item.roflMonth > roflMonthToShow) roflMonthToShow = item.roflMonth;
    });

    // set rofl month/year valules and return year
    setActiveRoflMonths(activeRoflMonths);
    // setActiveRoflYears(activeYearArray);
    setSelectedMonth(roflMonthToShow);
  };

  useEffect(() => {
    if (currentOrganization.activeYears && selectedYear) {
      initiateAndReturnRoflMonth();
      fetchRoster(selectedYear);
    }
  }, [currentOrganization.activeYears, selectedYear]);

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

  const handleSubmit = async (newRoster) => {
    const updatedRoster = {};
    // consruct updated roster object by only getting slots with league flex or bench in them and adding them to object
    Object.keys(newRoster[`${selectedMonth}-${selectedYear}`])
      .filter(
        (key) => key.includes('league')
          || key.includes('flex')
          || key.includes('bench'),
      )
      .forEach((slot) => {
        if (newRoster[`${selectedMonth}-${selectedYear}`][slot]) {
          updatedRoster[slot] = Number(
            newRoster[`${selectedMonth}-${selectedYear}`][slot].id,
          );
        }
      });
    try {
      const res = await makeRequest({
        method: 'patch',
        route: `/users/roster/${currentOrganization.user_id}/${currentOrganization.id}/${selectedYear}/${selectedMonth}`,
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
      toast.error('Your request to change your roster could not be completed');
      setRoster({ ...originalRoster });
      console.error(e);
    }
  };

  const changeRoster = async (slot) => {
    if (selectedSlot) {
      const team1 = { ...roster[`${selectedMonth}-${selectedYear}`][slot] };
      const team2 = {
        ...roster[`${selectedMonth}-${selectedYear}`][selectedSlot],
      };
      if (checkIfSwapable(team1, team2, slot, selectedSlot)) {
        const newRoster = { ...roster };
        newRoster[`${selectedMonth}-${selectedYear}`][slot] = team2;
        newRoster[`${selectedMonth}-${selectedYear}`][selectedSlot] = team1;
        setRoster(newRoster);
        setSelectedSlot(null);
        await handleSubmit(newRoster);
        // setAreRostersEqual(
        //   checkIfRostersAreEqual(
        //     originalRoster[`${selectedMonth}-${selectedYear}`],
        //     newRoster[`${selectedMonth}-${selectedYear}`],
        //   ),
        // );
      } else {
        toast.error('Teams not swapable');
      }
      setSelectedSlot(null);
    } else {
      setSelectedSlot(slot);
    }
  };

  return {
    selectedYear,
    selectedMonth,
    roster,
    currentOrganization,
    changeRoster,
    selectedSlot,
    areRostersEqual,
    setSelectedMonth,
    handleSubmit,
    activeRoflMonths,
    updateOneMonth,
    setUpdateOneMonth,
    name,
    loadingRoster,
  };
}

export default useRoster;
