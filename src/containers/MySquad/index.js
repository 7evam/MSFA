import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useRoster from "./useRoster";
import { convertMonthToReadable } from "../../utils";
import {useSelector} from 'react-redux'
import MonthTicker from '../../components/MonthTicker'
import RosterComponent from '../../components/Roster'
import "@fontsource/open-sans";

const lightBlue = '#DFE5EC'
const Container = styled.div`
    width: 500px;
`;
const Slot = styled.div`
  margin-top: 25px;
`;
const SelectButton = styled.button`
  background: ${(props) =>
    props.selectedSlot && props.selectedSlot === props.name
      ? "darkred"
      : "limegreen"};
`;

const BannerMessage = styled.div`
    font-family: "Roboto", sans-serif;
    font-size: 18px;
    border: 1px solid grey;
    margin-top: 10px;
    padding: 7px;
    display: flex;
    justify-content: center;
`;

const MonthContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    font-family: "Roboto", sans-serif;
    font-size: 18px;
`

const YearContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    font-family: "Roboto", sans-serif;
    font-size: 18px;
`

const MonthButton = styled.button`
  background: ${(props) => (props.selectedMonth ? "limegreen" : "white")};
`;

const ScrollMenuContainer = styled.div`
  background-color: #333;
  width: 450px;
  display: flex;
  flex-direction: row;
`;

const ScrollMenu = styled.div`
  overflow: auto;
  white-space: nowrap;
  display: inline-block;
  left: 100px;
`;

const ScrollMenuLink = styled.a`
  display: inline-block;
  color: ${(props) => (props.selected ? "limegreen" : "white")};
  text-align: center;
  padding: 14px;
  text-decoration: none;
  width: 100px;
  cursor: pointer;
`;

const ScrollMenuButton = styled.a`
  display: inline-block;
  color: white;
  text-align: center;
  padding: 14px;
  text-decoration: none;
  width: 25px;
  cursor: pointer;
`;

const SubmitChangesButton = styled.button`
     font-size: 14px;
     background:#0066A2;
     color:white;
     border-style:outset;
     border-color:#0066A2;
     height:25px;
     width:70px;
     font-family: "Roboto", sans-serif;
     text-shadow:none;
     border-radius: 20px;
     margin-left: 15px;
`

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
    activeRoflMonths
  } = useRoster();

  const {activeYears} = useSelector(state => ({
    ...state.sportReducer
  }))

  const isActiveTable = {}

    activeRoflMonths && selectedRoflYear && activeRoflMonths[selectedRoflYear].forEach(month => {
        isActiveTable[month.leagueId] = month.roflMonth
    })

  const [appliedScroll, setAppliedScroll] = useState(false);

  const currentMonthRoster = roster
    ? roster[`${roflMonth}-${selectedRoflYear}`]
    : null;

  const scrollLeft = () => {
    scrollRef.current.scrollLeft -= 400;
  };

  const scrollRight = () => {
    scrollRef.current.scrollLeft += 400;
  };

  const scrollRef = React.createRef();

  useEffect(() => {
    if (scrollRef && scrollRef.current && !appliedScroll) {
      scrollRef.current.scrollLeft += (roflMonth - 1) * 107;
      setAppliedScroll(true);
    }
  }, [scrollRef]);

  const monthsForScroll = (year) => {
    year = Number(year);
    return [
      { number: 1, month: `April ${year}` },
      { number: 2, month: `May ${year}` },
      { number: 3, month: `June ${year}` },
      { number: 4, month: `July ${year}` },
      { number: 5, month: `August ${year}` },
      { number: 6, month: `September ${year}` },
      { number: 7, month: `October ${year}` },
      { number: 8, month: `November ${year}` },
      { number: 9, month: `December ${year}` },
      { number: 10, month: `January ${year + 1}` },
      { number: 11, month: `February ${year + 1}` },
      { number: 12, month: `March ${year + 1}` },
      { number: 13, month: `April ${year + 1}` },
      { number: 14, month: `May ${year + 1}` }
    ];
  };

  const SlotContent = (leagueInfo, leagueName) => {
    <Slot>
      {leagueInfo.name}: {leagueInfo.city} {leagueInfo.name}{" "}
      <SelectButton
        selectedSlot={selectedSlot}
        name={leagueName}
        onClick={() => test(leagueName)}
      >
        Move
      </SelectButton>
    </Slot>;
  };

  return (
    <Container>
      <p>Welcome to roster</p>

      {roster && currentOrganization && selectedRoflYear ? (
        <div>
          <YearContainer><p>RoFL Year: {selectedRoflYear}</p></YearContainer>
            <MonthTicker roflMonth={roflMonth} setRoflMonth={setRoflMonth} selectedRoflYear={selectedRoflYear}/>
          <MonthContainer><p>RoFL Month: {roflMonth}</p></MonthContainer>
          <RosterComponent selectedRoflYear={selectedRoflYear} currentMonthRoster={currentMonthRoster} roflMonth={roflMonth} isActiveTable={isActiveTable} changeRoster={changeRoster} selectedSlot={selectedSlot}/>
          {areRostersEqual ? null : (
            <BannerMessage>
              You have unsaved changes
              <SubmitChangesButton onClick={handleSubmit}>Submit</SubmitChangesButton>
            </BannerMessage>
          )}
        </div>
      ) : (
        <p>loading...</p>
      )}
    </Container>
  );
}

export default Roster;
