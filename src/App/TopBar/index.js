import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Container, YearSelector, Year, AppRoutes, AppActions, NavGroup, Topbar, Nav, CustomNavLink, Logo, LogoContainer, MobileSettings, MobileLogOut,
} from './components';
import SettingsIcon from '../../icons/settings';
import LogOutIcon from '../../icons/logOut';

function TopBar() {
  const dispatch = useDispatch();
  const history = useHistory();

  const logOut = () => {
    dispatch({
      type: 'LOGOUT',
    });
    // history.push('/')
  };

  const { selectedYear, activeYears } = useSelector((state) => ({
    ...state.sportReducer,
  }));

  const handleYearChange = (newYear) => {
    dispatch({
      type: 'SET_SELECTED_YEAR',
      payload: {
        selectedYear: newYear,
      },
    });
  };

  return (
    <Container>
      <Topbar>
        <LogoContainer>
          <MobileSettings><CustomNavLink to="/settings">{SettingsIcon}</CustomNavLink></MobileSettings>
          <Logo src="https://rofl-public-assets.s3.us-east-2.amazonaws.com/MSFALogoRectangle.png" alt="msfaLogo" />
          <MobileLogOut onClick={logOut}>{LogOutIcon}</MobileLogOut>
        </LogoContainer>
        <Nav className="grid-container">
          <NavGroup>
            <AppRoutes>
              <CustomNavLink to="/squad" selected={history.location.pathname == '/squad'}>
                Squad
              </CustomNavLink>

              {/* <CustomNavLink to="/dashboard">
            <span>Dashboard</span>
          </CustomNavLink> */}

              {/* <CustomNavLink to="/rosters">
            <span>Rosters</span>
          </CustomNavLink> */}

              <CustomNavLink to="/rofleague" selected={history.location.pathname == '/rofleague'}>
                League
              </CustomNavLink>

              <CustomNavLink to="/scoring" selected={history.location.pathname == '/scoring'}>
                Scoring
              </CustomNavLink>

              <CustomNavLink to="/add-team" selected={history.location.pathname == '/add-team'}>
                Transactions
              </CustomNavLink>
            </AppRoutes>
            <AppActions>
              <CustomNavLink to="/settings" selected={history.location.pathname == '/settings'}>
                Settings
              </CustomNavLink>
              <CustomNavLink to="/">
                <span onClick={logOut}>Log Out</span>
              </CustomNavLink>
            </AppActions>
          </NavGroup>
        </Nav>
      </Topbar>
      {
        Object.keys(activeYears).length > 1
          ? (
            <YearSelector value={selectedYear} onChange={(e) => handleYearChange(e.target.value)} name="selectedYear">
              {Object.keys(activeYears).map((year) => (
                <Year key={year} value={year}>{year}</Year>
              ))}
            </YearSelector>
          )
          : null
      }

    </Container>
  );
}

export default TopBar;
