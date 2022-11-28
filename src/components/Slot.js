import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "@fontsource/open-sans";
import { mobileBreakPoint, blue, mediumBlue, lightBlue } from "../constants/style";

const widths = {
  slot: 10,
  team: 50,
  action: 20,
  points: 20
}

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid gray;
  font-family: "Ariel", sans-serif;
  font-size: 14px;
  border-left: 1px solid gray;
`;

const Tr = styled.tr`
  background-color: ${mediumBlue};
  &:nth-child(odd) {
    background-color: ${lightBlue};
  }
  @media (max-width: ${mobileBreakPoint}){
    width: ${props => widths[props.column]}vw;
  }
`;

const SelectButton = styled.button`
  background: ${(props) =>
    props.selectedSlot && props.selectedSlot === props.name
      ? "darkred"
      : blue};
`;
const nameTable = {
  league_1: "MLB",
  league_2: "NFL",
  league_3: "NHL",
  league_4: "NBA"
};

function RosterSlot({
  name,
  team,
  points,
  locked,
  changeRoster,
  selectedSlot,
  readOnly
}) {
  return (
    <Tr>
      <Td column={"slot"}>
        {nameTable[name] ? nameTable[name] : name.split("_")[0].toUpperCase()}
      </Td>
      <Td column={'team'}>{team === "empty" ? "EMPTY" : team}</Td>
      {readOnly ? null : (
        <Td column={'action'}>
          {locked ? (
            team === "empty" ? (
              "--"
            ) : (
              "🔒"
            )
          ) : (
            <SelectButton
              selectedSlot={selectedSlot}
              name={name}
              onClick={() => changeRoster(name)}
            >
              Move
            </SelectButton>
          )}
        </Td>
      )}

      <Td column={"points"}>{points}</Td>
    </Tr>
  );
}

export default RosterSlot;
