import React, { useState, useEffect, useRef } from "react";
import {NavLink} from "react-router-dom";
import styled from 'styled-components';


const NavGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 300px;
`;
const SideBar = styled.div`
`;

const Nav = styled.nav`
  grid-area: nav;
`;

const CustomNavLink = styled(NavLink)`
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  color: red;
  padding: 10px 0;
  display: grid;
  transition: all 0.3s ease;

  grid-template:
    auto
    / [col-start] 20px [icon] 20px [spacer-col] 12px [label] 1fr [col-end] 20px;
  grid-area: auto / 1 / auto / 4;

  &.active {
    background-color: #F8F8F8;
    border-right: 3px solid blue;
    color: #red;
  }

  &:not(.active):hover {
    background-color: #F8F8F8;
    color: blue;
  }
`;

function Sidebar({ setSidebarSelection, sidebarSelection }) {
 

  return (
    <SideBar className="sidebar">
      <Nav className="grid-container">
        <NavGroup>
          <CustomNavLink to="/dashboard">
            <span>Dashboard</span>
          </CustomNavLink>

          <CustomNavLink to="/standings">
            <span>Standings</span>
          </CustomNavLink>

          <CustomNavLink to="/standings">
            <span>Transactions</span>
          </CustomNavLink>
        </NavGroup>
      </Nav>
    </SideBar>
  );
}

export default Sidebar;
