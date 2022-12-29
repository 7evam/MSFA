import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import "@fontsource/open-sans";
import useApi from "../../hooks/useApi";
import RosterComponent from "../../components/Roster";
import Loading from "../../components/Loading";
import useHydration from "../../hooks/useHydration";
import { Container, League, LeagueSelector } from "./components";
import { toast } from "react-toastify";

function useAddTeam() {
  const dispatch = useDispatch();

  const { currentOrganization } = useSelector((state) => ({
    ...state.authReducer
  }));

  const {modalContent} = useSelector((state) => ({
    ...state.modalReducer
  }))

  const { makeRequest, isLoading } = useApi();
  const {
    isHydrating,
    hydrateSportTeams,
    hydrateOrgMembers,
    hydrateDeadlines
  } = useHydration();

  const {
    activeYears,
    currentDate,
    sportTeams,
    orgMembers,
    deadlines
  } = useSelector((state) => ({
    ...state.sportReducer
  }));

  const getFirstLeagueToShow = () => {
    // this function calculates the first league to show for free agency
    // IE removes leagues that are inactive or are in their final (playoff) month
    let activeYear = activeYears[2022];
    let result = 1;
    if (!activeYear[1] || activeYear[1].playoffs === 1) {
      result++;
    }
    if (!activeYear[2] || activeYear[2].playoffs === 1) {
      result++;
    }
    return result;
  };

  const [currentRoster, setCurrentRoster] = useState(null);
  const [fullRoster, setFullRoster] = useState(null);
  const [selectedMember, setSelectedMember] = useState(
    currentOrganization.user_id
  );
  const [unownedTeams, setUnownedTeams] = useState(null);
  // TODO this should be first available league not 1
  const [league, setLeague] = useState(null);
  const [firstLeagueToShow, setFirstLeagueToShow] = useState(null);
  const [readyToRender, setReadyToRender] = useState(false);
  const [currentYear, setCurrentYear] = useState(2022);
  const [allBids, setAllBids] = useState(null);
  const [tab, setTab] = useState("trades");
  const [modalHasBeenUsed, setModalHasBeenUsed] = useState(false)
  const [teamCountByLeague, setTeamCountByLeague] = useState(null);
  const [originalBids, setOriginalBids] = useState(null)
  const [trades, setTrades] = useState(null)

  // Load page data
  useEffect(() => {
    const abortController = new AbortController();
    fetchRoster(2022, abortController);
    fetchAllBids(2022, abortController);
    fetchTrades(2022, abortController)
    if (!deadlines) {
      hydrateDeadlines(abortController, 2022);
    }
    if (!orgMembers) {
      hydrateOrgMembers(abortController);
    }
    if (!sportTeams) {
      hydrateSportTeams(abortController);
    } else {
      calculateAndSetUnownedTeams();
    }

    return () => abortController.abort();
  }, []);

  const reFetchBids = async () => {
    const abortController = new AbortController();
    fetchAllBids(2022, abortController)
    return () => abortController.abort();
  }

  const reFetchTrades = async () => {
    const abortController = new AbortController();
    fetchTrades(2022, abortController)
    return () => abortController.abort();
  }

  const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  useEffect(() => {
    if (
      currentRoster &&
      league &&
      orgMembers &&
      sportTeams &&
      deadlines &&
      unownedTeams &&
      allBids &&
      trades
    ) {
      setReadyToRender(true);
    }
  }, [
    currentRoster,
    orgMembers,
    sportTeams,
    deadlines,
    unownedTeams,
    allBids,
    league,
    trades
  ]);

  useEffect(() => {
    if (currentRoster) {
      const table = {
        1: 0,
        2: 0,
        3: 0,
        4: 0
      };
      Object.keys(currentRoster)
        .filter((key) => key !== "cash")
        .forEach((team) => {
          let leagueId = currentRoster[team].leagueId;
          table[leagueId]++;
        });
      setTeamCountByLeague(table);
    }
  }, [currentRoster]);

  useEffect(() => {
    calculateAndSetUnownedTeams();
  }, [sportTeams, fullRoster]);

//   update bids only when the modal has been closed
  useEffect(() => {
    console.log('modal content has changed')
    if(modalHasBeenUsed && !modalContent){
      console.log('refetching content')
        reFetchBids()
        setModalHasBeenUsed(false)
    } else if(!modalHasBeenUsed && modalContent){
        setModalHasBeenUsed(true)
    }
  }, [modalContent]);

  useEffect(() => {
    if (activeYears && currentDate) {
      let first = getFirstLeagueToShow();
      setLeague(first);
      setFirstLeagueToShow(first);
    }
  }, [activeYears, currentDate]);

  const calculateAndSetUnownedTeams = () => {
    if (fullRoster && sportTeams && Object.keys(sportTeams).length) {
      console.log('here is full roster')
      console.log(fullRoster)
      // get owned teams
      let ownedTeams = [];
      Object.keys(fullRoster).forEach((member) => {
        Object.keys(fullRoster[member]).forEach((slot) => {
          let teamId = fullRoster[member][slot].teamId
          if(teamId) ownedTeams.push(teamId)
          // ownedTeams.push(fullRoster[member][slot].teamId);
        });
      });

      console.log('here is owned teams')
      console.log(ownedTeams)

      let unownedTeams = {
        1: [],
        2: [],
        3: [],
        4: []
      };
      // add team to unowned if its not in owned teams array
      for (let league in sportTeams) {
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
      var res = await makeRequest({
        method: "get",
        route: `users/trades/${currentOrganization.user_id}/${currentOrganization.id}/${selectedRoflYear}`,
        abort: abortController
      });
      const body = res.body;
      console.log('here is trades')
      console.log(body)
      setTrades(body)
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
      console.log("problem");
      console.error(e);
    }
  };

  const fetchAllBids = async (selectedRoflYear, abortController) => {
    try {
      var res = await makeRequest({
        method: "get",
        route: `users/bids/${currentOrganization.user_id}/${currentOrganization.id}/${selectedRoflYear}`,
        abort: abortController
      });
      const body = res.body;
      const bidTable = {}
      body.forEach(bid => {
        if(bidTable[bid.rofl_month]){
            bidTable[bid.rofl_month].push(bid)
        } else {
            bidTable[bid.rofl_month] = [bid]
        }
      })
      setAllBids(bidTable);
      setOriginalBids(JSON.stringify(bidTable))
    } catch (e) {
      console.log("problem");
      console.error(e);
    }
  };

  // fetch current teams
  const fetchRoster = async (selectedRoflYear, abortController) => {
    try {
      var res = await makeRequest({
        method: "get",
        route: `users/currentTeams/${currentOrganization.id}/${selectedRoflYear}`,
        abort: abortController
      });
      const body = res.body;
      setFullRoster(body);
      setCurrentRoster(body[currentOrganization.user_id]);
      //   setRoster(JSON.parse(res.body));
    } catch (e) {
      console.log("problem");
      console.error(e);
    }
  };

  const handleChange = (userId) => {
    setCurrentRoster(fullRoster[userId]);
    setSelectedMember(userId);
  };

  const handleAction = () => {
    toast.success("Free agency coming soon I promise");
  };

  const dropTeam = async (teamId) => {
    const teamName = `${sportTeams[String(teamId)[0]][teamId].city} ${sportTeams[String(teamId)[0]][teamId].name}`
    const approved = confirm(
      `are you sure you want to drop the ${teamName}`
    );
    if (approved) {
      try {
        var res = await makeRequest({
          method: "post",
          route: `users/dropTeam`,
          data: {
            userId: currentOrganization.user_id,
            teamId,
            organizationId: currentOrganization.id,
            roflYear: currentYear
          }
        });
        console.log('here is res')
        console.log(res)
        if (res.body === "success") {
          toast.success(`Successfully dropped ${teamName}`)
          await sleep(300)
          await fetchRoster(2022, new AbortController())
        } else {
          toast.error(res.body);
        }
      } catch (e) {
        console.log('here is res')
        console.log(res)
        console.log("problem");
        console.error(e);
      }
    } else {
      toast.error("OK");
    }
  };

  const handleAdd = (team) => {
    const leagueId = Number(String(team)[0]);
    console.log("here is team")
    console.log(team)
      dispatch({
        type: "SHOW_MODAL",
        payload: {
          modalContent: "ADD_TEAM",
          props: {
            roster: currentRoster,
            selectedTeam: team,
            currentRoster
          }
        }
      });
  }

  const handleClaim = (team) => {
    const leagueId = Number(String(team)[0]);
    console.log("here is team")
    console.log(team)
      dispatch({
        type: "SHOW_MODAL",
        payload: {
          modalContent: "SUBMIT_BID",
          props: {
            roster: currentRoster,
            selectedTeam: team,
            currentRoster
          }
        }
      });
  };

  // console.log('here is initla checked teams')
  // console.log(initialCheckedTeams)

  // let initialCheckedTeams = {}
  //   Object.keys(props.roster).forEach(team => {
  //       if(props.roster[team].teamId){
  //           initialCheckedTeams[props.roster[team].teamId] = false
  //       }
  //   })

  const handleTrade = (team, user) => {
    dispatch({
      type: "SHOW_MODAL",
      payload: {
        modalContent: "PROPOSE_TRADE",
        props: {
          currentRoster,
          selectedTeam: team,
          currentUserRoster: fullRoster[currentOrganization.user_id],
          userToTradeWith: selectedMember
        }
      }
    });
  }

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
    reFetchTrades
  };
}

export default useAddTeam;
