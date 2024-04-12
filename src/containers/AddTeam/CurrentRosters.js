import React, { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import '@fontsource/open-sans';
import { toast } from 'react-toastify';
import useApi from '../../hooks/useApi';
import RosterComponent from '../../components/Roster';
import Loading from '../../components/Loading';
import useHydration from '../../hooks/useHydration';
import {
  Section, Select, Label, Headline, Container, League, LeagueSelector, slotData, SlotRow, Th, TitleRow, Td, Table, CashContainer,
} from './components';
import useAddTeam from './useAddTeam';
import { convertRealToRofl, convertDateObjToReadable } from '../../utils';
import { mobileBreakPoint } from '../../constants/style';

const ScoringContainer = styled.div`
    display: grid;
    grid-template-columns: ${(props) => props.isArchived ? '1fr 1fr' : '1fr 1fr 1fr'};
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    width: 100%;
    margin-top: 15px;
    border: 2px solid #E5EAF4;
    border-radius: 10px;
    ${(props) => props.isArchived ?
    `
    & div:nth-child(4n+5),
    & div:nth-child(4n+6) {
      background-color: #F7FBFF;
    }
    `
    :
    `
    & div:nth-child(6n+7), 
    & div:nth-child(6n+8),
    & div:nth-child(6n+9) {
      background-color: #F7FBFF;
    }
    `
  }
`;



const ActionButton = styled.button`
    height: 120%;
    width: 80%;
    z-index: 100;
    display: inline-block;
    outline: none;
    cursor: pointer;
    font-weight: 500;
    padding: 0 16px;
    margin-left: 8px;
    border-radius: 4px;
    color: white;
    background: ${(props) => (props.selectedSlot && props.selectedSlot === props.leagueKey
    ? '#4E871F'
    : '#17288F')};
    line-height: 1.15;
    font-size: 14px;
    letter-spacing: .08em;
    text-decoration: none;
    text-transform: uppercase;
    border: none;
    text-align: center;
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
    transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
    :hover {
        background: #4E871F;
        box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
    }
    @media (max-width: ${mobileBreakPoint}){
        width: 80px;
        height: 20px;
       }
`;

const Cell = styled.div`
    padding: 16px;
    padding-right: 0px;
    border-bottom: ${(props) => (props.isLastInList ? null : '2px solid #E5EAF4')}; 
    background-color: ${(props) => (props.colored ? '#F7FBFF' : 'white')};
    &:hover{
        text-decoration: ${(props) => (props.teamName ? 'underline' : null)}; 
        cursor: ${(props) => (props.teamName ? 'pointer' : null)}; 
    }
    @media (min-width: ${mobileBreakPoint}){
        ${(props) => !props.firstItem && `
            &:before {
                content: "";
                right: 0;
                z-index: 100;
                top: 0;
                height: 50%; 
                border-right: 2px solid #E5EAF4;
                margin-right: 8px;
            }
        `}
    }
    
    @media (max-width: ${mobileBreakPoint}){
        font-size: 14px;
    }
`;

const HeaderLabel = styled.div`
    padding: 16px 0px 8px 16px;
    text-align:center;
    background-color: #F7FBFF;
    font-weight: 800;
    font-size: 14px;
    &:hover{
      cursor: pointer;
      text-decoration: underline;
  }
    @media (max-width: ${mobileBreakPoint}){
      font-size: 10px;
      padding-right: 16px;
     }
`;


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
                      <Cell>
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
