import React, {useEffect} from 'react';
import styled from 'styled-components';
import {Redirect, Route, Switch} from 'react-router-dom';
import useApi from '../hooks/useApi'

import SideBar from './Sidebar'

import Dashboard from '../containers/Dashboard'
import Roster from '../containers/Roster'
import { useDispatch } from 'react-redux';

const Container =  styled.div`
    display: flex;
    flex-direction: row;
`

function App(props) {

  const dispatch = useDispatch()
  const {makeRequest, isLoading} =  useApi()

  const getActiveMonths = async () => {
    const res = await makeRequest({
      method: "get",
      route: `/sports/active`
    })
    dispatch({
      type: "SET_ACTIVE_YEARS_AND_MONTHS",
      payload: {
        activeYears: JSON.parse(res.body)
      }
    });
  }

  useEffect(() => {
    getActiveMonths()
  }, []);

  return (
    isLoading ?
    <p>loading...</p>
    :
    <Container>
        <SideBar/>
            <Switch>
                <Route exact path="/">
                  <Redirect to="/dashboard" />
                </Route>
                <Route exact path="/dashboard" component={Dashboard}/>
                <Route exact path="/roster" component={Roster}/>
                {/* <Route exact path="/standings" component={Standings}/>
                <Route exact path="/transactions" component={Transactions}/> */}
              </Switch>
    </Container>
  )
}

export default App
