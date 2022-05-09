import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { NavGroup, Topbar, Nav, CustomNavLink } from "./components";


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
      <Nav>
        <NavGroup>
          <CustomNavLink to="/settings">
            <span>Settings</span>
          </CustomNavLink>
          <CustomNavLink to="/">
            <span onClick={logOut}>Log Out</span>
          </CustomNavLink>
        </NavGroup>
      </Nav>
    </Topbar>
  );
}

export default TopBar;
