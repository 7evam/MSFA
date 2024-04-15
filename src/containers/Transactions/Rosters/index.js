import React, { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import '@fontsource/open-sans';
import {
  Section, Select, Label, Headline, Container, League, LeagueSelector, slotData, SlotRow, Th, TitleRow, Td, Table, CashContainer,
} from '../components';
import { ScoringContainer, ActionButton, Cell, HeaderLabel } from './components';

function CurrentRosters({
  selectedMember, handleChange, handleTrade, currentRoster, dropTeam, isArchived,
}) {
  const { sportTeams, orgMembers } = useSelector((state) => ({
    ...state.sportReducer,
  }));

  const { currentOrganization } = useSelector((state) => ({
    ...state.authReducer,
  }));

  const getMemberActionButton = (teamId) => {
    if (Number(selectedMember) === Number(currentOrganization.user_id)) {
      return <ActionButton onClick={() => dropTeam(teamId)}>Drop</ActionButton>;
      // return <ActionButton onClick={() => dropTeam(teamId)}>{"Drop"}</ActionButton>
    }
    return <ActionButton onClick={() => handleTrade(teamId, selectedMember)}>Trade</ActionButton>;
  };

  return (
    <Container>
      <Label>Choose a member</Label>
      <Select value={selectedMember} onChange={(e) => handleChange(e.target.value)} name="currentTeams">
        {
          Object.keys(orgMembers).map((memberId) => (
            <option key={memberId} value={memberId}>{orgMembers[memberId].team_name}</option>
          ))
        }
      </Select>
      <CashContainer>
        <p>
          MSFA cash: $
          {currentRoster.cash}
        </p>
      </CashContainer>
      <ScoringContainer isArchived={isArchived}>
        <HeaderLabel>Team</HeaderLabel>
        <HeaderLabel>Value</HeaderLabel>
        {!isArchived && <HeaderLabel>Action</HeaderLabel>}
        {
          Object.keys(currentRoster).filter((el) => el !== 'cash').map((el) => {
            const { teamId } = currentRoster[el];
            const { leagueId } = currentRoster[el];
            if (currentRoster[el].teamId) {
              return (
                <Fragment key={currentRoster[el].teamId}>
                  <Cell firstItem>
                    {sportTeams[leagueId][teamId].city}
                    {' '}
                    {sportTeams[leagueId][teamId].name}
                    {' '}
                  </Cell>
                  <Cell>
                    $
                    {currentRoster[el].val}
                  </Cell>
                  {!isArchived
                    ? (
                      <Cell button>
                        {getMemberActionButton(currentRoster[el].teamId)}
                      </Cell>
                    ) : null}
                </Fragment>
              );
            }
          })
        }
      </ScoringContainer>
    </Container>
  );
}

export default CurrentRosters;
