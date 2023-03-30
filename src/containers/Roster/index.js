import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import useRoster from './useRoster';
import { convertMonthToReadable } from '../../utils';
import RosterSlot from './RosterSlot';
import {
  Container,
  Slot,
  SelectButton,
  BannerMessage,
  MonthButton,
  ScrollMenuContainer,
  ScrollMenu,
  ScrollMenuLink,
  ScrollMenuButton,
} from './components';
import Loading from '../../components/Loading';

function Roster(props) {
  const {
    selectedYear,
    roflMonth,
    roster,
    currentOrganization,
    test,
    selectedSlot,
    areRostersEqual,
    setRoflMonth,
    handleSubmit,
    activeRoflMonths,
  } = useRoster();

  const { activeYears } = useSelector((state) => ({
    ...state.sportReducer,
  }));

  const isActiveTable = {};

  activeRoflMonths
    && selectedYear
    && activeRoflMonths[selectedYear].forEach((month) => {
      isActiveTable[month.leagueId] = month.roflMonth;
    });

  const [appliedScroll, setAppliedScroll] = useState(false);

  const currentMonthRoster = roster
    ? roster[`${roflMonth}-${selectedYear}`]
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
      { number: 14, month: `May ${year + 1}` },
    ];
  };

  const SlotContent = (leagueInfo, leagueName) => {
    <Slot>
      {leagueInfo.name}
      :
      {leagueInfo.city}
      {' '}
      {leagueInfo.name}
      {' '}
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

      {roster && currentOrganization && selectedYear ? (
        <div>
          <p>
            year:
            {selectedYear}
          </p>

          <ScrollMenuContainer>
            <ScrollMenuButton onClick={scrollLeft}>{'<'}</ScrollMenuButton>
            <ScrollMenu ref={scrollRef}>
              {monthsForScroll(selectedYear).map((item) => (
                <ScrollMenuLink
                  selected={item.number === roflMonth}
                  key={item.number}
                  onClick={() => setRoflMonth(item.number)}
                >
                  {item.month}
                </ScrollMenuLink>
              ))}
            </ScrollMenu>
            <ScrollMenuButton onClick={scrollRight}>{'>'}</ScrollMenuButton>
          </ScrollMenuContainer>

          <p>
            month:
            {roflMonth}
          </p>
          <RosterSlot
            isLocked={
              roflMonth
              <= isActiveTable[currentMonthRoster.league_1.sport_league.id]
            }
            isInactive={currentMonthRoster.league_1.sport_league.active === 0}
            test={test}
            teamInfo={currentMonthRoster.league_1}
            selectedSlot={selectedSlot}
            slotName={currentOrganization.league_1.name}
            leagueName="league_1"
          />
          <RosterSlot
            isLocked={
              roflMonth
              <= isActiveTable[currentMonthRoster.league_2.sport_league.id]
            }
            isInactive={currentMonthRoster.league_2.sport_league.active === 0}
            table={isActiveTable}
            test={test}
            teamInfo={currentMonthRoster.league_2}
            selectedSlot={selectedSlot}
            slotName={currentOrganization.league_2.name}
            leagueName="league_2"
          />
          {currentOrganization.league_3 ? (
            <RosterSlot
              isLocked={
                roflMonth
                <= isActiveTable[currentMonthRoster.league_3.sport_league.id]
              }
              isInactive={currentMonthRoster.league_3.sport_league.active === 0}
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
              isLocked={
                roflMonth
                <= isActiveTable[currentMonthRoster.league_4.sport_league.id]
              }
              isInactive={currentMonthRoster.league_4.sport_league.active === 0}
              test={test}
              teamInfo={currentMonthRoster.league_4}
              selectedSlot={selectedSlot}
              slotName={currentOrganization.league_4.name}
              leagueName="league_4"
            />
          ) : null}
          {Array.from(Array(currentOrganization.flex_spots)).map((x, i) => (
            <RosterSlot
              isLocked={
                roflMonth
                <= isActiveTable[
                  currentMonthRoster[`flex_${i + 1}`].sport_league.id
                ]
              }
              isInactive={
                currentMonthRoster[`flex_${i + 1}`].sport_league.active === 0
              }
              test={test}
              teamInfo={currentMonthRoster[`flex_${i + 1}`]}
              selectedSlot={selectedSlot}
              slotName="FLEX"
              leagueName={`flex_${i + 1}`}
            />
          ))}
          {Array.from(Array(currentOrganization.bench_spots)).map((x, i) => (
            <RosterSlot
              isLocked={
                roflMonth
                <= isActiveTable[
                  currentMonthRoster[`bench_${i + 1}`].sport_league.id
                ]
              }
              isInactive={
                currentMonthRoster[`bench_${i + 1}`].sport_league.active === 0
              }
              test={test}
              teamInfo={currentMonthRoster[`bench_${i + 1}`]}
              selectedSlot={selectedSlot}
              slotName="BENCH"
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
        <Loading />
      )}
    </Container>
  );
}

export default Roster;
