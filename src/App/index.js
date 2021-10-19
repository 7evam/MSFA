import React from 'react';
import styled from 'styled-components';
import {Redirect, Route, Switch} from 'react-router-dom';

import SideBar from './Sidebar'

import Dashboard from '../containers/Dashboard'
import Roster from '../containers/Roster'

const Container =  styled.div`
    display: flex;
    flex-direction: row;
`

function App(props) {

  return (
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
