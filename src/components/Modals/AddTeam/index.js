import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import useApi from "../../../hooks/useApi";
import TeamSelect from "../TeamSelect";

function AddTeam() {
  const { props } = useSelector((state) => ({
    ...state.modalReducer
  }));

  const { roflYear, activeYears, leagueTable } = useSelector((state) => ({
    ...state.sportReducer
  }));

  const { currentOrganization } = useSelector((state) => ({
    ...state.authReducer
  }));

  const { makeRequest } = useApi();

  const transformToCheckable = (roster) => {
    let checkableRoster = {};
    Object.keys(roster).forEach((teamNum) => {
      const team = roster[teamNum];
      if (team.teamId) {
        checkableRoster[team.teamId] = {
          checked: props.selectedTeam === team.teamId ? true : false,
          val: team.val,
          leagueId: team.leagueId
        };
      }
    });
    return checkableRoster;
  };

  const [checkedTeams, setCheckedTeams] = useState(
    transformToCheckable(props.roster)
  );

  // this function sends a toast error if there is an error and returns
  // true if there is an error and false if there is NO error
  const checkForLeagueCountError = () => {
    let teamCountByLeague = {
      1: 0,
      2: 0,
      3: 0,
      4: 0
    };
    Object.keys(props.currentRoster)
      .filter((key) => key !== "cash")
      .forEach((team) => {
        let leagueId = props.currentRoster[team].leagueId;
        if (leagueId) teamCountByLeague[leagueId]++;
      });
    teamCountByLeague[Number(String(props.selectedTeam)[0])]++;
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

  const handleSubmit = async () => {
    const leagueCountPassed = checkForLeagueCountError();
    if (!leagueCountPassed) return;

    const res = await makeRequest({
      method: "post",
      route: `/users/addTeam`,
      data: {
        organizationId: Number(currentOrganization.id),
        userId: currentOrganization.user_id,
        teamId: Number(props.selectedTeam),
        roflYear,
        droppedTeams: Object.keys(checkedTeams)
          .filter((team) => checkedTeams[team].checked === true)
          .map((team) => Number(team)),
        roflMonth:
          activeYears[2022][Number(String(props.selectedTeam)[0])].roflMonth + 1
        // roflMonth: activeYears[roflYear][Number(String(props.selectedTeam)[0])].roflMonth
      }
    });
    if (res.statusCode === 200 && res.body === "success") {
      toast.success("Request submitted successfully");
      // sleep is necessary to refetch bids
      // await sleep(3000)
      dispatch({
        type: "CLOSE_MODAL"
      });
    } else {
      toast.error("There was an error submitting your request");
    }
  };

  const handleTeamClick = (teamId) => {
    const newCheckedTeams = { ...checkedTeams };
    newCheckedTeams[teamId].checked = !newCheckedTeams[teamId].checked;
    if (
      Object.values(newCheckedTeams).filter((val) => val === true).length > 3
    ) {
      toast.error("You can drop a maximum of 3 teams");
      return;
    } else {
      setCheckedTeams(newCheckedTeams);
    }
  };

  return (
    <TeamSelect
      mode={"addTeam"}
      submitFunction={handleSubmit}
      checkedTeams={checkedTeams}
      handleTeamClick={handleTeamClick}
    />
  );
}

export default AddTeam;
