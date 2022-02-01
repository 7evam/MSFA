import React, { useState, useEffect, useRef } from "react";
import {NavLink} from "react-router-dom";
import styled from 'styled-components';
import RoflLogo from './RoflLogo.png';

const red  = '#DA2929'
const blue = '#013369'
const mediumBlue = '#C0CCD9'
const lightBlue = '#DFE5EC'

const NavGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 220px;
`;
const SideBar = styled.div`
  z-index: 100;
`;

const Nav = styled.nav`
  grid-area: nav;
  background-color: ${mediumBlue};
  border-radius: 10px;
  margin-right: 10px;
  height: 100vh;

`;

const Logo = styled.img`
  width: 220px;
`

const CustomNavLink = styled(NavLink)`
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 500;
  color: ${red};
  padding: 10px 0;
  display: grid;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;

  grid-template:
    auto
    / [col-start] 20px [icon] 20px [spacer-col] 12px [label] 1fr [col-end] 20px;
  grid-area: auto / 1 / auto / 4;

  &.active {
    background-color: ${lightBlue};
    border-right: 3px solid ${blue};
    color: ${red};
    font-weight: 600;
  }

  &:not(.active):hover {
    background-color: #F8F8F8;
    color: blue;
  }
`;

function Sidebar({ setSidebarSelection, sidebarSelection }) {
 

  return (
    <SideBar className="sidebar">
      <Logo src={'https://rofl-public-assets.s3.us-east-2.amazonaws.com/RoflLogo.png'} alt="roflLogo"/>
      <Nav className="grid-container">
        <NavGroup>
        <CustomNavLink to="/squad">
            <span>My Squad</span>
          </CustomNavLink>

          <CustomNavLink to="/dashboard">
            <span>Dashboard</span>
          </CustomNavLink>

          <CustomNavLink to="/roster">
            <span>Roster</span>
          </CustomNavLink>

          <CustomNavLink to="/standings">
            <span>Standings</span>
          </CustomNavLink>

          <CustomNavLink to="/transactions">
            <span>Transactions</span>
          </CustomNavLink>
        </NavGroup>
      </Nav>
    </SideBar>
  );
}

export default Sidebar;
