import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Container, YearSelector, Year, AppRoutes,
  AppActions, NavGroup, Topbar, Nav, CustomNavLink,
  Logo, LogoContainer, MobileSettings, MobileLogOut, DummyYearSelector,
} from './components';
import SettingsIcon from '../../icons/settings';
import LogOutIcon from '../../icons/logOut';

function TopBar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const logOut = () => {
    dispatch({
      type: 'LOGOUT',
    });
    navigate('/');
    navigate(0);
  };

  const { selectedYear } = useSelector((state) => ({
    ...state.sportReducer,
  }));

  const { currentOrganization } = useSelector((state) => ({
    ...state.authReducer,
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
              <CustomNavLink to="/squad" selected={location.pathname.includes('squad')}>
                Squad
              </CustomNavLink>

              {/* <CustomNavLink to="/dashboard">
            <span>Dashboard</span>
          </CustomNavLink> */}

              {/* <CustomNavLink to="/rosters">
            <span>Rosters</span>
          </CustomNavLink> */}

              <CustomNavLink to="/rofleague" selected={location.pathname.includes('rofleague')}>
                League
              </CustomNavLink>

              <CustomNavLink to="/scoring" selected={location.pathname.includes('scoring')}>
                Scoring
              </CustomNavLink>

              <CustomNavLink to="/add-team" selected={location.pathname.includes('add-team')}>
                Transactions
              </CustomNavLink>
            </AppRoutes>
            <AppActions>
              <CustomNavLink to="/settings" selected={location.pathname.includes('settings')}>
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
        currentOrganization.activeYears && Object.keys(currentOrganization.activeYears).length > 1
          ? (
            <YearSelector value={selectedYear} onChange={(e) => handleYearChange(e.target.value)} name="selectedYear">
              {Object.keys(currentOrganization.activeYears).map((year) => (
                <Year key={year} value={year}>{year}</Year>
              ))}
            </YearSelector>
          )
          : <DummyYearSelector />
      }

    </Container>
  );
}

export default TopBar;
