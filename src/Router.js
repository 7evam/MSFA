import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

import App from './App'
import Landing from './containers/Landing'
import CreateNewLeague from './containers/CreateNewLeague'

import { Redirect, BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';

import Loading from './components/Loading';

// configuration for toaster messages
// https://www.npmjs.com/package/react-toastify

toast.configure({
  autoClose: 3000,
  hideProgressBar: true,
});

function Router(){

  const { userToken } = useSelector(state => ({
    ...state.authReducer
  }));

  return (
    <>
    {
      <BrowserRouter>
        <Switch>
          {/* <Route exact path='/create-account' render={(props)=><CreateAccount {...props} emailFromInvitation={emailFromInvitation} />}/> */}
          <Route exact path='/login' render={(props)=><Landing {...props} />} />
          {
            userToken
            ? 
            <Switch>
            <Route exact path="/create-new-league" component={CreateNewLeague} />
            <Route path = '/' component={App}/>
            </Switch>
            : 
            <Redirect to="/login"/>
          }
        </Switch>
      </BrowserRouter>
    }
    </>
  );
}

export default Router
