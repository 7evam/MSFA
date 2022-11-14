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
  const [tab, setTab] = useState("rosters");
  const [modalHasBeenUsed, setModalHasBeenUsed] = useState(false)
  const [teamCountByLeague, setTeamCountByLeague] = useState(null);
  const [originalBids, setOriginalBids] = useState(null)

  // Load page data
  useEffect(() => {
    const abortController = new AbortController();
    fetchRoster(2022, abortController);
    fetchAllBids(2022, abortController);
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

  useEffect(() => {
    if (
      currentRoster &&
      league &&
      orgMembers &&
      sportTeams &&
      deadlines &&
      unownedTeams &&
      allBids
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
    league
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
    if(modalHasBeenUsed && !modalContent){
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
      // get owned teams
      let ownedTeams = [];
      Object.keys(fullRoster).forEach((member) => {
        Object.keys(fullRoster[member]).forEach((slot) => {
          ownedTeams.push(fullRoster[member][slot].teamId);
        });
      });

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
    const approved = confirm(
      `are you sure you want to drop the ${
        sportTeams[String(teamId)[0]][teamId].city
      } ${sportTeams[String(teamId)[0]][teamId].name}`
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
        if (res === "success") {
        } else {
          toast.error("There was an issue dropping your team");
        }
      } catch (e) {
        console.log("problem");
        console.error(e);
      }
    } else {
      toast.error("OK");
    }
  };

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

  const handleTrade = () => {
    toast('Trade proposals coming soon!')
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
    handleTrade
  };
}

export default useAddTeam;
