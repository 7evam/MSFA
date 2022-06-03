import React, { useState, useEffect } from "react";
import useApi from "../../hooks/useApi";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { checkIfRostersAreEqual } from "../../utils";
import { toast } from "react-toastify";

function useDashboard() {
  const { makeRequest, isLoading } = useApi();
  const history = useHistory();
  const dispatch = useDispatch();

  const { currentOrganization } = useSelector((state) => ({
    ...state.authReducer
  }));

  const { activeYears, currentDate } = useSelector((state) => ({
    ...state.sportReducer
  }));

  const getAndSetActiveRoflYearsAndReturnSelectedYear = () => {
    let populatedActiveYears = [];

    Object.keys(activeYears).forEach((year) => {
      populatedActiveYears.push(year);
    });
    setActiveRoflYears(populatedActiveYears);
    setSelectedRoflYear(populatedActiveYears[0]);
    return populatedActiveYears[0];
  };

  const [roster, setRoster] = useState(null);
  const [activeRoflYears, setActiveRoflYears] = useState(null);
  const [selectedRoflYear, setSelectedRoflYear] = useState(null);
  const [roflMonth, setRoflMonth] = useState(null);
  // this is an object like {2021: [{league_id: 3, roflMonth: 10}, {league_id: 4, roflMonth: 10}]} to help know which slots are locked
  const [activeRoflMonths, setActiveRoflMonths] = useState(null);

  const getAndSetActiveRoflMonths = () => {
    let result = {};
    Object.keys(activeYears).forEach(roflYear => {
      result[roflYear] = [];
      Object.keys(activeYears[year]).forEach((leagueId) => {
        result[roflYear].push({
          leagueId,
          roflMonth: activeYears[roflYear][leagueId].roflMonth
        });
      });
    });
    setActiveRoflMonths(result);
    if (!roster) {
      const lowestMonth = getLowestRoflMonthOfYear(
        Object.keys(activeYears)[0],
        result
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
      console.error("mistake getting lowest rofl month");
    } else {
      return lowestMonth;
    }
  };

  const fetchRoster = async (selectedRoflYear) => {
    try {
      var res = await makeRequest({
        method: "get",
        route: `/users/roster/2/${currentOrganization.id}/${selectedRoflYear}`
      });

      setRoster(JSON.parse(res.body));
    } catch (e) {
      console.log("problem");
      console.error(e);
    }
  };

  useEffect(() => {
    if (activeYears) {
      getAndSetActiveRoflMonths();
      const returnedSelectedYear = getAndSetActiveRoflYearsAndReturnSelectedYear();
      fetchRoster(returnedSelectedYear);
    }
  }, [activeYears]);

  useEffect(() => {
    if (
      activeRoflYears &&
      activeRoflYears.length === 2 &&
      selectedRoflYear === activeRoflYears[1]
    ) {
    }
  }, [selectedRoflYear]);

  const changeSelectedYear = async (newYear) => {
    setRoster(null);
    setSelectedRoflYear(newYear);
    setRoflMonth(getLowestRoflMonthOfYear(newYear, activeRoflMonths));
    await fetchRoster(newYear);
  };

  return {
    activeRoflYears,
    selectedRoflYear,
    roflMonth,
    roster,
    currentOrganization,
    activeYears,
    setSelectedRoflYear,
    changeSelectedYear
  };
}

export default useDashboard;
