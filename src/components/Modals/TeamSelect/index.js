import React, { useState, useEffect, useMemo } from "react";
import CurrencyInput from "react-currency-input-field";
import { useSelector, useDispatch } from "react-redux";
import {
  ErrorContainer,
  BottomBar,
  SubmitButton,
  MainContent,
  Container,
  TopBar,
  CloseContainer,
  CloseButton,
  BottomButton,
  Title,
  TopText,
  SelectContainer,
  TeamText,
  TeamRow,
  RowContainer,
  BoxText,
  SelectBox,
  currencyInputStyle
} from "./components";
import useTeamSelect from "./useTeamSelect";

/*
This function provides a template for selecting teams for a trade or to drop.

logic thats common for trades and drops is in the useTeamSelect hook

logic thats unique for trades or drops is
 in its respective modal component, which rendered this template

*/

function TeamSelect({
  errorMessage,
  mode,
  setStage,
  checkedTeams,
  submitFunction,
  handleTeamClick,
  cashValue,
  handleCashValueChange,
  maxBid,
  initialTeamCountByLeague
}) {
  const {
    modalTitle,
    closeModal,
    topText,
    activeYears,
    playoffMonths,
    maxCashAllowed,
    aboveCashValue,
    submitText,
    handleSubmit,
    goBack,
    sportTeams,
    calculateIfDisabled
  } = useTeamSelect({
    errorMessage,
    mode,
    setStage,
    checkedTeams,
    submitFunction,
    handleTeamClick,
    cashValue,
    handleCashValueChange,
    maxBid,
    initialTeamCountByLeague
  });

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
                  style={currencyInputStyle}
                />
              </SelectContainer>
            </TeamRow>
          </>
        )}
        <ErrorContainer>
          {errorMessage ? <p>{errorMessage}</p> : null}
        </ErrorContainer>
      </MainContent>
      <BottomBar>
        {mode === "tradeAway" ? (
          <BottomButton position={"left"} onClick={goBack}>
            Go Back
          </BottomButton>
        ) : null}
        <div></div>
        <BottomButton disabled={errorMessage} onClick={() => handleSubmit()}>
          {submitText[mode]}
        </BottomButton>
      </BottomBar>
    </Container>
  );
}

export default TeamSelect;