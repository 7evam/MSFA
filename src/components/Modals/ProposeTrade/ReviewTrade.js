import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import useApi from '../../../hooks/useApi';
import {
  Container, TopBar, CloseContainer, TopText, CloseButton, BottomBar, BottomButton, Title, MainContent, RowContainer, TeamRow, TeamText,
} from '../TeamSelect/components';
import { lightBlue, mediumBlue } from '../../../constants/style';

const LeftSide = styled.div`
    margin-left: 20%;
    text-align: center;
    padding-bottom: 210px;
`;

const RightSide = styled.div`
    margin-right: 20%;
    text-align: center;
    padding-bottom: 100px;
`;

const TradeContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

// export const TeamRow = styled.div`
//   display: flex;
//   align-items: center;
//   flex-direction: row;
//   justify-content: space-between;
//   background-color: ${lightBlue};
//   &:nth-child(odd) {
//     background-color: ${mediumBlue};
//   }
// `;

function ReviewTrade({
  setStage, teamsForTrade, cash,
}) {
  const {
    sportTeams, playoffMonths, activeYears, selectedYear,
  } = useSelector((state) => ({
    ...state.sportReducer,
  }));

  const { props } = useSelector((state) => ({
    ...state.modalReducer,
  }));

  const { currentOrganization } = useSelector((state) => ({
    ...state.authReducer,
  }));

  const { makeRequest, isLoading } = useApi();

  const dispatch = useDispatch();

  const tradeForTeams = [];
  Object.keys(teamsForTrade.tradeFor).forEach((teamId) => {
    if (teamsForTrade.tradeFor[teamId].checked === true) {
      const leagueId = Number(String(teamId)[0]);
      tradeForTeams.push({
        teamId,
        name: `${sportTeams[leagueId][teamId].city} ${sportTeams[leagueId][teamId].name}`,
        value: teamsForTrade.tradeFor[teamId].val,
        leagueId: teamsForTrade.tradeFor[teamId].leagueId,
      });
    }
  });

  const tradeAwayTeams = [];
  Object.keys(teamsForTrade.tradeAway).forEach((teamId) => {
    if (teamsForTrade.tradeAway[teamId].checked === true) {
      const leagueId = Number(String(teamId)[0]);
      tradeAwayTeams.push({
        teamId,
        name: `${sportTeams[leagueId][teamId].city} ${sportTeams[leagueId][teamId].name}`,
        value: teamsForTrade.tradeAway[teamId].val,
        leagueId: teamsForTrade.tradeAway[teamId].leagueId,
      });
    }
  });

  const submitTrade = async () => {
    // validate trade
    const proposerTrades = {
      cash: cash.tradeAway,
      teams: [],
    };
    tradeAwayTeams.forEach((team) => {
      proposerTrades.teams.push({
        teamId: team.teamId,
        value: team.value,
      });
    });

    const receiverTrades = {
      cash: cash.tradeFor,
      teams: [],
    };
    tradeForTeams.forEach((team) => {
      receiverTrades.teams.push({
        teamId: team.teamId,
        value: team.value,
      });
    });

    const res = await makeRequest({
      method: 'post',
      route: '/users/trades',
      data: {
        organizationId: currentOrganization.id,
        proposerId: currentOrganization.user_id,
        receiverId: props.userToTradeWith,
        proposerTrades,
        receiverTrades,
        roflMonth: activeYears[selectedYear][Number(String(props.selectedTeam)[0])].roflMonth + 1,
        roflYear: selectedYear,
      },
    });
    if (res.statusCode === 201) {
      toast.success('Trade submitted successfully');
      dispatch({
        type: 'CLOSE_MODAL',
      });
    } else {
      toast.error('There was an error submitting your request');
    }
  };

  const closeModal = () => {
    dispatch({
      type: 'CLOSE_MODAL',
    });
  };

  return (
    <Container>
      <TopBar>
        <div />
        <Title>
          Review Trade
        </Title>
        <CloseContainer>
          <CloseButton onClick={closeModal}>
            X
          </CloseButton>
        </CloseContainer>
      </TopBar>
      <MainContent>
        <TradeContainer>
          <LeftSide>
            <p><b>You receive</b></p>
            {tradeForTeams.map((team) => (
              <p>
                {team.name}
                {' '}
                {playoffMonths[selectedYear][team.leagueId] - 1 === props.currentRoflMonths[team.leagueId] ? null : `($${team.value})`}
              </p>
            ))}
            {cash.tradeFor > 0 ? (
              <p>
                $
                {cash.tradeFor}
                {' '}
                Rofl Cash
              </p>
            ) : null}
          </LeftSide>
          <RightSide>
            <p><b>Opponent receives</b></p>
            {tradeAwayTeams.map((team) => (
              <p>
                {team.name}
                {' '}
                {playoffMonths[selectedYear][team.leagueId] - 1 === props.currentRoflMonths[team.leagueId] ? null : `($${team.value})`}
              </p>
            ))}
            {cash.tradeAway > 0 ? (
              <p>
                $
                {cash.tradeAway}
                {' '}
                Rofl Cash
              </p>
            ) : null}
          </RightSide>
        </TradeContainer>
      </MainContent>
      <BottomBar>
        <BottomButton position="left" onClick={() => setStage('tradeAway')}>Go Back</BottomButton>
        <BottomButton onClick={submitTrade}>Submit</BottomButton>
      </BottomBar>
    </Container>
  );
}

export default ReviewTrade;
