import React, { lazy, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import App from './App'
import {
  Redirect, BrowserRouter, Route, Switch, withRouter,
} from 'react-router-dom';
import Landing from './containers/Landing';
import About from './containers/About';
import ResetPassword from './containers/ResetPassword';
// import CreateNewLeague from './containers/CreateNewLeague'

import Loading from './components/Loading';

const App = lazy(() => import('./App'));
const CreateNewLeague = lazy(() => import('./containers/CreateNewLeague'));
const NewSeason = lazy(() => import('./containers/NewSeason'));

// configuration for toaster messages
// https://www.npmjs.com/package/react-toastify

toast.configure({
  autoClose: 3000,
  hideProgressBar: true,
});

function Router() {
  const { userToken } = useSelector((state) => ({
    ...state.authReducer,
  }));

  return (
    <BrowserRouter>
      <Switch>
        <Suspense fallback={<Loading />}>
          <Route exact path="/login" render={(props) => <Landing {...props} />} />
          <Route exact path="/about" render={(props) => <About {...props} />} />
          {/* <Route path="/resetPassword/:resetCode" render={(props) => <ResetPassword {...props} />} /> */}
          {
            // userToken
              // ? (
            <Switch>
              <Route path="/resetPassword/:resetCode" render={(props) => <ResetPassword {...props} />} />

              <Route exact path="/create-new-league" component={CreateNewLeague} />
              <Route exact path="/new-season" component={NewSeason} />
              <Route path="/" component={App} />
            </Switch>
              // )
              // : <Redirect to="/login" />
          }
        </Suspense>
      </Switch>
    </BrowserRouter>

  );
}

export default Router;
