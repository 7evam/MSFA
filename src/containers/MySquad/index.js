import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useRoster from "./useRoster";
import { convertMonthToReadable } from "../../utils";
import { useSelector } from "react-redux";
import MonthTicker from "../../components/MonthTicker";
import YearSelector from "../../components/YearSelector";
import RosterComponent from "../../components/Roster";
import "@fontsource/open-sans";
import {Container, Slot, SelectButton, BannerMessage, MonthButton, MonthContainer, YearContainer, ScrollMenu, ScrollMenuContainer, ScrollMenuLink, ScrollMenuButton, SubmitChangesButton, TeamName} from './components'
import Loading from "../../components/Loading";

function Roster(props) {
  const {
    selectedRoflYear,
    roflMonth,
    roster,
    currentOrganization,
    changeRoster,
    selectedSlot,
    areRostersEqual,
    setRoflMonth,
    handleSubmit,
    activeRoflMonths,
    setSelectedRoflYear,
    updateOneMonth,
    setUpdateOneMonth,
    name
  } = useRoster();

let activeYearArray = Object.keys(currentOrganization.activeYears)

  const isActiveTable = {};

  activeRoflMonths &&
    selectedRoflYear &&
    Object.keys(activeRoflMonths[selectedRoflYear]).forEach((month) => {
      isActiveTable[month.leagueId] = month.roflMonth;
    });

  const [appliedScroll, setAppliedScroll] = useState(false);

  const currentMonthRoster = roster
    ? roster[`${roflMonth}-${selectedRoflYear}`]
    : null;

  // const scrollLeft = () => {
  //   scrollRef.current.scrollLeft -= 400;
  // };

  // const scrollRight = () => {
  //   scrollRef.current.scrollLeft += 400;
  // };

  const scrollRef = React.createRef();

  useEffect(() => {
    if (scrollRef && scrollRef.current && !appliedScroll) {
      scrollRef.current.scrollLeft += (roflMonth - 1) * 107;
      setAppliedScroll(true);
    }
  }, [scrollRef]);

  console.log('here is active year array')
  console.log(activeYearArray)

  return (
    <Container>
      {roster && currentOrganization && selectedRoflYear ? (
        <div>
          <TeamName><p><b>{currentOrganization.team_name}</b> - managed by <b> {name}</b></p></TeamName>
          
          <hr/>
          {activeYearArray.length === 2 ? (
            <YearSelector
              activeYearArray={activeYearArray}
              setSelectedRoflYear={setSelectedRoflYear}
              selectedRoflYear={selectedRoflYear}
            />
          ) : (
            <YearContainer>
              <p>MSFA Year: {selectedRoflYear}</p>
            </YearContainer>
          )}

          <MonthTicker
            roflMonth={roflMonth}
            setRoflMonth={setRoflMonth}
            selectedRoflYear={selectedRoflYear}
          />
          {/* <MonthContainer>
            <p>RoFL Month: {roflMonth}</p>
          </MonthContainer> */}
          <RosterComponent
            selectedRoflYear={selectedRoflYear}
            currentMonthRoster={currentMonthRoster}
            roflMonth={roflMonth}
            isActiveTable={isActiveTable}
            changeRoster={changeRoster}
            selectedSlot={selectedSlot}
            readOnly={false}
          />
          {areRostersEqual ? null : (
            <BannerMessage>
              <label>
                <input type="checkbox" value={updateOneMonth} onClick={() => setUpdateOneMonth(!updateOneMonth)}/>
                Update only this month
              </label>
              You have unsaved changes
              <SubmitChangesButton onClick={handleSubmit}>
                Submit
              </SubmitChangesButton>
            </BannerMessage>
          )}
        </div>
      ) : (
        <Loading/>
      )}
    </Container>
  );
}

export default Roster;
