import React, { useState, useEffect, useMemo } from 'react';
import CurrencyInput from 'react-currency-input-field';
import { useSelector, useDispatch } from 'react-redux';
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
  currencyInputStyle,
} from './components';
import useTeamSelect from './useTeamSelect';

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
  initialTeamCountByLeague,
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
    calculateIfDisabled,
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
    initialTeamCountByLeague,
  });

  const {
    selectedYear,
  } = useSelector((state) => ({
    ...state.sportReducer,
  }));

  return (
    <Container>
      <TopBar>
        <div />
        <Title>{modalTitle[mode]}</Title>
        <CloseContainer>
          <CloseButton onClick={closeModal}>X</CloseButton>
        </CloseContainer>
      </TopBar>
      <MainContent>
        {topText[mode]}
        <RowContainer>
          {Object.keys(checkedTeams)
            .filter((key) => key !== 'cash')
            .map((teamId) => {
              const teamValue = checkedTeams[teamId].val;
              const leagueId = Number(String(teamId)[0]);
              const teamName = `${sportTeams[leagueId][teamId].city} ${sportTeams[leagueId][teamId].name}`;

              // only return team if they are droppable (active league not in playoffs)
              if (
                (activeYears[selectedYear][leagueId]
                  && activeYears[selectedYear][leagueId].playoffs === 1)
                // || activeYears[selectedYear][leagueId].roflMonth
                //   !== activeYears[selectedYear][leagueId].roflMonth
              ) {
                return null;
              }
              return (
                <TeamRow>
                  <TeamText>
                    {teamName}
                    {' '}
                    {playoffMonths[selectedYear][leagueId]
                      === activeYears[selectedYear][leagueId]?.roflMonth
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
            })}
        </RowContainer>
        {mode === 'addTeam' ? null : (
          <>
            <TeamText>{maxCashAllowed[mode]}</TeamText>
            <TeamRow>
              <TeamText>{aboveCashValue[mode]}</TeamText>
              <SelectContainer>
                <CurrencyInput
                  prefix="$"
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
        {mode === 'tradeAway' ? (
          <BottomButton position="left" onClick={goBack}>
            Go Back
          </BottomButton>
        ) : null}
        <div />
        <BottomButton disabled={errorMessage} onClick={() => handleSubmit()}>
          {submitText[mode]}
        </BottomButton>
      </BottomBar>
    </Container>
  );
}

export default TeamSelect;
