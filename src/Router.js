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
import Draft from './containers/Draft';
import ValueTool from './containers/Draft/ValueTool';
import DraftScoring from './containers/Draft/DraftScoring';
import Tips from './containers/Draft/Tips';

// const MySquad = lazy(() => import('./containers/MySquad'));
// const AddTeam = lazy(() => import('./containers/AddTeam'));
// const Scoring = lazy(() => import('./containers/Scoring'));
// const Settings = lazy(() => import('./containers/Settings'));
// const Standings = lazy(() => import('./containers/RoflLeague/Standings'));
// const Roster = lazy(() => import('./containers/RoflLeague/Roster'));
// const ValueTool = lazy(() => import('./containers/Draft/ValueTool'));
// const DraftScoring = lazy(() => import('./containers/Draft/DraftScoring'));
// const Tips = lazy(() => import('./containers/Draft/Tips'));
// const App = lazy(() => import('./App'));
// const Draft = lazy(() => import('./containers/Draft'));
// const CreateNewLeague = lazy(() => import('./containers/CreateNewLeague'));
// const NewSeason = lazy(() => import('./containers/NewSeason'));

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
          <Route path="/squad" element={<MySquad />} />
          <Route path="/rofleague">
            <Route index element={<Standings />} />
            <Route path="/rofleague/:userId/:roflYear/:roflMonth" element={<Roster />} />
          </Route>
          <Route path="/settings" element={<Settings />} />
          <Route path="/scoring" element={<Scoring />} />
          <Route path="/add-team" element={<AddTeam />} />
          <Route path="/new-season" element={<NewSeason />} />
        </Route>
        <Route path="/" element={userToken ? <Navigate to="/squad" replace /> : <Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
}

export default Router;
