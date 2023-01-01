import React, { useState, useEffect, useInsertionEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import "@fontsource/open-sans";
import { red, lightBlue, mediumBlue } from "../../constants/style";
import useApi from "../../hooks/useApi";
import { toast } from "react-toastify";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid black;
  &:nth-child(even) {
    background-color: ${mediumBlue};
}
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  text-align: right;
  padding-right: 20px;
  padding-bottom: 20px;
`;

const Button = styled.button`
  background-color: ${(props) => (props.accept ? "#4CAF50" : red)};
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  font-size: 14px;
  margin-left: 14px;
  padding: 8px 14px 8px 14px;
  cursor: pointer;
`;

const TradeSidesContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const TradeSideHeader = styled.p`
  font-weight: 800;
`;

const TradeSide = styled.div``;

function TradeCard({ trade, state, reFetchTrades }) {
  const { sportTeams, orgMembers } = useSelector((state) => ({
    ...state.sportReducer
  }));

  const { makeRequest, isLoading } = useApi();

  const toTeamName = (id) => {
    if (!id) return null;
    const leagueId = Number(String(id)[0]);
    const team = sportTeams[leagueId][id];
    return `${team.city} ${team.name}`;
  };

  const topText = {
    true: "to",
    false: "from"
  };

  const otherUser = {
    true: `${orgMembers[trade.receiverId].team_name} (${orgMembers[trade.receiverId].name})`,
    false: `${orgMembers[trade.proposerId].team_name} (${orgMembers[trade.proposerId].name})`
  }

  const sendTense = {
    received: "send",
    proposed: "send",
    accepted: "sent",
    declined: "sent"
  };

  const receiveTense = {
    received: "receive",
    proposed: "receive",
    accepted: "received",
    declined: "received"
  };

  const sleep = async (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const deleteTrade = async () => {
    const confimred = confirm("Are you sure you'd like to revoke this trade?");
    if (!confimred) return;
    try {
      var res = await makeRequest({
        method: "delete",
        route: `users/trades/tradeId/${trade.tradeId}`
      });
      if (res.body === "success") {
        toast.success("Revoked trade");
      }
      await sleep(300);
      await reFetchTrades();
    } catch (e) {
      console.log("problem");
      console.error(e);
    }
  };

  const rejectTrade = async () => {
    const confimred = confirm("Are you sure you'd like to reject this trade?");
    if (!confimred) return;
    try {
      var res = await makeRequest({
        method: "patch",
        route: `users/trades/tradeId/${trade.tradeId}`,
        data: {
            tradeId: trade.tradeId,
            accepted: false
        }
      });
      if (res.body === "success") {
        toast.success("Rejected trade");
      }
      await sleep(300);
      await reFetchTrades();
    } catch (e) {
      console.log("problem");
      console.error(e);
    }
  }

  const acceptTrade = async () => {
    const confimred = confirm("Are you sure you'd like to accept this trade?");
    if (!confimred) return;
    try {
      var res = await makeRequest({
        method: "patch",
        route: `users/trades/tradeId/${trade.tradeId}`,
        data: {
            tradeId: trade.tradeId,
            accepted: true
        }
      });
      if (res.body === "success") {
        toast.success("Accepted trade");
      }
      await sleep(300);
      await reFetchTrades();
    } catch (e) {
      console.log("problem");
      console.error(e);
    }
  }

  const getButtons = (state) => {
    if (state === "received") {
      return (
        <>
          <Button onClick={rejectTrade}>Reject</Button> <Button onClick={acceptTrade} accept={"true"}>Accept</Button>
        </>
      );
    } else {
      return (
        <>
          <Button onClick={deleteTrade}>Revoke</Button>
        </>
      );
    }
  };

  const sendTeams = trade.isProposedByUser ? trade.proposerTeams : trade.receiverTeams
  const receiveTeams = trade.isProposedByUser ? trade.receiverTeams : trade.proposerTeams

  return (
    <Container>
      <ContentContainer>
        <p>
          Trade {topText[trade.isProposedByUser]}{" "}
          {otherUser[trade.isProposedByUser]}
        </p>
        <TradeSidesContainer>
          <TradeSide>
            <TradeSideHeader>You {sendTense[state]}</TradeSideHeader>
            {
            sendTeams.map((team) =>
              toTeamName(team.id) ? (
                <p>
                  {toTeamName(team.id)} (${team.value})
                </p>
              ) : (
                <p>${team.value} Rofl Cash</p>
              )
            )
            }
          </TradeSide>
          <TradeSide>
            <TradeSideHeader>You {receiveTense[state]}</TradeSideHeader>
            {receiveTeams.map((team) =>
              toTeamName(team.id) ? (
                <p>
                  {toTeamName(team.id)} (${team.value})
                </p>
              ) : (
                <p>${team.value} Rofl Cash</p>
              )
            )}
          </TradeSide>
        </TradeSidesContainer>
      </ContentContainer>
      {state === "received" || state === "proposed" ? (
        <ButtonContainer>{getButtons(state)}</ButtonContainer>
      ) : null}
    </Container>
  );
}

export default TradeCard;
