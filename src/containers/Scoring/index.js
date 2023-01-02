import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { useSelector, useDispatch } from "react-redux";
import MonthTicker from "../../components/MonthTicker";
import ScoringTable from "./ScoringTable";
import RecordsTable from "./RecordsTable";
import ScoringTableNew from "./ScoringTableNew";
import RecordsTableNew from "./RecordsTableNew";
import Scheme from "./Scheme";
import SchemeNew from './SchemeNew'
import useHydration from "../../hooks/useHydration";
import Loading from "../../components/Loading";
import { lightBlue, mobileBreakPoint } from "../../constants/style";

// const Container = styled.div`
//   margin-top: 40px;
// `;

const Container = styled.div`
margin-top: 20px;
@media (max-width: ${mobileBreakPoint}){
    width: 100vw;
  }
`;

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

const DisplaySelector = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  background-color: #FFCCCB;
  height: 30px;
  align-items: center;
  width: 700px;
  @media (max-width: ${mobileBreakPoint}){
    width: 100vw;
  }
`;

const ScItem = styled.p`
  margin-right: 10px;
  &:hover {
    font-weight: 700;
    text-decoration: underline;
    cursor: pointer;
  }
  font-weight: ${(props) => (props.selected ? "700" : "400")};
`;

const League = styled.p`
  margin-right: 10px;
  &:hover {
    font-weight: 700;
    text-decoration: underline;
    cursor: pointer;
  }
  font-weight: ${(props) => (props.selected ? "700" : "400")};
`;

function Scoring(props) {
  const { organizations, currentOrganization } = useSelector((state) => ({
    ...state.authReducer
  }));

  const {activeYears, startingMonths, playoffMonths, sportTeams} = useSelector((state) => ({
    ...state.sportReducer
  }))

  const { makeRequest } = useApi();

  const {hydrateSportTeams, hydrateActiveYears} = useHydration()

  const [scores, setScores] = useState(null);
  const [roflMonth, setRoflMonth] = useState(null);
  const [league, setLeague] = useState(null);
  const [finalMonthForDisplay, setFinalMonthForDisplay] = useState(null);
  const [display, setDisplay] = useState('score');
  const [teams, setTeams] = useState(null)
  const [firstMonthForDisplay, setFirstMonthForDisplay] = useState(null)
  const [loading, setLoading] = useState(true)
  const [hydrated, setHydrated] = useState(false)

  const hydrateGlobalState = async () => {
    // hydrate redux data that isn't already loaded
    const abortController = new AbortController();
    if (!sportTeams) {
      await hydrateSportTeams(abortController);
    }
    if(!activeYears){
      await hydrateActiveYears(abortController)
    }
    setHydrated(true)
    return () => abortController.abort();
  }

  const loadPageState = async () => {
        // calculate starting league
        let activeLeagueArray = Object.keys(activeYears[2022])
        let startingActiveLeague = Math.min(...activeLeagueArray)
        setLeague(startingActiveLeague)
        
        // fetch page specific data
        await fetchScores();
        await fetchTeams();
        setDisplayMonthRange(startingActiveLeague)
        setLoading(false)
  }
  
  // ---- START TWO PART useEffect ----
  useEffect(() => {
    // on page load, load global state
    setLoading(true)
    hydrateGlobalState()
  }, []);

  useEffect(() => {
    // this loads page state after global state has been loaded
    if(hydrated){
      loadPageState()
    }
  }, [hydrated]);
    // ---- END TWO PART useEffect ----

  useEffect(() => {
    
    if(league && hydrated && !loading){
      setDisplayMonthRange(league)
    }
  }, [league]);

  const setDisplayMonthRange = (league) => {
    let newFinalMonth = activeYears[2022][league] ? activeYears[2022][league].roflMonth : playoffMonths[2022][league]
    let newStartingMonth = startingMonths[2022][league]
    let newCurrentMonth = (roflMonth > newStartingMonth) && (roflMonth < newFinalMonth) ? roflMonth : newFinalMonth
    setFinalMonthForDisplay(newFinalMonth)
    setFirstMonthForDisplay(newStartingMonth)
    setRoflMonth(newCurrentMonth)
  }

  const calculateMonthsToDisplay = (records) => {
    const allMonths = [];
    Object.keys(records).forEach((leagueId) => {
      Object.keys(records[leagueId]).forEach((monthKey) => {
        allMonths.push(Number(monthKey.split("-")[0]));
      });
    });
    setFinalMonthForDisplay(Math.max(...allMonths));
    setFirstMonthForDisplay(startingMonths[2022][league])
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

  const fetchTeams = async () => {
      const leagueIds = [1,2,3,4]
      const teams = {}
      for(let id of leagueIds){
          teams[id] = await getTeamsByLeagueId(id)
      }
      setTeams(teams)
  }

  const getTeamsByLeagueId = async(leagueId) => {
    var res = await makeRequest({
        method: 'get',
        route: `/sports/teams/${leagueId}`
    })
    const response = res.body
    const table = {}
    response.forEach(team => {
        table[team.id] = {...team}
    })
    return table
}

  return (
    <Container>
      {loading ? <Loading/> : (firstMonthForDisplay) ?
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
              selected={display==='score'}
              onClick={() => setDisplay('score')}
            >
              Score
            </ScItem>
            <ScItem
              selected={display==='records'}
              onClick={() => setDisplay('records')}
            >
              Records
            </ScItem>
            <ScItem
              selected={display==='scheme'}
              onClick={() => setDisplay('scheme')}
            >
              Scheme
            </ScItem>
          </DisplaySelector>
          {display === 'scheme' ? <Scheme scheme={scores.scheme[league]} league={league}/> : null}
          {display === 'score' ? 
          scores.records[league] ? <>
              <MonthTicker
                roflMonth={roflMonth}
                setRoflMonth={setRoflMonth}
                selectedRoflYear={2022}
                finalMonthForDisplay={finalMonthForDisplay}
                firstMonthForDisplay={firstMonthForDisplay}
              />
              <ScoringTableNew
                league={league}
                roflMonth={roflMonth}
                scores={scores}
                roflYear={2022}
                teams={teams}
                sportTeams={sportTeams}
              />
            </> : <p>This League is not active</p> : null}
            {display === 'records' ? 
            scores.records[league] ? 
            <>
            <MonthTicker
                roflMonth={roflMonth}
                setRoflMonth={setRoflMonth}
                selectedRoflYear={2022}
                finalMonthForDisplay={finalMonthForDisplay}
                firstMonthForDisplay={firstMonthForDisplay}
              />
              <RecordsTableNew
                league={league}
                roflMonth={roflMonth}
                scores={scores}
                roflYear={2022}
                teams={teams}
                sportTeams={sportTeams}
                playoffs={playoffMonths[2022][league]==roflMonth}
              />
              </>
              : 
              <p>This League is not active</p>
            :
            null}
        </div>
         : (<p>Error loading data</p>)}
    </Container>
  );
}

export default Scoring;
