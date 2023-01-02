import React, { useState, useEffect } from "react";
import CurrencyInput from "react-currency-input-field";
import { useSelector, useDispatch } from "react-redux";
import {ErrorContainer, BottomBar, SubmitButton, MainContent, Container, TopBar, CloseContainer, CloseButton, BottomButton, Title, TopText, SelectContainer, TeamText, TeamRow, RowContainer, BoxText, SelectBox} from './components'

function TeamSelect({
  errors,
  mode,
  setStage,
  checkedTeams,
  submitFunction,
  handleTeamClick,
  cashValue,
  handleCashValueChange,
  maxBid
}) {
  // mode can be addTeam, tradeFor, tradeAway
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

//   const [maxBid, setMaxBid] = useState(
//     checkedTeams.cash ? checkedTeams.cash : null
//   );

  const teamCount = Object.keys(props.currentRoster)
    .filter((key) => key !== "cash")
    .filter((key) => props.currentRoster[key].teamId).length;
  const roflMonth =
    activeYears[2022][Number(String(props.selectedTeam)[0])].roflMonth;
  const maxTeams =
    Object.values(playoffMonths[2022]).filter(
      (playoffMonth) => playoffMonth >= roflMonth + 1
    ).length * 2;
  const isDropRequired = teamCount >= maxTeams;

  const goBack = () => {
    setStage("tradeFor");
  };

  const selectedTeamLeague = Number(String(props.selectedTeam)[0]);
  const selectedTeamName = `${
    sportTeams[selectedTeamLeague][props.selectedTeam].city
  } ${sportTeams[selectedTeamLeague][props.selectedTeam].name}`;

  const topText = {
    submitBid: (
      <TopText>
        {isDropRequired
          ? `To submit a bid for the ${selectedTeamName} you must conditionally drop a team. Choose team(s) to drop and receive their value in Rofl cash`
          : "You do not need to drop a team for this bid but you may do so here."}{" "}
        <br />
        <br /> Teams in their last month before the playoffs have no cash value
        when dropped
      </TopText>
    ),
    addTeam: (
      <TopText>
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
    tradeAway: <TopText>Choose teams to trade away</TopText>
  };

  const submitText = {
    submitBid: "Submit",
    addTeam: "Submit",
    tradeFor: "Next",
    tradeAway: "Review Trade"
  };

  const modalTitle = {
    submitBid: "Submit Bid",
    addTeam: "Add Team",
    tradeFor: "Trade For Teams",
    tradeAway: "Trade Away Teams"
  };

  const aboveCashValue = {
    submitBid: "Bid Amount",
    addTeam: "Bid Amount",
    tradeFor: "Rofl Cash (optional)"
    // tradeAway: "Rofl Cash (optional)"
  };

  const maxCashAllowed = {
    submitBid: (
      <>
        <p>Max bid allowed</p>
        <p>${maxBid}</p>
      </>
    ),
    tradeFor: (
      <>
        <p>User cash: ${props.currentRoster.cash}</p>
      </>
    ),
    tradeAway: (
      <>
        <p>User cash: ${props?.currentUserRoster?.cash}</p>
      </>
    )
  };

  const handleSubmit = async () => {
    switch (mode) {
      case "submitBid":
        await submitFunction();
        break;
      case "addTeam":
        await submitFunction();
        break;
      case "tradeFor":
        setStage("tradeAway");
        break;
      case "tradeAway":
        setStage("reviewTrade");
        break;
      default:
        console.error("stage not found");
    }
  };

  const closeModal = () => {
    dispatch({
      type: "CLOSE_MODAL"
    });
  };

  const calculateIfDisabled = (leagueId) => {
    // disabled checkbox if they already have the max number of teams
    // from a league and want to add another one
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

    teamCountByLeague[Number(String(props.selectedTeam)[0])] == 3 &&
      Number(String(props.selectedTeam)[0]) !== leagueId;
  };

  return (
    <Container>
      <TopBar>
        <div></div>
        <Title>{modalTitle[mode]}</Title>
        <CloseContainer>
          <CloseButton onClick={closeModal}>X</CloseButton>
        </CloseContainer>
      </TopBar>
      <MainContent>
        {topText[mode]}
        <RowContainer>
          {Object.keys(checkedTeams)
            .filter((key) => key !== "cash")
            .map((teamId) => {
              const teamValue = checkedTeams[teamId].val;
              const leagueId = Number(String(teamId)[0]);
              const teamName = `${sportTeams[leagueId][teamId].city} ${sportTeams[leagueId][teamId].name}`;

              // only return team if they are droppable (active league not in playoffs)
              if (
                (activeYears[2022][leagueId] &&
                  activeYears[2022][leagueId].playoffs === 1) ||
                activeYears[2022][leagueId].roflMonth !==
                  activeYears[2022][leagueId].roflMonth
              ) {
                return null;
              } else {
                return (
                  <TeamRow>
                    <TeamText>
                      {teamName}{" "}
                      {playoffMonths[2022][leagueId] - 1 ===
                      activeYears[2022][leagueId].roflMonth
                        ? null
                        : `($${teamValue})`}
                    </TeamText>
                    <SelectContainer>
                      <SelectBox
                        id={`checkbox-${teamId}`}
                        value={`checkbox-${teamId}`}
                        name={`checkbox-${teamId}`}
                        type="checkbox"
                        checked={checkedTeams[teamId].checked}
                        onChange={() => handleTeamClick(teamId)}
                        disabled={calculateIfDisabled(leagueId)}
                      />
                      <BoxText
                        checked={checkedTeams[teamId].checked}
                        htmlFor={`checkbox-${teamId}`}
                      >
                        Select
                      </BoxText>
                    </SelectContainer>
                  </TeamRow>
                );
              }
            })}
        </RowContainer>
        {mode == "addTeam" ? null : (
          <>
            <TeamText>{maxCashAllowed[mode]}</TeamText>
            <TeamRow>
              <TeamText>{aboveCashValue[mode]}</TeamText>
              <SelectContainer>
                <CurrencyInput
                  prefix={"$"}
                  placeholder="Cash"
                  value={cashValue}
                  onValueChange={(value) => handleCashValueChange(value)}
                  allowDecimals={false}
                  allowNegativeValue={false}
                  style={{
                    width: "75px",
                    padding: "12px 12px",
                    margin: "4px 0",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    boxSizing: "border-box"
                  }}
                />
              </SelectContainer>
            </TeamRow>
          </>
        )}
        <ErrorContainer>
          {errors?.bid ? <p>{errors.bid}</p> : null}
        </ErrorContainer>
      </MainContent>
      <BottomBar>
        {mode === "tradeAway" ? (
          <BottomButton position={"left"} onClick={goBack}>
            Go Back
          </BottomButton>
        ) : null}
        <div></div>
        <BottomButton disabled={errors?.bid} onClick={() => handleSubmit()}>
          {submitText[mode]}
        </BottomButton>
      </BottomBar>
    </Container>
  );
}

export default TeamSelect;
