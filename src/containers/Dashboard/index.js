import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useDashboard from "./useDashboard";
import { convertMonthToReadable } from "../../utils";

const Container = styled.div``;
const Slot = styled.div`
  margin-top: 25px;
`;
const SelectButton = styled.button`
  background: ${(props) =>
    props.selectedSlot && props.selectedSlot === props.name
      ? "darkred"
      : "limegreen"};
`;

const BannerMessage = styled.div``;

const MonthButton = styled.button`
  background: ${(props) => (props.selectedMonth ? "limegreen" : "white")};
`;

function Dashboard(props) {
  const {
    activeRoflYears,
    selectedRoflYear,
    roflMonth,
    roster,
    currentOrganization,
    setRoflMonth,
    setSelectedRoflYear,
    changeSelectedYear
  } = useDashboard();

  const currentMonthRoster = roster
    ? roster[`${roflMonth}-${selectedRoflYear}`]
    : null;

  const SelectYear = () => {
    const year1 = activeRoflYears[0];
    const year2 = activeRoflYears[1];
    return (
      <div>
        <div
          onClick={() => {
            changeSelectedYear(year1);
          }}
        >
          {year1}
        </div>
        <div
          onClick={() => {
            changeSelectedYear(year2);
          }}
        >
          {year2}
        </div>
      </div>
    );
  };

  return (
    <Container>
      <p>Welcome to the dashboard</p>

      {roster && currentOrganization && selectedRoflYear ? (
        <div>
          {/* <div>Year: {selectedRoflYear}</div> */}

          <div>
            For RoFL Season Beginning in:{" "}
            {activeRoflYears.length === 1 ? (
              <p>{selectedRoflYear}</p>
            ) : (
              SelectYear()
            )}{" "}
          </div>
          <p>month: {convertMonthToReadable(roflMonth, selectedRoflYear)}</p>
          <Slot>
            {currentOrganization.league_1.name}:{" "}
            {currentMonthRoster.league_1.city}{" "}
            {currentMonthRoster.league_1.name} -{" "}
            {currentMonthRoster.league_1.roflScore} points
          </Slot>
          <Slot>
            {currentOrganization.league_2.name}:{" "}
            {currentMonthRoster.league_2.city}{" "}
            {currentMonthRoster.league_2.name} -{" "}
            {currentMonthRoster.league_2.roflScore} points
          </Slot>
          {currentOrganization.league_3 ? (
            <Slot>
              {currentOrganization.league_3.name}:{" "}
              {currentMonthRoster.league_3.city}{" "}
              {currentMonthRoster.league_3.name} -{" "}
              {currentMonthRoster.league_3.roflScore} points
            </Slot>
          ) : null}
          {currentOrganization.league_4 ? (
            <Slot>
              {currentOrganization.league_4.name}:{" "}
              {currentMonthRoster.league_4.city}{" "}
              {currentMonthRoster.league_4.name} -{" "}
              {currentMonthRoster.league_4.roflScore} points
            </Slot>
          ) : null}
          {Array.from(Array(currentOrganization.flex_spots)).map((x, i) => (
            <Slot key={`p-${i}`}>
              FLEX: {currentMonthRoster[`flex_${i + 1}`].city}{" "}
              {currentMonthRoster[`flex_${i + 1}`].name} -{" "}
              {currentMonthRoster[`flex_${i + 1}`].roflScore} points
            </Slot>
          ))}
          {Array.from(Array(currentOrganization.bench_spots)).map((x, i) => (
            <Slot key={`p-${i}`}>
              BENCH: {currentMonthRoster[`bench_${i + 1}`].city}{" "}
              {currentMonthRoster[`bench_${i + 1}`].name} -{" "}
              {currentMonthRoster[`bench_${i + 1}`].roflScore} points
            </Slot>
          ))}
        </div>
      ) : (
        <p>loading...</p>
      )}
    </Container>
  );
}

export default Dashboard;
