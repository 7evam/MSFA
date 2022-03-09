import React, { useState, useEffect, useRef } from "react";
import {NavLink} from "react-router-dom";
import styled from 'styled-components';
import {red, blue, mediumBlue, lightBlue} from '../../constants/style'

export const NavGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 50px;
`;

export const Topbar = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    position: absolute;
    z-index: 10;
`;

export const Nav = styled.nav`
  background-color: ${mediumBlue};
  width: 100vw;
  margin: 0;
  margin-left: -10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;

`;

export const CustomNavLink = styled(NavLink)`
  text-decoration: none;
  color: gray;
  display: flex;
  justify-content: center;
  margin-right: 20px;
`;