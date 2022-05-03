import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { useSelector, useDispatch } from "react-redux";
import MonthTicker from "../../components/MonthTicker";
import ScoringTable from "./ScoringTable";
import Scheme from "./Scheme";

const Container = styled.div`
  margin-top: 40px;
`;

const LeagueSelector = styled.div`
  display: flex;
  flex-direction: row;
`;

const SchemeOrScore = styled.div`
  display: flex;
  flex-direction: row;
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

  const { makeRequest } = useApi();

  const [scores, setScores] = useState(null);
  const [roflMonth, setRoflMonth] = useState(1);
  const [league, setLeague] = useState(1);
  const [finalMonthForDisplay, setFinalMonthForDisplay] = useState(null);
  const [showScheme, setShowScheme] = useState(false);
  const [teams, setTeams] = useState(null)

//   TODO somehow there is a memory leak here only when loading this page directly
//   not sure why. look into fixing it. maybe with cleanup?
  useEffect(() => {
    fetchTeams();
    fetchScores();
  }, []);

  const calculateMonthsToDisplay = (records) => {
    const allMonths = [];
    Object.keys(records).forEach((leagueId) => {
      Object.keys(records[leagueId]).forEach((monthKey) => {
        allMonths.push(Number(monthKey.split("-")[0]));
      });
    });
    setFinalMonthForDisplay(Math.max(...allMonths));
  };

  const fetchScores = async () => {
    var res = await makeRequest({
      method: "get",
      route: `/sports/scores/${currentOrganization.id}/${2022}`
    });
    if (res.statusCode === 200) {
      const scores = JSON.parse(res.body);
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
    const response = JSON.parse(res.body)
    const table = {}
    response.forEach(team => {
        table[team.id] = {...team}
    })
    return table
}

  return (
    <Container>
      {scores && teams ? (
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
          <SchemeOrScore>
            <ScItem
              selected={!showScheme}
              onClick={() => setShowScheme(!showScheme)}
            >
              Score
            </ScItem>
            <ScItem
              selected={showScheme}
              onClick={() => setShowScheme(!showScheme)}
            >
              Scheme
            </ScItem>
          </SchemeOrScore>
          {showScheme ? (
            <Scheme scheme={scores.scheme[league]} league={league}/>
          ) : (
            <>
              <MonthTicker
                roflMonth={roflMonth}
                setRoflMonth={setRoflMonth}
                selectedRoflYear={2022}
                finalMonthForDisplay={finalMonthForDisplay}
              />
              <ScoringTable
                league={league}
                roflMonth={roflMonth}
                scores={scores}
                roflYear={2022}
                teams={teams}
              />
            </>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
}

export default Scoring;
