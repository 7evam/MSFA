import React, { useState, useEffect, useMemo } from 'react';
import CurrencyInput from 'react-currency-input-field';
import { useSelector, useDispatch } from 'react-redux';
import {
  ErrorContainer, BottomBar, SubmitButton, MainContent, Container, TopBar, CloseContainer, CloseButton, BottomButton, Title, TopText, SelectContainer, TeamText, TeamRow, RowContainer, BoxText, SelectBox,
} from './components';

function useTeamSelect({
  errorMessage,
  mode,
  setStage,
  checkedTeams,
  submitFunction,
  handleTeamClick,
  cashValue,
  handleCashValueChange,
  maxBid,
  initialTeamCountByLeague,
}) {
  // mode can be addTeam, tradeFor, tradeAway
  const dispatch = useDispatch();

  const { props } = useSelector((state) => ({
    ...state.modalReducer,
  }));

  const { currentOrganization } = useSelector((state) => ({
    ...state.authReducer,
  }));

  const {
    sportTeams,
    activeYears,
    playoffMonths,
    leagueTable,
    orgMembers,
    selectedYear,
  } = useSelector((state) => ({
    ...state.sportReducer,
  }));

  //   const [maxBid, setMaxBid] = useState(
  //     checkedTeams.cash ? checkedTeams.cash : null
  //   );

  const calculateIsDropRequired = () => {
    // not necessary to calculate this for trades
    if (mode.includes('trade')) return;
    // get the number of active teams next month by
    // adding together the number of active teams for each league
    let activeTeamsNextMonth = 0;
    Object.keys(initialTeamCountByLeague).forEach((league) => {
      if (props.firstActiveMonthForClaim <= playoffMonths[selectedYear][league]) {
        activeTeamsNextMonth += initialTeamCountByLeague[league];
      }
    });

    //   max teams is number of active slots for next month * 2
    const maxTeams = (Object.values(props.currentRoflMonths).filter(
      (currentRoflMonth) => currentRoflMonth + 1 >= props.firstActiveMonthForClaim,
    ).length) * 2;

    //  a drop is requirred if the number of active teams on users roster next month
    //  is greater than or the same as the max teams they can have
    const isDropRequired = activeTeamsNextMonth >= maxTeams;

    return isDropRequired;
  };

  const isDropRequired = useMemo(() => calculateIsDropRequired(), []);

  const goBack = () => {
    setStage('tradeFor');
  };

  const selectedTeamLeague = Number(String(props.selectedTeam)[0]);
  const selectedTeamName = `${sportTeams[selectedTeamLeague][props.selectedTeam].city
    } ${sportTeams[selectedTeamLeague][props.selectedTeam].name}`;

  const topText = {
    submitBid: (
      <TopText>
        If successful, this bid will be available for you starting MSFA month
        {' '}
        {props.firstActiveMonthForClaim}
        <br />
        <br />
        {isDropRequired
          ? `To submit a bid for the ${selectedTeamName} you must conditionally drop a team. Choose team(s) to drop and receive their value in MSFA cash`
          : 'You do not need to drop a team for this bid but you may do so here.'}
        {' '}
        <br />
        <br />
        {' '}
        Teams in their last month before the playoffs have no cash value
        when dropped
      </TopText>
    ),
    addTeam: (
      <TopText>
        This claim will be available for you starting MSFA month
        {' '}
        {props.firstActiveMonthForClaim}
        <br />
        <br />
        {isDropRequired
          ? `In order to add the ${selectedTeamName} you need an empty slot. Select which team you would like to drop to add the ${selectedTeamName}. 
                You will receive the cash value for the team you drop and add the ${selectedTeamName} for $1`
          : `You do not need to drop a team to add the ${selectedTeamName} but you may do so here. By submitting this add request you will automatically add the ${selectedTeamName} for $1`}
        <br />
        <br />
        <b>Choose team(s) to drop</b>
        <br />
        <br />
        Teams in their last month before the playoffs have no cash value when
        dropped
      </TopText>
    ),
    tradeFor: <TopText>Choose teams to trade for</TopText>,
    tradeAway: <TopText>Choose teams to trade away</TopText>,
  };

  const submitText = {
    submitBid: 'Submit',
    addTeam: 'Submit',
    tradeFor: 'Next',
    tradeAway: 'Review Trade',
  };

  const modalTitle = {
    submitBid: 'Submit Bid',
    addTeam: 'Add Team',
    tradeFor: 'Trade For Teams',
    tradeAway: 'Trade Away Teams',
  };

  const aboveCashValue = {
    submitBid: 'Bid Amount',
    addTeam: 'Bid Amount',
    tradeFor: 'MSFA Cash (optional)',
    tradeAway: 'MSFA Cash (optional)',
  };

  const maxCashAllowed = {
    submitBid: (
      <>
        <p>Max bid allowed</p>
        <p>
          $
          {maxBid}
        </p>
      </>
    ),
    tradeFor: (
      <p>
        {orgMembers[props?.userToTradeWith]?.name}
        's cash: $
        {props.receiverRoster?.cash}
      </p>
    ),
    tradeAway: (
      <p>
        Your cash: $
        {props?.currentUserRoster?.cash}
      </p>
    ),
  };

  const handleSubmit = async () => {
    switch (mode) {
      case 'submitBid':
        await submitFunction();
        break;
      case 'addTeam':
        await submitFunction();
        break;
      case 'tradeFor':
        setStage('tradeAway');
        break;
      case 'tradeAway':
        setStage('reviewTrade');
        break;
      default:
        console.error('stage not found');
    }
  };

  const closeModal = () => {
    dispatch({
      type: 'CLOSE_MODAL',
    });
  };

  const calculateIfDisabled = (leagueId) => {
    // disabled checkbox if they already have the max number of teams
    // from a league and want to add another one
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

    teamCountByLeague[Number(String(props.selectedTeam)[0])] == 3
      && Number(String(props.selectedTeam)[0]) !== leagueId;
  };

  return {
    modalTitle,
    mode,
    closeModal,
    topText,
    checkedTeams,
    activeYears,
    playoffMonths,
    maxCashAllowed,
    aboveCashValue,
    handleCashValueChange,
    submitText,
    errorMessage,
    handleSubmit,
    handleTeamClick,
    goBack,
    sportTeams,
    calculateIfDisabled,
  };
}

export default useTeamSelect;
