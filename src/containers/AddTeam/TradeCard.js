import React, { useState, useEffect, useInsertionEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import "@fontsource/open-sans";
import { red } from "../../constants/style";
import useApi from "../../hooks/useApi";
import { toast } from "react-toastify";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
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

  const getButtons = (state) => {
    if (state === "received") {
      return (
        <>
          <Button>Reject</Button> <Button accept={true}>Accept</Button>
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

  return (
    <Container>
      <ContentContainer>
        <p>
          Trade {topText[trade.isProposedByUser]}{" "}
          {orgMembers[trade.receiverId].team_name} (
          {orgMembers[trade.receiverId].name})
        </p>
        <TradeSidesContainer>
          <TradeSide>
            <TradeSideHeader>You {sendTense[state]}</TradeSideHeader>
            {trade.proposerTeams.map((team) =>
              toTeamName(team.id) ? (
                <p>
                  {toTeamName(team.id)} (${team.value})
                </p>
              ) : (
                <p>${team.value} Rofl Cash</p>
              )
            )}
          </TradeSide>
          <TradeSide>
            <TradeSideHeader>You {receiveTense[state]}</TradeSideHeader>
            {trade.receiverTeams.map((team) =>
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
