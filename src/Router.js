import React, { lazy, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import App from './App'
import Landing from './containers/Landing'
// import CreateNewLeague from './containers/CreateNewLeague'

import { Redirect, BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';

import Loading from './components/Loading';

const App = lazy(() => import('./App'))
const CreateNewLeague = lazy(() => import('./containers/CreateNewLeague'))

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
        <Suspense fallback={<Loading/>}>
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
          </Suspense>
        </Switch>
      </BrowserRouter>
    }
    </>
  );
}

export default Router
