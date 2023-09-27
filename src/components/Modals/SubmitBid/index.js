import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import CurrencyInput from 'react-currency-input-field';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import useApi from '../../../hooks/useApi';
import TeamSelect from '../TeamSelect';
// import useApi from '../../hooks/useApi'

function SubmitBid() {
  const dispatch = useDispatch();

  const { props } = useSelector((state) => ({
    ...state.modalReducer,
  }));

  const { currentOrganization } = useSelector((state) => ({
    ...state.authReducer,
  }));

  const {
    currentDate,
  } = useSelector((state) => ({
    ...state.sportReducer,
  }));

  const {
    sportTeams,
    roflYear,
    activeYears,
    playoffMonths,
    leagueTable,
    selectedYear,
  } = useSelector((state) => ({
    ...state.sportReducer,
  }));

  const { makeRequest, isLoading } = useApi();

  const transformToCheckable = (roster) => {
    const checkableRoster = {};
    checkableRoster.cash = roster.cash;
    Object.keys(roster).forEach((teamNum) => {
      const team = roster[teamNum];
      // don't show a team if it wont be active next month
      if (team.teamId && props.currentRoflMonths[team.leagueId] + 1 >= props.firstActiveMonthForClaim) {
        checkableRoster[team.teamId] = {
          checked: props.selectedTeam === team.teamId,
          val: team.val,
          leagueId: team.leagueId,
        };
      }
    });
    return checkableRoster;
  };

  const calculateInitialTeamCount = () => {
    const teamCountByLeague = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
    };
    Object.keys(props.currentUserRoster)
      .filter((key) => key !== 'cash')
      .forEach((team) => {
        const { leagueId } = props.currentUserRoster[team];
        if (leagueId) teamCountByLeague[leagueId]++;
      });
    return teamCountByLeague;
  };

  const [bidValue, setBidValue] = useState(null);
  const [maxBid, setMaxBid] = useState(props.currentUserRoster.cash);
  const [checkedTeams, setCheckedTeams] = useState(
    transformToCheckable(props.currentUserRoster),
  );
  const [errorMessage, setErrorMessage] = useState(null);
  const [regSeasonErrorAlreadyShown, setRegSeasonErrorAlreadyShown] = useState(false)
  const initialTeamCountByLeague = useMemo(() => calculateInitialTeamCount(), []);

  // this function sets errors in state and returns
  // true if there is an error and false if there is NO error
  const checkForBidError = (bid, maxBid) => {
    let newError;
    if (bid > maxBid) {
      newError = 'Your bid is too high';
    }
    setErrorMessage(newError);
    if (bid > maxBid) {
      return true;
    }
    return false;
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
      Object.values(newCheckedTeams).filter((team) => team.checked === true).length > 3
    ) {
      // must explicitly set team as unchecked or else it shows up as checked again
      newCheckedTeams[teamId].checked = !newCheckedTeams[teamId].checked;
      setCheckedTeams(newCheckedTeams);
      toast.error('You can conditionally drop a maximum of 3 teams');
    } else {
      let newMaxBid = maxBid;
      const leagueId = Number(String(team)[0]);
      // if team is league with active playoff month it cannot be dropped for cash

      // if (team.teamId && props.currentRoflMonths[team.leagueId] + 1 >= props.firstActiveMonthForClaim) {
      if (
        playoffMonths[selectedYear][team.leagueId] -1
        > props.currentRoflMonths[team.leagueId]
      ) {
        newCheckedTeams[teamId].checked === true
          ? (newMaxBid += team.val)
          : (newMaxBid -= team.val);
        setMaxBid(newMaxBid);
      } else {
        if(!regSeasonErrorAlreadyShown){
          setRegSeasonErrorAlreadyShown(true)
          toast.error('You can only drop a team for cash if their next month is the regular season');
        }
      }
      setCheckedTeams(newCheckedTeams);
      checkForBidError(bidValue, newMaxBid);
    }
  };

  // {playoffMonths[selectedYear][leagueId] - 1
  //   === activeYears[selectedYear][leagueId]?.roflMonth
  //   ? null
  //   : `($${teamValue})`}

  const handleSubmit = async () => {
    const leagueId = Number(String(props.selectedTeam)[0]);
    const leagueCountPassed = checkForLeagueCountError();
    if (!leagueCountPassed) return;

    const bidValueHasError = checkForBidError();
    if (bidValueHasError) {
      toast.error(`Your bid value is too high, maximum bid value is ${maxBid}`);
      return;
    }

    if (bidValue <= 0) {
      toast.error('Bid Value must be at least $1');
      return;
    }

    const roflMonth = activeYears[selectedYear][leagueId]?.roflMonth ? activeYears[selectedYear][leagueId].roflMonth : currentDate.realMonth - 3;

    const res = await makeRequest({
      method: 'post',
      route: '/users/bids',
      data: {
        organizationId: currentOrganization.id,
        userId: currentOrganization.user_id,
        teamId: props.selectedTeam,
        roflYear: selectedYear,
        bidValue,
        droppedTeams: Object.keys(checkedTeams)
          .filter((team) => checkedTeams[team].checked === true)
          .map((team) => Number(team)),
        roflMonth: roflMonth + 1,
        // roflMonth: activeYears[roflYear][Number(String(props.selectedTeam)[0])].roflMonth
      },
    });
    if (res.statusCode === 201) {
      toast.success('Request submitted successfully');
      dispatch({
        type: 'CLOSE_MODAL',
      });
    } else {
      toast.error('There was an error submitting your request');
    }
  };

  // this function sends a toast error if there is an error and returns
  // true if there is an error and false if there is NO error
  const checkForLeagueCountError = () => {
    const teamCountByLeague = { ...initialTeamCountByLeague };
    teamCountByLeague[Number(String(props.selectedTeam)[0])]++;
    Object.keys(checkedTeams).forEach((team) => {
      if (checkedTeams[team].checked) {
        teamCountByLeague[Number(String(team)[0])]--;
      }
    });
    Object.keys(teamCountByLeague).forEach((league) => {
      if (
        teamCountByLeague[league] < 1
        && Object.keys(activeYears[selectedYear]).includes(league)
      ) {
        toast.error(
          `This bid would result in you having not enough ${leagueTable[league]} teams, you need at least 1`,
        );
        return false;
      } if (teamCountByLeague[league] > 3) {
        toast.error(
          `This bid would result in you having too many ${leagueTable[league]} teams, you may have a maximum of 3`,
        );
        return false;
      }
    });
    // for (const league in teamCountByLeague) {

    // }
    return true;
  };
  // const checkForLeagueCountError = () => {

  //   initialTeamCountByLeague[Number(String(props.selectedTeam)[0])]++;
  //   Object.keys(checkedTeams).forEach((team) => {
  //     if (checkedTeams[team].checked) {
  //       teamCountByLeague[Number(String(team)[0])]--;
  //     }
  //   });
  //   for (let league in teamCountByLeague) {
  //     if (
  //       teamCountByLeague[league] < 1 &&
  //       Object.keys(activeYears[2022]).includes(league)
  //     ) {
  //       toast.error(
  //         `This bid would result in you having not enough ${leagueTable[league]} teams, you need at least 1`
  //       );
  //       return false;
  //     } else if (teamCountByLeague[league] > 3) {
  //       toast.error(
  //         `This bid would result in you having too many ${leagueTable[league]} teams, you may have a maximum of 3`
  //       );
  //       return false;
  //     }
  //   }
  //   return true;
  // };

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
