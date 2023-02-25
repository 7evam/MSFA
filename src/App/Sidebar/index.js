import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import RoflLogo from './RoflLogo.png';
import {
  NavGroup, SideBar, Nav, Logo, CustomNavLink,
} from './components';

function Sidebar({ setSidebarSelection, sidebarSelection }) {
  return (
    <SideBar className="sidebar">
      <Logo src="https://rofl-public-assets.s3.us-east-2.amazonaws.com/MSFALogoRectangle.png" alt="MSFA Logo" />
      <Nav className="grid-container">
        <NavGroup>
          <CustomNavLink to="/squad">
            <span>My Squad</span>
          </CustomNavLink>

          {/* <CustomNavLink to="/dashboard">
            <span>Dashboard</span>
          </CustomNavLink> */}

          {/* <CustomNavLink to="/rosters">
            <span>Rosters</span>
          </CustomNavLink> */}

          <CustomNavLink to="/rofleague">
            <span>My MSFA League</span>
          </CustomNavLink>

          <CustomNavLink to="/scoring">
            <span>Scoring</span>
          </CustomNavLink>

          <CustomNavLink to="/add-team">
            <span>Add Team</span>
          </CustomNavLink>
        </NavGroup>
      </Nav>
    </SideBar>
  );
}

export default Sidebar;
