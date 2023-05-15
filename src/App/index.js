import React, { useEffect, lazy, Suspense } from 'react';
import styled from 'styled-components';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useApi from '../hooks/useApi';

import SideBar from './Sidebar';
import TopBar from './TopBar';

import MySquad from '../containers/MySquad';
import Dashboard from '../containers/Dashboard';
import Roster from '../containers/Roster';
import AddTeam from '../containers/AddTeam';
import RoflLeague from '../containers/RoflLeague';
import Scoring from '../containers/Scoring';

import Loading from '../components/Loading';

import RenderModal from './RenderModal';

import { Container, ContentContainer } from './components';
// import Settings from '../containers/Settings'

const Settings = lazy(() => import('../containers/Settings'));

function App(props) {
  const dispatch = useDispatch();

  const { makeRequest, isLoading } = useApi();

  const { currentOrganization, userToken } = useSelector((state) => ({
    ...state.authReducer,
  }));

  const getActiveMonths = async () => {
    const res = await makeRequest({
      method: 'get',
      route: '/sports/active',
    });

    const parsedRes = res.body;

    dispatch({
      type: 'SET_ACTIVE_YEARS_AND_MONTHS',
      payload: {
        activeYears: parsedRes.activeYears,
        currentDate: parsedRes.currentDate,
      },
    });
  };

  useEffect(() => {
    getActiveMonths();
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <Container>
      {/* <SideBar /> */}
      <TopBar />
      <ContentContainer>
        <Switch>
          <Suspense fallback={<Loading />}>
            <Route exact path="/">
              <Redirect to="/squad" />
            </Route>
            <Route exact path="/squad" component={MySquad} />
            {/* <Route exact path="/dashboard" component={Dashboard}/> */}
            {/* <Route exact path="/rosters" component={Roster} /> */}
            <Route path="/rofleague" component={RoflLeague} />
            <Route exact path="/settings" component={Settings} />
            <Route exact path="/scoring" component={Scoring} />

            <Route exact path="/add-team" component={AddTeam} />
          </Suspense>
        </Switch>
      </ContentContainer>
      <RenderModal />
    </Container>
  );
}

export default App;
