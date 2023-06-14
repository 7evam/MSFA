import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import Landing from './containers/Landing';
import About from './containers/About';
import ResetPassword from './containers/ResetPassword';
import MySquad from './containers/MySquad';
import AddTeam from './containers/AddTeam';
// import RoflLeague from './containers/RoflLeague';
import Scoring from './containers/Scoring';
import Settings from './containers/Settings';
import CreateNewLeague from './containers/CreateNewLeague';
import NewSeason from './containers/NewSeason';
import Roster from './containers/RoflLeague/Roster';
import Standings from './containers/RoflLeague/Standings';

import App from './App';
// const App = lazy(() => import('./App'));
// const CreateNewLeague = lazy(() => import('./containers/CreateNewLeague'));
// const NewSeason = lazy(() => import('./containers/NewSeason'));

// configuration for toaster messages
// https://www.npmjs.com/package/react-toastify

toast.configure({
  autoClose: 3000,
  hideProgressBar: true,
});

function NewRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Landing />} />
        <Route path="/create-new-league" element={<CreateNewLeague />} />
        <Route path="/resetPassword/:resetCode" element={<ResetPassword />} />
        <Route path="/" element={<App />}>
          <Route path="/squad" element={<MySquad />} />
          <Route path="/rofleague">
            <Route index element={<Standings />} />
            <Route path="/rofleague/:userId/:roflYear/:roflMonth" element={<Roster />} />
          </Route>
          <Route path="/settings" element={<Settings />} />
          <Route path="/scoring" element={<Scoring />} />
          <Route path="/add-team" element={<AddTeam />} />
          <Route path="/new-season" element={<NewSeason />} />
          <Route path="/" element={<Navigate to="/squad" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default NewRouter;
