import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useRoster from "./useRoster";
import { convertMonthToReadable } from "../../utils";
import { useSelector } from "react-redux";
import MonthTicker from "../../components/MonthTicker";
import YearSelector from "../../components/YearSelector";
import RosterComponent from "../../components/Roster";
import "@fontsource/open-sans";

const lightBlue = "#DFE5EC";
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
`;

const YearContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-family: "Roboto", sans-serif;
  font-size: 18px;
`;

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
  background: #0066a2;
  color: white;
  border-style: outset;
  border-color: #0066a2;
  height: 25px;
  width: 70px;
  font-family: "Roboto", sans-serif;
  text-shadow: none;
  border-radius: 20px;
  margin-left: 15px;
`;

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
    setUpdateOneMonth
  } = useRoster();

let activeYearArray = Object.keys(currentOrganization.activeYears)

  const isActiveTable = {};

  activeRoflMonths &&
    selectedRoflYear &&
    activeRoflMonths[selectedRoflYear].forEach((month) => {
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

  return (
    <Container>
      <p>Welcome to roster</p>

      {roster && currentOrganization && selectedRoflYear ? (
        <div>
          {activeYearArray.length === 2 ? (
            <YearSelector
              activeYearArray={activeYearArray}
              setSelectedRoflYear={setSelectedRoflYear}
              selectedRoflYear={selectedRoflYear}
            />
          ) : (
            <YearContainer>
              <p>RoFL Year: {selectedRoflYear}</p>
            </YearContainer>
          )}

          <MonthTicker
            roflMonth={roflMonth}
            setRoflMonth={setRoflMonth}
            selectedRoflYear={selectedRoflYear}
          />
          <MonthContainer>
            <p>RoFL Month: {roflMonth}</p>
          </MonthContainer>
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
        <p>loading...</p>
      )}
    </Container>
  );
}

export default Roster;
