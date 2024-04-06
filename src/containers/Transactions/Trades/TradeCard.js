import React, { useState, useEffect, useInsertionEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import '@fontsource/open-sans';
import { toast } from 'react-toastify';
import { red, lightBlue, mediumBlue } from '../../../constants/style';
import useApi from '../../../hooks/useApi';
import {
  TradeCardContainer, ContentContainer, ButtonContainer, Button, TradeSidesContainer, TradeSideHeader, TradeSide
} from './components'

function TradeCard({ trade, state, reFetchTrades }) {
  const { sportTeams, orgMembers } = useSelector((state) => ({
    ...state.sportReducer,
  }));

  const { makeRequest, isLoading } = useApi();

  const toTeamName = (id) => {
    if (!id) return null;
    const leagueId = Number(String(id)[0]);
    const team = sportTeams[leagueId][id];
    return `${team.city} ${team.name}`;
  };

  const topText = {
    true: 'to',
    false: 'from',
  };

  const otherUser = {
    true: `${orgMembers[trade.receiverId].team_name} (${orgMembers[trade.receiverId].name})`,
    false: `${orgMembers[trade.proposerId].team_name} (${orgMembers[trade.proposerId].name})`,
  };

  const sendTense = {
    received: 'send',
    proposed: 'send',
    accepted: 'sent',
    declined: 'sent',
  };

  const receiveTense = {
    received: 'receive',
    proposed: 'receive',
    accepted: 'received',
    declined: 'received',
  };

  const sleep = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const deleteTrade = async () => {
    const confimred = confirm("Are you sure you'd like to revoke this trade?");
    if (!confimred) return;
    try {
      const res = await makeRequest({
        method: 'delete',
        route: `users/trades/tradeId/${trade.tradeId}`,
      });
      if (res.body === 'success') {
        toast.success('Revoked trade');
      }
      await sleep(300);
      await reFetchTrades();
    } catch (e) {
      console.log('problem');
      console.error(e);
    }
  };

  const rejectTrade = async () => {
    const confimred = confirm("Are you sure you'd like to reject this trade?");
    if (!confimred) return;
    try {
      const res = await makeRequest({
        method: 'patch',
        route: `users/trades/tradeId/${trade.tradeId}`,
        data: {
          tradeId: trade.tradeId,
          accepted: false,
        },
      });
      if (res.body === 'success') {
        toast.success('Rejected trade');
      }
      await sleep(300);
      await reFetchTrades();
    } catch (e) {
      console.log('problem');
      console.error(e);
    }
  };

  const acceptTrade = async () => {
    const confimred = confirm("Are you sure you'd like to accept this trade?");
    if (!confimred) return;
    try {
      const res = await makeRequest({
        method: 'patch',
        route: `users/trades/tradeId/${trade.tradeId}`,
        data: {
          tradeId: trade.tradeId,
          accepted: true,
        },
      });
      if (res.body === 'success') {
        toast.success('Accepted trade');
      }
      await sleep(300);
      await reFetchTrades();
    } catch (e) {
      console.log('problem');
      console.error(e);
    }
  };

  const getButtons = (state) => {
    if (state === 'received') {
      return (
        <>
          <Button onClick={rejectTrade}>Reject</Button>
          {' '}
          <Button onClick={acceptTrade} accept="true">Accept</Button>
        </>
      );
    }
    return (
      <Button onClick={deleteTrade}>Revoke</Button>
    );
  };

  const sendTeams = trade.isProposedByUser ? trade.proposerTeams : trade.receiverTeams;
  const receiveTeams = trade.isProposedByUser ? trade.receiverTeams : trade.proposerTeams;

  return (
    <TradeCardContainer>
      <ContentContainer>
        <p>
          Trade
          {' '}
          {topText[trade.isProposedByUser]}
          {' '}
          {otherUser[trade.isProposedByUser]}
        </p>
        <TradeSidesContainer>
          <TradeSide>
            <TradeSideHeader>
              You
              {' '}
              {sendTense[state]}
            </TradeSideHeader>
            {
              sendTeams.map((team) => (toTeamName(team.id) ? (
                <p>
                  {toTeamName(team.id)}
                  {' '}
                  ($
                  {team.value}
                  )
                </p>
              ) : (
                <p>
                  $
                  {team.value}
                  {' '}
                  MSFA Cash
                </p>
              )))
            }
          </TradeSide>
          <TradeSide>
            <TradeSideHeader>
              You
              {' '}
              {receiveTense[state]}
            </TradeSideHeader>
            {receiveTeams.map((team) => (toTeamName(team.id) ? (
              <p>
                {toTeamName(team.id)}
                {' '}
                ($
                {team.value}
                )
              </p>
            ) : (
              <p>
                $
                {team.value}
                {' '}
                MSFA Cash
              </p>
            )))}
          </TradeSide>
        </TradeSidesContainer>
      </ContentContainer>
      {state === 'received' || state === 'proposed' ? (
        <ButtonContainer>{getButtons(state)}</ButtonContainer>
      ) : null}
    </TradeCardContainer>
  );
}

export default TradeCard;
