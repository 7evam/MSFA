import React from 'react';
import {
  Routes, Route, Link, Outlet, useNavigate,
} from 'react-router-dom';

export default function AppContainer({ setLoggedIn }) {
  const navigate = useNavigate();
  const logOut = () => {
    setLoggedIn(false);
    navigate('/');
    navigate(0);
  };
  return (
    <div>
      <Link to="/squad">Squad</Link>
      <Link to="/league">League</Link>
      <button onClick={logOut}>Log Out</button>
      <Outlet />
    </div>
  );
}
