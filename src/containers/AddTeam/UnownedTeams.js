import React, { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import '@fontsource/open-sans';
import { toast } from 'react-toastify';
import useApi from '../../hooks/useApi';
import RosterComponent from '../../components/Roster';
import Loading from '../../components/Loading';
import useHydration from '../../hooks/useHydration';
import {
  Section,
  Select,
  Label,
  Headline,
  Container,
  League,
  slotData,
  SlotRow,
  Th,
  TitleRow,
  Td,
  Table,
  CashContainer,
} from './components';
import useAddTeam from './useAddTeam';
import { convertRealToRofl, convertDateObjToReadable } from '../../utils';
import { lightBlue, mobileBreakPoint } from '../../constants/style';

const LeagueSelector = styled.div`
  display: flex;
  flex-direction: row;
  width: 700px;
  justify-content: space-evenly;
  background-color: ${lightBlue};
  height: 30px;
  align-items: center;
  @media (max-width: ${mobileBreakPoint}){
    width: 100vw;
  }
`;

const TopText = styled.p`
  padding: 10px;
  width: 85%;
  font-size: px;
  text-align: center;
`;

const ScoringContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    width: 100%;
    margin-top: 15px;
    border: 2px solid #E5EAF4;
    width: 90%;
    border-radius: 10px;
    & div:nth-child(4n+5),
    & div:nth-child(4n+6) {
      background-color: #F7FBFF;
    }
  }
`;



const ActionButton = styled.button`
    height: 120%;
    width: 80%;
    z-index: 100;
    display: inline-block;
    outline: none;
    cursor: pointer;
    font-weight: 500;
    padding: 0 16px;
    margin-left: 8px;
    border-radius: 4px;
    color: white;
    background: ${(props) => (props.selectedSlot && props.selectedSlot === props.leagueKey
    ? '#4E871F'
    : '#17288F')};
    line-height: 1.15;
    font-size: 14px;
    letter-spacing: .08em;
    text-decoration: none;
    text-transform: uppercase;
    border: none;
    text-align: center;
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
    transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
    :hover {
        background: #4E871F;
        box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
    }
    @media (max-width: ${mobileBreakPoint}){
        width: 80px;
        height: 20px;
       }
`;

const Cell = styled.div`
    padding: 16px;
    padding-right: 0px;
    border-bottom: ${(props) => (props.isLastInList ? null : '2px solid #E5EAF4')}; 
    background-color: ${(props) => (props.colored ? '#F7FBFF' : 'white')};
    &:hover{
        text-decoration: ${(props) => (props.teamName ? 'underline' : null)}; 
        cursor: ${(props) => (props.teamName ? 'pointer' : null)}; 
    }
    @media (min-width: ${mobileBreakPoint}){
        ${(props) => !props.firstItem && `
            &:before {
                content: "";
                right: 0;
                z-index: 100;
                top: 0;
                height: 50%; 
                border-right: 2px solid #E5EAF4;
                margin-right: 8px;
            }
        `}
    }
    
    @media (max-width: ${mobileBreakPoint}){
        font-size: 14px;
    }
`;

const HeaderLabel = styled.div`
    padding: 16px 0px 8px 16px;
    text-align:center;
    background-color: #F7FBFF;
    font-weight: 800;
    font-size: 14px;
    &:hover{
      cursor: pointer;
      text-decoration: underline;
  }
    @media (max-width: ${mobileBreakPoint}){
      font-size: 10px;
      padding-right: 16px;
     }
`;

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
    // create archive view. isArchived should be calculated in useAddTeam hook

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
                  <Cell>{getUnownedActionButton(league, team)}</Cell>
                </Fragment>
              ))
            }
          </ScoringContainer>
        </Container>
      ) : <Loading />
  );
}

export default UnownedTeams;
