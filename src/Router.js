import React, { lazy, Suspense } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loading from './components/Loading';
import Landing from './containers/Landing';
import About from './containers/About';
import ResetPassword from './containers/ResetPassword';

import Squad from './containers/Squad';
import AddTeam from './containers/AddTeam';
// import RoflLeague from './containers/RoflLeague';
import Scoring from './containers/Scoring';
import Settings from './containers/Settings';
import CreateNewLeague from './containers/CreateNewLeague';
import NewSeason from './containers/NewSeason';
import Roster from './containers/RoflLeague/Roster';
import Standings from './containers/RoflLeague/Standings';
import App from './App';
import Draft from './containers/Draft';
import ValueTool from './containers/Draft/ValueTool';
import DraftScoring from './containers/Draft/DraftScoring';
import Tips from './containers/Draft/Tips';
import SetLeagueYear from './containers/SetLeagueYear';

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
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Landing />} />
        <Route path="/create-new-league" element={<CreateNewLeague />} />
        <Route path="/resetPassword/:resetCode" element={<ResetPassword />} />
        <Route path="/draft" element={<Draft />}>
          <Route index path="tips" element={<Tips />} />
          <Route path="value-tool" element={<ValueTool />} />
          <Route path="scoring" element={<DraftScoring />} />
        </Route>
        <Route element={<App />}>
          <Route path="/squad" element={<Squad />} />
          <Route path="/league">
            <Route index element={<Standings />} />
            <Route path="/league/:userId/:roflYear/:roflMonth" element={<Roster />} />
          </Route>
          <Route path="/settings" element={<Settings />} />
          <Route path="/set-league-year" element={<SetLeagueYear />} />
          <Route path="/scoring" element={<Scoring />} />
          <Route path="/transactions" element={<AddTeam />} />
          <Route path="/new-season" element={<NewSeason />} />
        </Route>
        <Route path="/" element={userToken ? <Navigate to="/squad" replace /> : <Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
}

export default Router;
