import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { useSelector, useDispatch } from "react-redux";
import MonthTicker from "../../components/MonthTicker";
import ScoringTable from "./ScoringTable";
import RecordsTable from "./RecordsTable";
import Scheme from "./Scheme";
import useHydration from "../../hooks/useHydration";
import Loading from "../../components/Loading";

import {
  Container,
  LeagueSelector,
  DisplaySelector,
  ScItem,
  League
} from "./components";

function Scoring(props) {
  const { organizations, currentOrganization } = useSelector((state) => ({
    ...state.authReducer
  }));

  const {
    activeYears,
    startingMonths,
    playoffMonths,
    sportTeams
  } = useSelector((state) => ({
    ...state.sportReducer
  }));

  const { makeRequest } = useApi();

  const { hydrateSportTeams, hydrateActiveYears } = useHydration();

  const [scores, setScores] = useState(null);
  const [roflMonth, setRoflMonth] = useState(null);
  const [league, setLeague] = useState(null);
  const [finalMonthForDisplay, setFinalMonthForDisplay] = useState(null);
  const [display, setDisplay] = useState("score");
  const [firstMonthForDisplay, setFirstMonthForDisplay] = useState(null);
  const [readyToRender, setReadyToRender] = useState(false);
  const [renderCount, setRenderCount] = useState(0);

  // --use effects for initial render--

  // this function runs on page load and makes all api requests
  useEffect(() => {
    const abortController = new AbortController();

    makeInitialRequests(abortController);

    return () => abortController.abort();
  }, []);

  // when all api requests have been made, update state derrived from api calls
  useEffect(() => {
    if (scores && activeYears && !readyToRender) {
      let activeLeagueArray = Object.keys(activeYears[2022]);
      let startingActiveLeague = Math.min(...activeLeagueArray);
      setLeague(startingActiveLeague);
      setDisplayMonthRange(startingActiveLeague);
    }
  }, [scores, league, finalMonthForDisplay, firstMonthForDisplay]);

  // if all derrived state has been set, the app must be ready to render
  useEffect(() => {
    if (
      firstMonthForDisplay &&
      finalMonthForDisplay &&
      league &&
      scores &&
      sportTeams &&
      !readyToRender
    ) {
      setReadyToRender(true);
    }
  }, [finalMonthForDisplay, firstMonthForDisplay, league, scores, sportTeams]);

  // initial requests functiioin
  const makeInitialRequests = async (abortController) => {
    // if (!sportTeams) {
    //   await hydrateSportTeams(abortController);
    // }
    // if(!activeYears){
    //   await hydrateActiveYears(abortController)
    // }

    await Promise.all([
      fetchScores(abortController),
      hydrateSportTeams(abortController),
      hydrateActiveYears(abortController)
    ]);
  };

  //  --post initial render use effect--

  //  change data on league change
  useEffect(() => {
    if (league && readyToRender) {
      setDisplayMonthRange(league);
    }
  }, [league]);

  // find the current, first and last rofl month for display
  const setDisplayMonthRange = (league) => {
    let newFinalMonth = activeYears[2022][league]
      ? activeYears[2022][league].roflMonth
      : playoffMonths[2022][league];
    let newStartingMonth = startingMonths[2022][league];
    let newCurrentMonth =
      roflMonth > newStartingMonth && roflMonth < newFinalMonth
        ? roflMonth
        : newFinalMonth;
    setFinalMonthForDisplay(newFinalMonth);
    setFirstMonthForDisplay(newStartingMonth);
    setRoflMonth(newCurrentMonth);
  };

  const calculateMonthsToDisplay = (records) => {
    const allMonths = [];
    Object.keys(records).forEach((leagueId) => {
      Object.keys(records[leagueId]).forEach((monthKey) => {
        allMonths.push(Number(monthKey.split("-")[0]));
      });
    });
    setFinalMonthForDisplay(Math.max(...allMonths));
    setFirstMonthForDisplay(startingMonths[2022][league]);
  };

  const fetchScores = async (abortController) => {
    var res = await makeRequest({
      method: "get",
      route: `/sports/scores/${currentOrganization.id}/${2022}`,
      abort: abortController
    });
    if (res.statusCode === 200) {
      const scores = res.body;
      calculateMonthsToDisplay(scores.records);
      setScores(scores);
    }
  };

  return (
    <Container>
      {readyToRender ? (
        <div>
          <LeagueSelector>
            <League selected={league == 1} onClick={() => setLeague(1)}>
              MLB
            </League>
            <League selected={league == 2} onClick={() => setLeague(2)}>
              NFL
            </League>
            <League selected={league == 3} onClick={() => setLeague(3)}>
              NHL
            </League>
            <League selected={league == 4} onClick={() => setLeague(4)}>
              NBA
            </League>
          </LeagueSelector>
          <DisplaySelector>
            <ScItem
              selected={display === "score"}
              onClick={() => setDisplay("score")}
            >
              Score
            </ScItem>
            <ScItem
              selected={display === "records"}
              onClick={() => setDisplay("records")}
            >
              Records
            </ScItem>
            <ScItem
              selected={display === "scheme"}
              onClick={() => setDisplay("scheme")}
            >
              Scheme
            </ScItem>
          </DisplaySelector>
          {display === "scheme" ? (
            <Scheme scheme={scores.scheme[league]} league={league} />
          ) : null}
          {display === "score" ? (
            scores.records[league] ? (
              <>
                <MonthTicker
                  roflMonth={roflMonth}
                  setRoflMonth={setRoflMonth}
                  selectedRoflYear={2022}
                  finalMonthForDisplay={finalMonthForDisplay}
                  firstMonthForDisplay={firstMonthForDisplay}
                />
                <ScoringTable
                  league={league}
                  roflMonth={roflMonth}
                  scores={scores}
                  roflYear={2022}
                  sportTeams={sportTeams}
                />
              </>
            ) : (
              <p>This League is not active</p>
            )
          ) : null}
          {display === "records" ? (
            scores.records[league] ? (
              <>
                <MonthTicker
                  roflMonth={roflMonth}
                  setRoflMonth={setRoflMonth}
                  selectedRoflYear={2022}
                  finalMonthForDisplay={finalMonthForDisplay}
                  firstMonthForDisplay={firstMonthForDisplay}
                />
                <RecordsTable
                  league={league}
                  roflMonth={roflMonth}
                  scores={scores}
                  roflYear={2022}
                  sportTeams={sportTeams}
                  playoffs={playoffMonths[2022][league] == roflMonth}
                />
              </>
            ) : (
              <p>This League is not active</p>
            )
          ) : null}
        </div>
      ) : (
        <Loading />
      )}
    </Container>
  );
}

export default Scoring;
