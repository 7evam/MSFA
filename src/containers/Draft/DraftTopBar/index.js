import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Container, YearSelector, Year, AppRoutes,
  AppActions, NavGroup, Topbar, Nav, CustomNavLink,
  Logo, LogoContainer, MobileSettings, MobileLogOut, DummyYearSelector,
} from './components';

function DraftTopBar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Container>
      <Topbar>
        <LogoContainer>
          <Logo src="https://rofl-public-assets.s3.us-east-2.amazonaws.com/MSFALogoRectangle.png" alt="msfaLogo" />
        </LogoContainer>
        <Nav className="grid-container">
          <NavGroup>
            <AppRoutes>
              <CustomNavLink to="/draft/tips" selected={location.pathname.includes('tips')}>
                Tips
              </CustomNavLink>
              <CustomNavLink to="/draft/scoring" selected={location.pathname.includes('scoring')}>
                Scoring
              </CustomNavLink>
              <CustomNavLink to="/draft/value-tool" selected={location.pathname.includes('value')}>
                Value Tool
              </CustomNavLink>
            </AppRoutes>
            <AppActions />
          </NavGroup>
        </Nav>
      </Topbar>

    </Container>
  );
}

export default DraftTopBar;
