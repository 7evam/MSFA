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
import { lightBlue } from "../../constants/style";

const Container = styled.div`
  margin-top: 40px;
`;

const LeagueSelector = styled.div`
  display: flex;
  flex-direction: row;
  width: 700px;
  justify-content: space-evenly;
  background-color: ${lightBlue};
  height: 30px;
  align-items: center;
`;

const DisplaySelector = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  background-color: #FFCCCB;
  height: 30px;
  align-items: center;
  width: 700px;
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
  const [roflMonth, setRoflMonth] = useState(1);
  const [league, setLeague] = useState(null);
  const [finalMonthForDisplay, setFinalMonthForDisplay] = useState(null);
  const [display, setDisplay] = useState('score');
  const [teams, setTeams] = useState(null)
  const [firstMonthForDisplay, setFirstMonthForDisplay] = useState(null)
  const [loading, setLoading] = useState(false)
  const [hydrating, setHydrating] = useState(true)

  const hydrateGlobalState = async () => {
    setHydrating(true)
    // hydrate redux data that isn't already loaded
    const abortController = new AbortController();
    if (!sportTeams) {
      hydrateSportTeams(abortController);
    }
    if(!activeYears){
      hydrateActiveYears(abortController)
    }
    setHydrating(false)
    return () => abortController.abort();
  }

  const loadPageState = async () => {
        setLoading(true)
        // calculate starting league
        let activeLeagueArray = Object.keys(activeYears[2022])
        let startingActiveLeague = Math.min(...activeLeagueArray)
        setLeague(startingActiveLeague)
        // fetch page specific data
        await fetchScores();
        await fetchTeams();
        setLoading(false)
  }
    
  useEffect(() => {
    hydrateGlobalState()
  }, []);

  useEffect(() => {
    console.log('in load state use effect')
    console.log(activeYears)
    console.log(sportTeams)
    console.log(hydrating)
    if(activeYears && !hydrating){
      loadPageState()
    }
  }, [hydrating]);

  useEffect(() => {
    if(league && activeYears && startingMonths && roflMonth && playoffMonths){
      let newFinalMonth = activeYears[2022][league] ? activeYears[2022][league].roflMonth : playoffMonths[2022][league]
      console.log('new final month')
      console.log(newFinalMonth)
      console.log(league)
      let newStartingMonth = startingMonths[2022][league]
      let newCurrentMonth = (roflMonth > newStartingMonth) && (roflMonth < newFinalMonth) ? roflMonth : newFinalMonth
      setFinalMonthForDisplay(newFinalMonth)
      setFirstMonthForDisplay(newStartingMonth)
      setRoflMonth(newCurrentMonth)
      console.log('new current month')
      console.log(newCurrentMonth)
    }
  }, [league]);

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
      {(loading || hydrating) && <Loading/>}
      {(!loading || !hydrating) && scores && sportTeams && teams && activeYears && (
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
        )
        }
        {(!loading || !hydrating) && !scores && <p>Error loading data</p>}
    </Container>
  );
}

export default Scoring;
