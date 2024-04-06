import React, { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import '@fontsource/open-sans';
import { toast } from 'react-toastify';
import useApi from '../../../hooks/useApi';
import RosterComponent from '../../../components/Roster';
import Loading from '../../../components/Loading';
import useHydration from '../../../hooks/useHydration';
import {
  Container,
  League,
} from '../components';
import { convertRealToRofl, convertDateObjToReadable } from '../../../utils';
import { lightBlue, mobileBreakPoint } from '../../../constants/style';
import { HeaderLabel, Cell, ActionButton, TopText, ScoringContainer, LeagueSelector } from "./components";

function UnownedTeams({
  league,
  setLeague,
  unownedTeams,
  handleClaim,
  handleAdd,
  handleAction,
  firstLeagueToShow,
  firstActiveMonthForClaim,
  isArchived,
  waiverExceptions,
}) {
  const {
    activeYears, currentDate, sportTeams, deadlines, selectedYear,
  } = useSelector((state) => ({
    ...state.sportReducer,
  }));

  const [readyToRender, setReadyToRender] = useState(false);

  useEffect(() => {
    if (unownedTeams && league && firstLeagueToShow && firstActiveMonthForClaim) {
      setReadyToRender(true);
    }
  }, [unownedTeams, league, firstLeagueToShow, firstActiveMonthForClaim]);

  const calculateDeadline = (year, league) => {
    // PROBLEM there is no deadline for month 14 (nfl and nba playoff month) so this errors
    // create archive view. isArchived should be calculated in useTransactions hook

    // get rofl month of active year or if leaguee isnt active yet ccalculate rofl year
    const roflMonth = activeYears[year][league]?.roflMonth ? activeYears[year][league]?.roflMonth : currentDate.realMonth - 3;
    // safeguard to preevent error if archived year is rendered
    if (!deadlines[year][league][roflMonth]) return 0;

    return deadlines[year][league][roflMonth].deadline;
  };

  const deadline = calculateDeadline(selectedYear, league);
  const today = new Date();
  const waiverPeriodEnded = new Date(deadline) < today;

  // const deadline = activeYears[selectedYear][league]
  //   ? deadlines[selectedYear][league][activeYears[selectedYear][league].roflMonth].deadline
  //   : deadlines[selectedYear][league][currentDate.realMonth - 4].deadline;

  const getUnownedActionButton = (leagueId, team) => {
    // return claim if 3 days before end of real month or season start, add otherwise
    const claim = (
      <ActionButton onClick={() => handleClaim(team)}>Claim</ActionButton>
    );

    const add = (
      <ActionButton onClick={() => handleAdd(team)}>Add</ActionButton>
    );

    return claim

    if (waiverExceptions.includes(Number(team))) return claim;
    if (!activeYears[selectedYear][leagueId]) return claim;
    const currentRoflMonth = activeYears[selectedYear][leagueId].roflMonth;
    if (
      currentDate.date < calculateDeadline(selectedYear, league)
    ) {
      return claim;
    }
    return add;
  };

  return (
    readyToRender
      ? (
        <Container>
          <LeagueSelector>
            {firstLeagueToShow === 1 ? (
              <League selected={league === 1} onClick={() => setLeague(1)}>
                MLB
              </League>
            ) : null}
            {firstLeagueToShow <= 2 ? (
              <League selected={league === 2} onClick={() => setLeague(2)}>
                NFL
              </League>
            ) : null}

            <League selected={league === 3} onClick={() => setLeague(3)}>
              NHL
            </League>
            <League selected={league === 4} onClick={() => setLeague(4)}>
              NBA
            </League>
          </LeagueSelector>
          <p>
            Waiver period
            {' '}
            {waiverPeriodEnded ? 'ended' : 'ends'}
            {' '}
            {convertDateObjToReadable(deadline)}
            {' '}
            at 4 am EST
          </p>
          <TopText>
            {waiverPeriodEnded ? 'Adding a team from this league will immediately add it to your current roster and it '
              : 'Placing a bid on a team from this league will queue it for processing on the waiver deadline and, if you win, the team '}
            will be available starting MSFA month
            {' '}
            {firstActiveMonthForClaim}
          </TopText>
          <TopText>
            {
              waiverExceptions && waiverExceptions.length
                ? 'Any teams that were dropped during the recently ended wavier period are now available to claim on waivers. You may press "claim" to place a bid for these teams'
                : null
            }
          </TopText>
          <ScoringContainer>
            <HeaderLabel>Team</HeaderLabel>
            <HeaderLabel>Action</HeaderLabel>
            {

              unownedTeams[league].map((team) => (
                <Fragment>
                  <Cell firstItem>
                    {sportTeams[league][team].city}
                    {' '}
                    {sportTeams[league][team].name}
                  </Cell>
                  <Cell hasButton>{getUnownedActionButton(league, team)}</Cell>
                </Fragment>
              ))
            }
          </ScoringContainer>
        </Container>
      ) : <Loading />
  );
}

export default UnownedTeams;
