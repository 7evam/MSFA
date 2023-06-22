import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import '@fontsource/open-sans';
import { toast } from 'react-toastify';
import useApi from '../../hooks/useApi';
import RosterComponent from '../../components/Roster';
import Loading from '../../components/Loading';
import useHydration from '../../hooks/useHydration';
import { Container, League, LeagueSelector } from './components';
import { convertRealToRofl } from '../../utils';

function useAddTeam() {
  const dispatch = useDispatch();

  const { currentOrganization } = useSelector((state) => ({
    ...state.authReducer,
  }));

  const { modalContent } = useSelector((state) => ({
    ...state.modalReducer,
  }));

  const { selectedYear } = useSelector((state) => ({
    ...state.sportReducer,
  }));

  const { makeRequest, isLoading } = useApi();
  const {
    isHydrating,
    hydrateSportTeams,
    hydrateOrgMembers,
    hydrateDeadlines,
  } = useHydration();

  const {
    activeYears,
    currentDate,
    sportTeams,
    orgMembers,
    deadlines,
    playoffMonths,
  } = useSelector((state) => ({
    ...state.sportReducer,
  }));

  const getFirstLeagueToShow = () => {
    // this function calculates the first league to show for free agency
    // IE removes leagues that are inactive or are in their final (playoff) month
    const activeYear = activeYears[selectedYear];
    let result = 1;
    // if mlb is the only activee leeague, it should be the first shown
    if (!activeYear[2] && !activeYear[3]) return 1;
    // if mlb season is inactive (ended) then first active league is added by 1
    if (!activeYear[1] || activeYear[1].playoffs === 1) {
      result++;
    }
    // if nfl season is inactive (ended) then first active league is added by 1
    // we know the nfl season has ended if its inacctive because of the safeguard above
    // to return 1 if the only active league
    if (!activeYear[2] || activeYear[2].playoffs === 1) {
      result++;
    }
    return result;
  };

  const [currentRoster, setCurrentRoster] = useState(null);
  const [fullRoster, setFullRoster] = useState(null);
  const [selectedMember, setSelectedMember] = useState(
    currentOrganization.user_id,
  );
  const [unownedTeams, setUnownedTeams] = useState(null);
  // TODO this should be first available league not 1
  const [league, setLeague] = useState(null);
  const [firstLeagueToShow, setFirstLeagueToShow] = useState(null);
  const [readyToRender, setReadyToRender] = useState(false);
  const [currentYear, setCurrentYear] = useState(selectedYear);
  const [allBids, setAllBids] = useState(null);
  const [tab, setTab] = useState('rosters');
  const [modalHasBeenUsed, setModalHasBeenUsed] = useState(false);
  const [teamCountByLeague, setTeamCountByLeague] = useState(null);
  const [originalBids, setOriginalBids] = useState(null);
  const [trades, setTrades] = useState(null);
  const [firstActiveMonthForClaim, setFirstActiveMonthForClaim] = useState(null);
  const [error, setError] = useState(null);
  const [isArchived, setIsArchived] = useState(null);

  //   useEffect(() => {
  //     async function fetchData() {
  //       const abortController = new AbortController();
  //       try {
  //         await fetchScores(abortController);
  //         if (!sportTeams) await hydrateSportTeams(abortController);
  //         if (!activeYears) await hydrateActiveYears(abortController);
  //         const activeLeagueArray = Object.keys(activeYears[selectedYear]);
  //         const startingActiveLeague = Math.min(...activeLeagueArray);
  //         setLeague(startingActiveLeague);
  //         setDisplayMonthRange(startingActiveLeague);
  //         setReadyToRender(true);
  //       } catch (e) {
  //         setError(error);
  //       }
  //       return () => abortController.abort();
  //     }
  //     fetchData();
  //   }, []);

  const reFetchBids = async () => {
    const abortController = new AbortController();
    fetchAllBids(selectedYear, abortController);
    return () => abortController.abort();
  };

  const reFetchTrades = async () => {
    const abortController = new AbortController();
    fetchTrades(selectedYear, abortController);
    return () => abortController.abort();
  };

  const reFetchRoster = async () => {
    const abortController = new AbortController();
    fetchRoster(selectedYear, abortController);
    return () => abortController.abort();
  };

  const sleep = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  //   useEffect(() => {
  //     if (
  //       currentRoster
  //       && league
  //       && orgMembers
  //       && sportTeams
  //       && deadlines
  //       && unownedTeams
  //       && allBids
  //       && trades
  //     ) {
  //       setReadyToRender(true);
  //     }
  //   }, [
  //     currentRoster,
  //     orgMembers,
  //     sportTeams,
  //     deadlines,
  //     unownedTeams,
  //     allBids,
  //     league,
  //     trades,
  //   ]);

  const calculateCurrentRoflMonths = () => {
    const currentRoflMonths = {
      1: null,
      2: null,
      3: null,
      4: null,
    };
    Object.keys(currentRoflMonths).forEach((leagueId) => {
      if (activeYears[selectedYear] && activeYears[selectedYear][leagueId]?.roflMonth) {
        currentRoflMonths[leagueId] = activeYears[selectedYear][leagueId].roflMonth;
      } else {
        // calculate rofl month for league that hasn't started
        // TODO: test and modularize this function
        const today = new Date();
        const month = today.getMonth();
        // if mlb is active, month is current month minus 2
        // if mlb is inactive and month is between and 9 and 11, month is current month minus 2
        // if mlb is inactive and month is betweeen 0 and 5, month is current month plus 10
        let roflMonth;
        if (activeYears[selectedYear][1]) {
          roflMonth = month - 2;
        } else if (month > 9) {
          roflMonth = month - 2;
        } else {
          roflMonth = month + 10;
        }
        if (playoffMonths[selectedYear][leagueId] > roflMonth) {
          currentRoflMonths[leagueId] = roflMonth;
        }
      }
    });
    return currentRoflMonths;
  };

  const calculateAndSetUnownedTeams = (fullRoster) => {
    if (fullRoster && sportTeams && Object.keys(sportTeams).length) {
      // get owned teams
      const ownedTeams = [];
      Object.keys(fullRoster).forEach((member) => {
        Object.keys(fullRoster[member]).forEach((slot) => {
          const { teamId } = fullRoster[member][slot];
          if (teamId) ownedTeams.push(teamId);
          // ownedTeams.push(fullRoster[member][slot].teamId);
        });
      });

      const unownedTeams = {
        1: [],
        2: [],
        3: [],
        4: [],
      };
      // add team to unowned if its not in owned teams array
      for (const league in sportTeams) {
        Object.keys(sportTeams[league]).forEach((team) => {
          if (!ownedTeams.includes(Number(team))) {
            unownedTeams[league].push(team);
          }
        });
      }
      setUnownedTeams(unownedTeams);
    }
  };

  const fetchTrades = async (selectedRoflYear, abortController) => {
    try {
      const res = await makeRequest({
        method: 'get',
        route: `users/trades/${currentOrganization.user_id}/${currentOrganization.id}/${selectedRoflYear}`,
        abort: abortController,
      });
      const { body } = res;
      setTrades(body);
      // const bidTable = {}
      // body.forEach(bid => {
      //   if(bidTable[bid.rofl_month]){
      //       bidTable[bid.rofl_month].push(bid)
      //   } else {
      //       bidTable[bid.rofl_month] = [bid]
      //   }
      // })
      // setAllBids(bidTable);
      // setOriginalBids(JSON.stringify(bidTable))
    } catch (e) {
      console.log('problem');
      console.error(e);
    }
  };

  const fetchAllBids = async (selectedRoflYear, abortController) => {
    try {
      const res = await makeRequest({
        method: 'get',
        route: `users/bids/${currentOrganization.user_id}/${currentOrganization.id}/${selectedRoflYear}`,
        abort: abortController,
      });
      const { body } = res;
      const bidTable = {};
      body.forEach((bid) => {
        if (bidTable[bid.rofl_month]) {
          bidTable[bid.rofl_month].push(bid);
        } else {
          bidTable[bid.rofl_month] = [bid];
        }
      });
      setAllBids(bidTable);
      setOriginalBids(JSON.stringify(bidTable));
    } catch (e) {
      console.log('problem');
      console.error(e);
    }
  };

  // fetch current teams
  // returns full rosteer
  const fetchRoster = async (selectedRoflYear, abortController) => {
    try {
      const res = await makeRequest({
        method: 'get',
        route: `users/currentTeams/${currentOrganization.id}/${selectedRoflYear}`,
        abort: abortController,
      });
      const { body } = res;
      setFullRoster(body);
      const userId = selectedMember || currentOrganization.user_id;
      setCurrentRoster(body[userId]);
      return body;
      //   setRoster(JSON.parse(res.body));
    } catch (e) {
      console.log('problem');
      console.error(e);
    }
  };

  const handleChange = (userId) => {
    setCurrentRoster(fullRoster[userId]);
    setSelectedMember(userId);
  };

  const handleAction = () => {
    toast.success('Free agency coming soon I promise');
  };

  const dropTeam = async (teamId) => {
    const teamName = `${sportTeams[String(teamId)[0]][teamId].city} ${sportTeams[String(teamId)[0]][teamId].name}`;
    const approved = confirm(
      `are you sure you want to drop the ${teamName}`,
    );
    if (approved) {
      try {
        var res = await makeRequest({
          method: 'post',
          route: 'users/dropTeam',
          data: {
            userId: currentOrganization.user_id,
            teamId,
            organizationId: currentOrganization.id,
            roflYear: currentYear,
          },
        });
        if (res.body === 'success') {
          toast.success(`Successfully dropped ${teamName}`);
          await sleep(300);
          await fetchRoster(selectedYear, new AbortController());
        } else {
          toast.error(res.body);
        }
      } catch (e) {
        console.log('here is res');
        console.log(res);
        console.log('problem');
        console.error(e);
      }
    } else {
      toast.error('OK');
    }
  };

  const handleAdd = (team) => {
    console.log('hadnling add');
    const leagueId = Number(String(team)[0]);
    dispatch({
      type: 'SHOW_MODAL',
      payload: {
        modalContent: 'ADD_TEAM',
        props: {
          selectedTeam: team,
          currentUserRoster: fullRoster[currentOrganization.user_id],
          firstActiveMonthForClaim,
          currentRoflMonths: calculateCurrentRoflMonths(),
        },
      },
    });
  };

  const handleClaim = (team) => {
    console.log('hadnling claim');
    const leagueId = Number(String(team)[0]);
    dispatch({
      type: 'SHOW_MODAL',
      payload: {
        modalContent: 'SUBMIT_BID',
        props: {
          selectedTeam: team,
          currentUserRoster: fullRoster[currentOrganization.user_id],
          firstActiveMonthForClaim,
          currentRoflMonths: calculateCurrentRoflMonths(),
        },
      },
    });
  };

  const handleTrade = (team, user) => {
    dispatch({
      type: 'SHOW_MODAL',
      payload: {
        modalContent: 'PROPOSE_TRADE',
        props: {
          receiverRoster: fullRoster[selectedMember],
          selectedTeam: team,
          currentUserRoster: fullRoster[currentOrganization.user_id],
          userToTradeWith: selectedMember,
          currentRoflMonths: calculateCurrentRoflMonths(),
          firstActiveMonthForClaim,
        },
      },
    });
  };

  const calculateAndSetFirstLeague = () => {
    const first = getFirstLeagueToShow();
    setLeague(first);
    setFirstLeagueToShow(first);
  };

  const calculateAndSetIsArchived = () => {
    let archived = true;
    // if all active leagues are in playoffs then we must be in archive mode
    Object.keys(activeYears[selectedYear]).forEach((key) => {
      if (activeYears[selectedYear][key].playoffs === 0) archived = false;
    });
    setIsArchived(archived);
  };

  //   use effects
  // Load page data
  useEffect(() => {
    const abortController = new AbortController();

    async function fetchData() {
      try {
        if (!deadlines) await hydrateDeadlines(abortController, selectedYear);
        if (!orgMembers) await hydrateOrgMembers(abortController);
        if (!sportTeams) await hydrateSportTeams(abortController);
        const res = await Promise.all([
          fetchRoster(selectedYear, abortController),
          fetchAllBids(selectedYear, abortController),
          fetchTrades(selectedYear, abortController),
        ]);
        const fullRoster = res[0];
        calculateAndSetIsArchived();
        calculateAndSetFirstLeague();
        calculateAndSetUnownedTeams(fullRoster);
        setReadyToRender(true);
      } catch (e) {
        console.error(e);
        setError(e);
      }
    }
    fetchData();
    return () => abortController.abort();
  }, []);

  useEffect(() => {
    const abortController = new AbortController();

    async function refetchData() {
      await hydrateDeadlines(abortController, selectedYear);
      try {
        const res = await Promise.all([
          fetchRoster(selectedYear, abortController),
          fetchAllBids(selectedYear, abortController),
          fetchTrades(selectedYear, abortController),
        ]);
        const fullRoster = res[0];
        calculateAndSetIsArchived();
        calculateAndSetFirstLeague();
        calculateAndSetUnownedTeams(fullRoster);
        setReadyToRender(true);
      } catch (e) {
        console.error(e);
        setError(e);
      }
    }
    if (readyToRender) refetchData();
    return () => abortController.abort();
  }, [selectedYear]);

  useEffect(() => {
    if (currentRoster) {
      const table = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
      };
      Object.keys(currentRoster)
        .filter((key) => key !== 'cash')
        .forEach((team) => {
          const { leagueId } = currentRoster[team];
          table[leagueId] += 1;
        });
      setTeamCountByLeague(table);
    }
  }, [currentRoster]);

  //   update bids only when the modal has been closed
  useEffect(() => {
    if (modalHasBeenUsed && !modalContent) {
      reFetchBids();
      reFetchRoster();
      setModalHasBeenUsed(false);
    } else if (!modalHasBeenUsed && modalContent) {
      setModalHasBeenUsed(true);
    }
  }, [modalContent]);

  // useEffect(() => {
  //   if (readyToRender) {
  //     calculateAndSetFirstLeague();
  //   }
  // }, [activeYears, currentDate]);

  useEffect(() => {
    if (readyToRender) {
      const currentRoflMonths = calculateCurrentRoflMonths();
      setFirstActiveMonthForClaim(currentRoflMonths[league] + 1);
    }
  }, [league, activeYears]);

  return {
    tab,
    firstLeagueToShow,
    setTab,
    allBids,
    handleClaim,
    currentDate,
    activeYears,
    deadlines,
    handleAction,
    dropTeam,
    readyToRender,
    orgMembers,
    selectedMember,
    handleChange,
    currentRoster,
    sportTeams,
    league,
    setLeague,
    unownedTeams,
    currentOrganization,
    reFetchBids,
    setAllBids,
    originalBids,
    handleTrade,
    handleAdd,
    trades,
    reFetchTrades,
    firstActiveMonthForClaim,
    isArchived,
  };
}

export default useAddTeam;
