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
import Standings from "../containers/Standings";
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
        <Route exact path="/roster" component={Roster} />
        <Route exact path="/standings" component={Standings} />
        {/* <Route exact path="/transactions" component={Transactions}/> */}
      </Switch>
    </Container>
  );
}

export default App;
