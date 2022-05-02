import React, { useEffect } from "react";
import styled from "styled-components";
import { Redirect, Route, Switch } from "react-router-dom";
import useApi from "../hooks/useApi";
import { useDispatch } from "react-redux";

import SideBar from "./Sidebar";
import TopBar from "./TopBar";

import MySquad from "../containers/MySquad";
import Dashboard from "../containers/Dashboard";
import Roster from "../containers/Roster";
import RoflLeague from "../containers/RoflLeague";
import Scoring from '../containers/Scoring'

import Settings from "../containers/Settings";

import Loading from '../components/Loading'


const Container = styled.div`
  display: flex;
`;

function App(props) {
  const dispatch = useDispatch();
  const { makeRequest, isLoading } = useApi();

  const getActiveMonths = async () => {
    const res = await makeRequest({
      method: "get",
      route: `/sports/active`
    });
    console.log('here is active years from active months get')
    console.log(JSON.parse(res.body).activeYears)
    dispatch({
      type: "SET_ACTIVE_YEARS_AND_MONTHS",
      payload: {
        activeYears: JSON.parse(res.body).activeYears,
        currentDate: JSON.parse(res.body).currentDate
      }
    });
  };

  useEffect(() => {
    getActiveMonths();
  }, []);

  return isLoading ? (
    <Loading/>
  ) : (
    <Container>
      <SideBar />
      <TopBar />
      <Switch>
        <Route exact path="/">
          <Redirect to="/squad" />
        </Route>
        <Route exact path="/squad" component={MySquad} />
        {/* <Route exact path="/dashboard" component={Dashboard}/> */}
        {/* <Route exact path="/rosters" component={Roster} /> */}
        <Route path="/rofleague" component={RoflLeague} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/scoring" component={Scoring}/>
        
        {/* <Route exact path="/transactions" component={Transactions}/> */}
      </Switch>
    </Container>
  );
}

export default App;
