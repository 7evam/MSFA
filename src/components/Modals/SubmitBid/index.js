import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import CurrencyInput from "react-currency-input-field";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import useApi from "../../../hooks/useApi";
import { useDispatch } from "react-redux";
import TeamSelect from "../TeamSelect";
// import useApi from '../../hooks/useApi'

function SubmitBid() {
  const dispatch = useDispatch();

  const { props } = useSelector((state) => ({
    ...state.modalReducer
  }));

  const { currentOrganization } = useSelector((state) => ({
    ...state.authReducer
  }));

  const {
    sportTeams,
    roflYear,
    activeYears,
    playoffMonths,
    leagueTable
  } = useSelector((state) => ({
    ...state.sportReducer
  }));

  const { makeRequest, isLoading } = useApi();

  const transformToCheckable = (roster) => {
      
    let checkableRoster = {};
    checkableRoster.cash = roster.cash;
    Object.keys(roster).forEach((teamNum) => {
      const team = roster[teamNum];
      // don't show a team if it wont be active next month
      if (team.teamId && props.currentRoflMonths[team.leagueId] +1 >= props.firstActiveMonthForClaim) {
        checkableRoster[team.teamId] = {
          checked: props.selectedTeam === team.teamId ? true : false,
          val: team.val,
          leagueId: team.leagueId
        };
      }
    });
    return checkableRoster;
  };

  const calculateInitialTeamCount = () => {
    let teamCountByLeague = {
        1: 0,
        2: 0,
        3: 0,
        4: 0
      };
      Object.keys(props.currentUserRoster)
        .filter((key) => key !== "cash")
        .forEach((team) => {
          let leagueId = props.currentUserRoster[team].leagueId;
          if (leagueId) teamCountByLeague[leagueId]++;
        });
        return teamCountByLeague
  }
  

  const [bidValue, setBidValue] = useState(null);
  const [maxBid, setMaxBid] = useState(props.currentUserRoster.cash);
  const [checkedTeams, setCheckedTeams] = useState(
    transformToCheckable(props.currentUserRoster)
  );
  const [errorMessage, setErrorMessage] = useState(null);
  const initialTeamCountByLeague = useMemo(() => { return calculateInitialTeamCount()}, [])

  // this function sets errors in state and returns
  // true if there is an error and false if there is NO error
  const checkForBidError = (bid, maxBid) => {
    let newError
    if (bid > maxBid) {
      newError = "Your bid is too high";
    }
    setErrorMessage(newError);
    if (bid > maxBid) {
      return true;
    } else {
      return false;
    }
  };

  const handleBidChange = (value) => {
    checkForBidError(value, maxBid);
    setBidValue(value);
  };

  const handleTeamClick = (teamId) => {
    const team = checkedTeams[teamId];
    const newCheckedTeams = { ...checkedTeams };
    newCheckedTeams[teamId].checked = !newCheckedTeams[teamId].checked;
    if (
      Object.values(newCheckedTeams).filter((val) => val === true).length > 3
    ) {
      toast.error("You can conditionally drop a maximum of 3 teams");
      return;
    } else {
      let newMaxBid = maxBid;
      const leagueId = Number(String(team)[0]);
      // if team is league with active playoff month it cannot be dropped for cash
      if (
        playoffMonths[2022][team.leagueId] - 1 !==
        activeYears[2022][team.leagueId].roflMonth
      ) {
        newCheckedTeams[teamId].checked === true
          ? (newMaxBid += team.val)
          : (newMaxBid -= team.val);
        setMaxBid(newMaxBid);
      }
      setCheckedTeams(newCheckedTeams);
      checkForBidError(bidValue, newMaxBid);
    }
  };

  const handleSubmit = async () => {
    const leagueCountPassed = checkForLeagueCountError();
    if (!leagueCountPassed) return;

    const bidValueHasError = checkForBidError();
    if (bidValueHasError) {
      toast.error(`Your bid value is too high, maximum bid value is ${maxBid}`);
      return;
    }

    if (bidValue <= 0) {
      toast.error("Bid Value must be at least $1");
      return;
    }

    const res = await makeRequest({
      method: "post",
      route: `/users/bids`,
      data: {
        organizationId: currentOrganization.id,
        userId: currentOrganization.user_id,
        teamId: props.selectedTeam,
        roflYear,
        bidValue,
        droppedTeams: Object.keys(checkedTeams)
          .filter((team) => checkedTeams[team].checked === true)
          .map((team) => Number(team)),
        roflMonth:
          activeYears[2022][Number(String(props.selectedTeam)[0])].roflMonth + 1
        // roflMonth: activeYears[roflYear][Number(String(props.selectedTeam)[0])].roflMonth
      }
    });
    if (res.statusCode === 201) {
      toast.success("Request submitted successfully");
      dispatch({
        type: "CLOSE_MODAL"
      });
    } else {
      toast.error("There was an error submitting your request");
    }
  };

  // this function sends a toast error if there is an error and returns
  // true if there is an error and false if there is NO error
  const checkForLeagueCountError = () => {
    
    initialTeamCountByLeague[Number(String(props.selectedTeam)[0])]++;
    Object.keys(checkedTeams).forEach((team) => {
      if (checkedTeams[team].checked) {
        teamCountByLeague[Number(String(team)[0])]--;
      }
    });
    for (let league in teamCountByLeague) {
      if (
        teamCountByLeague[league] < 1 &&
        Object.keys(activeYears[2022]).includes(league)
      ) {
        toast.error(
          `This bid would result in you having not enough ${leagueTable[league]} teams, you need at least 1`
        );
        return false;
      } else if (teamCountByLeague[league] > 3) {
        toast.error(
          `This bid would result in you having too many ${leagueTable[league]} teams, you may have a maximum of 3`
        );
        return false;
      }
    }
    return true;
  };

  return (
    <TeamSelect
      mode="submitBid"
      submitFunction={handleSubmit}
      handleCashValueChange={handleBidChange}
      errorMessage={errorMessage}
      cashValue={bidValue}
      handleTeamClick={handleTeamClick}
      checkedTeams={checkedTeams}
      maxBid={maxBid}
      initialTeamCountByLeague={initialTeamCountByLeague}
    />
  );
}

export default SubmitBid;
