import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppRoutes, AppActions, NavGroup, Topbar, Nav, CustomNavLink, Logo, LogoContainer, MobileSettings, MobileLogOut } from "./components";
import SettingsIcon from "../../icons/settings";
import LogOutIcon from "../../icons/logOut"

function TopBar() {

  const dispatch = useDispatch()
  const history = useHistory()

  const logOut = () => {

    dispatch({
      type: "LOGOUT",
    });
    // history.push('/')
  }

  return (
    <Topbar>
      <LogoContainer>
        <MobileSettings><CustomNavLink to="/settings">{SettingsIcon}</CustomNavLink></MobileSettings>
        <Logo src={'https://rofl-public-assets.s3.us-east-2.amazonaws.com/RoflLogo.png'} alt="roflLogo"/>
        <MobileLogOut onClick={logOut}>{LogOutIcon}</MobileLogOut>
      </LogoContainer>
      <Nav className="grid-container">
        <NavGroup>
          <AppRoutes>
        <CustomNavLink to="/squad" isSelected={history.location.pathname == '/squad'}>
            Squad
          </CustomNavLink>

          {/* <CustomNavLink to="/dashboard">
            <span>Dashboard</span>
          </CustomNavLink> */}

          {/* <CustomNavLink to="/rosters">
            <span>Rosters</span>
          </CustomNavLink> */}

          <CustomNavLink to="/rofleague" isSelected={history.location.pathname == '/rofleague'}>
            League
          </CustomNavLink>

          <CustomNavLink to="/scoring" isSelected={history.location.pathname == '/scoring'}>
            Scoring
          </CustomNavLink>

          <CustomNavLink to="/add-team" isSelected={history.location.pathname == '/add-team'}>
            Transactions
          </CustomNavLink>
          </AppRoutes>
          <AppActions>
          <CustomNavLink to="/settings" isSelected={history.location.pathname == '/settings'}>
            Settings
          </CustomNavLink>
          <CustomNavLink to="/">
            <span onClick={logOut}>Log Out</span>
          </CustomNavLink>
          </AppActions>
        </NavGroup>
      </Nav>
      
    </Topbar>
  );
}

export default TopBar;


