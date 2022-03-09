import React, { useState, useEffect, useRef } from "react";
import { NavGroup, Topbar, Nav, CustomNavLink } from "./components";

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
