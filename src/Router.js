import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import App from './App'
import LogIn from './containers/LogIn'

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
          <Route exact path='/login' render={(props)=><LogIn {...props} />} />
          {
            userToken
            ? 
            <Route path = '/' component={App}/>
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
