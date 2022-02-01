import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useRoster from "./useRoster";
import { convertMonthToReadable } from "../../utils";
import RosterSlot from "./RosterSlot";
import {useSelector} from 'react-redux'

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

function Roster(props) {
  const {
    selectedRoflYear,
    roflMonth,
    roster,
    currentOrganization,
    test,
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

  console.log('here is table')
  console.log(isActiveTable)

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
          <p>year: {selectedRoflYear}</p>

          <ScrollMenuContainer>
            <ScrollMenuButton onClick={scrollLeft}>{"<"}</ScrollMenuButton>
            <ScrollMenu ref={scrollRef}>
              {monthsForScroll(selectedRoflYear).map((item) => (
                <ScrollMenuLink
                  selected={item.number === roflMonth}
                  key={item.number}
                  onClick={() => setRoflMonth(item.number)}
                >
                  {item.month}
                </ScrollMenuLink>
              ))}
            </ScrollMenu>
            <ScrollMenuButton onClick={scrollRight}>{">"}</ScrollMenuButton>
          </ScrollMenuContainer>

          <p>month: {roflMonth}</p>
          <RosterSlot
            isLocked={roflMonth <= isActiveTable[currentMonthRoster.league_1.sport_league.id]}
            isInactive={0 === currentMonthRoster.league_1.sport_league.active}
            test={test}
            teamInfo={currentMonthRoster.league_1}
            selectedSlot={selectedSlot}
            slotName={currentOrganization.league_1.name}
            leagueName="league_1"
          />
          <RosterSlot
                      isLocked={roflMonth <= isActiveTable[currentMonthRoster.league_2.sport_league.id]}
                      isInactive={0 === currentMonthRoster.league_2.sport_league.active}
            table={isActiveTable}
            test={test}
            teamInfo={currentMonthRoster.league_2}
            selectedSlot={selectedSlot}
            slotName={currentOrganization.league_2.name}
            leagueName="league_2"
          />
          {currentOrganization.league_3 ? (
            <RosterSlot
            isLocked={roflMonth <= isActiveTable[currentMonthRoster.league_3.sport_league.id]}
            isInactive={0 === currentMonthRoster.league_3.sport_league.active}
              table={isActiveTable}
              test={test}
              teamInfo={currentMonthRoster.league_3}
              selectedSlot={selectedSlot}
              slotName={currentOrganization.league_3.name}
              leagueName="league_3"
            />
          ) : null}
          {currentOrganization.league_4 ? (
            <RosterSlot
            isLocked={roflMonth <= isActiveTable[currentMonthRoster.league_4.sport_league.id]}
            isInactive={0 === currentMonthRoster.league_4.sport_league.active}
              test={test}
              teamInfo={currentMonthRoster.league_4}
              selectedSlot={selectedSlot}
              slotName={currentOrganization.league_4.name}
              leagueName="league_4"
            />
          ) : null}
          {Array.from(Array(currentOrganization.flex_spots)).map((x, i) => (
            <RosterSlot
            isLocked={roflMonth <= isActiveTable[currentMonthRoster[`flex_${i + 1}`].sport_league.id]}
            isInactive={0 === currentMonthRoster[`flex_${i + 1}`].sport_league.active}
              test={test}
              teamInfo={currentMonthRoster[`flex_${i + 1}`]}
              selectedSlot={selectedSlot}
              slotName={`FLEX`}
              leagueName={`flex_${i + 1}`}
            />
          ))}
          {Array.from(Array(currentOrganization.bench_spots)).map((x, i) => (
            <RosterSlot
            isLocked={roflMonth <= isActiveTable[currentMonthRoster[`bench_${i + 1}`].sport_league.id]}
            isInactive={0 === currentMonthRoster[`bench_${i + 1}`].sport_league.active}
              test={test}
              teamInfo={currentMonthRoster[`bench_${i + 1}`]}
              selectedSlot={selectedSlot}
              slotName={`BENCH`}
              leagueName={`bench_${i + 1}`}
            />
          ))}
          {areRostersEqual ? null : (
            <BannerMessage>
              You have unsaved changes
              <button onClick={handleSubmit}>Submit</button>
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
