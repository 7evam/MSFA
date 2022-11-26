import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "@fontsource/open-sans";

const darkBlue = "#799cd9";
const mediumBlue = "#C0CCD9";
const lightBlue = "#DFE5EC";

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
`;

const SelectButton = styled.button`
  background: ${(props) =>
    props.selectedSlot && props.selectedSlot === props.name
      ? "darkred"
      : darkBlue};
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
      <Td style={{ width: "50px", fontWeight: 800 }}>
        {nameTable[name] ? nameTable[name] : name.split("_")[0].toUpperCase()}
      </Td>
      <Td style={{ width: "230px" }}>{team === "empty" ? "EMPTY" : team}</Td>
      {readOnly ? null : (
        <Td style={{ width: "70px" }}>
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

      <Td style={{ width: "50px" }}>{points}</Td>
    </Tr>
  );
}

export default RosterSlot;
