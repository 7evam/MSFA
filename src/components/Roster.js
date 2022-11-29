import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "@fontsource/open-sans";
import Slot from "./Slot";
import {useSelector} from 'react-redux'
import { PLAYOFF_MONTHS } from "../constants";
import { mobileBreakPoint, red } from "../constants/style";

// const red  = '#DA2929'

const widths = {
  slot: 10,
  team: 50,
  action: 20,
  points: 20
}

const Container = styled.table`
width: 700px;
border: 5px solid black;
@media (max-width: ${mobileBreakPoint}){
  width: 100vw;
  border: 0px;
}
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid gray;
  font-family: "Ariel", sans-serif;
  font-size: 14px;
  border-left: 1px solid gray;
`;

const Tr = styled.tr`
&:nth-child(odd) {
    background-color: ${red};
}
`;

const Th = styled.th`
padding: 12px;
border-bottom: 1px solid gray;
font-family: "Ariel", sans-serif;
font-size: 14px;
border-left: 1px solid gray;
`

const Tbody = styled.tbody`

`;


function RosterComponent({ currentMonthRoster, roflMonth, isActiveTable, changeRoster, selectedSlot, selectedRoflYear, readOnly}) {

    const endOfLeagueTable = PLAYOFF_MONTHS[selectedRoflYear]

    const benchSpots = (Object.values(endOfLeagueTable)).filter(val => val >= roflMonth).length - 1

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
          {readOnly 
          ? null 
          : 
          <Th style={{ width: "70px" }}>
            Action
          </Th>
          }
          
          <Th style={{ width: "50px" }}>
            Points
          </Th>
        </Tr>
        {roflMonth <= endOfLeagueTable['1'] ? (
          <Slot
            name={"league_1"}
            team={`${currentMonthRoster.league_1.city} ${currentMonthRoster.league_1.name}`}
            points={currentMonthRoster.league_1.roflScore}
            readOnly={readOnly}
            changeRoster={readOnly ? null : changeRoster} selectedSlot={readOnly? null : selectedSlot}
            locked={readOnly ? null : currentMonthRoster.league_1.isLocked}
          />
        ) : null}
        {roflMonth <= endOfLeagueTable['2'] ? (
          <Slot
            name={"league_2"}
            team={`${currentMonthRoster.league_2.city} ${currentMonthRoster.league_2.name}`}
            points={currentMonthRoster.league_2.roflScore}
            readOnly={readOnly}
            changeRoster={readOnly ? null : changeRoster} selectedSlot={readOnly? null : selectedSlot}
            locked={readOnly ? null : currentMonthRoster.league_2.isLocked}
          />
        ) : null}
        {roflMonth <= endOfLeagueTable['3'] ? (
          <Slot
            name={"league_3"}
            team={`${currentMonthRoster.league_3.city} ${currentMonthRoster.league_3.name}`}
            points={currentMonthRoster.league_3.roflScore}
            readOnly={readOnly}
            changeRoster={readOnly ? null : changeRoster} selectedSlot={readOnly? null : selectedSlot}
            locked={readOnly ? null : currentMonthRoster.league_3.isLocked}
          />
        ) : null}
        {roflMonth <= endOfLeagueTable['4'] ? (
          <Slot
            name={"league_4"}
            team={`${currentMonthRoster.league_4.city} ${currentMonthRoster.league_4.name}`}
            points={currentMonthRoster.league_4.roflScore}
            readOnly={readOnly}
            changeRoster={readOnly ? null : changeRoster} selectedSlot={readOnly? null : selectedSlot}
            locked={readOnly ? null : currentMonthRoster.league_4.isLocked}
          />
        ) : null}
        {currentMonthRoster.flex_1 ? (
          <Slot
            name={"flex_1"}
            team={roflMonth <= endOfLeagueTable[currentMonthRoster.flex_1.sport_league.id] ? `${currentMonthRoster.flex_1.city} ${currentMonthRoster.flex_1.name}`: 'empty'}
            points={currentMonthRoster.flex_1.roflScore}
            readOnly={readOnly}
            changeRoster={readOnly ? null : changeRoster} selectedSlot={readOnly? null : selectedSlot}
            locked={readOnly ? null : currentMonthRoster.flex_1.isLocked}
          />
        ) : 
        <Slot
        key={'empty flex'}
        name={`flex_1`}
        team={'empty'}
        points={null}
        readOnly={readOnly}
        changeRoster={readOnly ? null : changeRoster} selectedSlot={readOnly? null : selectedSlot}
        locked={false}
      />}

        {Array.from(Array(benchSpots)).map((x, i) => (
          `bench_${i+1}` in currentMonthRoster 
          ? 
          <Slot
              key={currentMonthRoster[`bench_${i+1}`].name}
              name={`bench_${i+1}`}
              team={roflMonth <= endOfLeagueTable[currentMonthRoster[`bench_${i+1}`].sport_league.id] ? `${currentMonthRoster[`bench_${i+1}`].city} ${currentMonthRoster[`bench_${i+1}`].name}`: 'empty'}
              points={currentMonthRoster[`bench_${i+1}`].roflScore}
              readOnly={readOnly}
              changeRoster={readOnly ? null : changeRoster} selectedSlot={readOnly? null : selectedSlot}
              locked={readOnly ? null : currentMonthRoster[`bench_${i+1}`].isLocked}
          /> 
          : 
          <Slot
            key={'empty'+i}
            name={`bench_${i+1}`}
            team={'empty'}
            points={null}
            readOnly={readOnly}
            changeRoster={readOnly ? null : changeRoster} selectedSlot={readOnly? null : selectedSlot}
            locked={false}
          />
        ))}
      </Tbody>
    </Container>
  );
}

export default RosterComponent;

// {Array.from(Array(benchSpots)).map((x, i) => (
  // `bench_${i+1}` in currentMonthRoster 
  // ? 
  // <Slot
  //     key={currentMonthRoster[`bench_${i+1}`].name}
  //     name={`bench_${i+1}`}
  //     team={roflMonth <= endOfLeagueTable[currentMonthRoster[`bench_${i+1}`].sport_league.id] ? `${currentMonthRoster[`bench_${i+1}`].city} ${currentMonthRoster[`bench_${i+1}`].name}`: 'empty'}
  //     points={currentMonthRoster[`bench_${i+1}`].roflScore}
  //     readOnly={readOnly}
  //     changeRoster={readOnly ? null : changeRoster} selectedSlot={readOnly? null : selectedSlot}
  //     locked={readOnly ? null : currentMonthRoster[`bench_${i+1}`].isLocked}
  //  /> 
  // : 
  // null
// ))}