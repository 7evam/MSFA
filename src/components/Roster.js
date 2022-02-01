import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "@fontsource/open-sans";
import Slot from "./Slot";
import {useSelector} from 'react-redux'

const red  = '#DA2929'
const Container = styled.table``;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid gray;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  border-left: 1px solid gray;
`;

const Tr = styled.tr`
&:nth-child(odd) {
    background-color: ${red}
`;

const Th = styled.th`
padding: 12px;
border-bottom: 1px solid gray;
font-family: "Roboto", sans-serif;
font-size: 14px;
border-left: 1px solid gray;
`

const Tbody = styled.tbody`

`;



function RosterComponent({ currentMonthRoster, roflMonth, isActiveTable, changeRoster, selectedSlot}) {
    
    const {currentOrganization} = useSelector(state => ({
        ...state.authReducer
      }));
    
  return (
    <Container>
      <Tbody>
        <Tr>
          <Th style={{ width: "50px" }}>
            Slot
          </Th>
          <Th style={{ width: "200px" }}>
            Team
          </Th>
          <Th style={{ width: "70px" }}>
            Action
          </Th>
          <Th style={{ width: "50px" }}>
            Points
          </Th>
        </Tr>
        {currentMonthRoster.league_1 ? (
          <Slot
            name={"league_1"}
            team={`${currentMonthRoster.league_1.city} ${currentMonthRoster.league_1.name}`}
            points={currentMonthRoster.league_1.roflScore}
            changeRoster={changeRoster} selectedSlot={selectedSlot}
            locked={currentMonthRoster.league_1.locked}
          />
        ) : null}
        {currentMonthRoster.league_2 ? (
          <Slot
            name={"league_2"}
            team={`${currentMonthRoster.league_2.city} ${currentMonthRoster.league_2.name}`}
            points={currentMonthRoster.league_2.roflScore}
            changeRoster={changeRoster} selectedSlot={selectedSlot}
            locked={currentMonthRoster.league_2.locked}
          />
        ) : null}
        {currentMonthRoster.league_3 ? (
          <Slot
            name={"league_3"}
            team={`${currentMonthRoster.league_3.city} ${currentMonthRoster.league_3.name}`}
            points={currentMonthRoster.league_3.roflScore}
            changeRoster={changeRoster} selectedSlot={selectedSlot}
            locked={currentMonthRoster.league_3.locked}
          />
        ) : null}
        {currentMonthRoster.league_4 ? (
          <Slot
            name={"league_4"}
            team={`${currentMonthRoster.league_4.city} ${currentMonthRoster.league_4.name}`}
            points={currentMonthRoster.league_4.roflScore}
            changeRoster={changeRoster} selectedSlot={selectedSlot}
            locked={currentMonthRoster.league_4.locked}
          />
        ) : null}
        {currentMonthRoster.flex_1 ? (
          <Slot
            name={"flex_1"}
            team={`${currentMonthRoster.flex_1.city} ${currentMonthRoster.flex_1.name}`}
            points={currentMonthRoster.flex_1.roflScore}
            changeRoster={changeRoster} selectedSlot={selectedSlot}
            locked={currentMonthRoster.flex_1.locked}
          />
        ) : null}

        {Array.from(Array(currentOrganization.bench_spots)).map((x, i) => (
         <Slot
            key={currentMonthRoster[`bench_${i+1}`].id}
            name={`bench_${i+1}`}
            team={`${currentMonthRoster[`bench_${i+1}`].city} ${currentMonthRoster[`bench_${i+1}`].name}`}
            points={currentMonthRoster[`bench_${i+1}`].roflScore}
            changeRoster={changeRoster} selectedSlot={selectedSlot}
            locked={currentMonthRoster[`bench_${i+1}`].locked}
          />
        ))}
        
      </Tbody>
    </Container>
  );
}

export default RosterComponent;
