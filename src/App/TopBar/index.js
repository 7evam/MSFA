import React, { useState, useEffect, useRef } from "react";
import {NavLink} from "react-router-dom";
import styled from 'styled-components';

const red  = '#DA2929'
const blue = '#013369'
const mediumBlue = '#C0CCD9'
const lightBlue = '#DFE5EC'

const NavGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 50px;
`;
const Topbar = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    position: absolute;
    z-index: 10;
`;

const Nav = styled.nav`
  background-color: ${mediumBlue};
  width: 100vw;
  margin: 0;
  margin-left: -10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;

`;

const CustomNavLink = styled(NavLink)`
  text-decoration: none;
  color: gray;
  display: flex;
  justify-content: center;
  margin-right: 20px;
`;

function TopBar() {
 
  return (
    <Topbar>
      <Nav>
        <NavGroup>
          <CustomNavLink to="/settings">
            <span>Settings</span>
          </CustomNavLink>
          <CustomNavLink to="/logOut">
            <span>Log Out</span>
          </CustomNavLink>
        </NavGroup>
      </Nav>
    </Topbar>
  );
}

export default TopBar;
