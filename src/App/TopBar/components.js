import React, { useState, useEffect, useRef } from "react";
import {NavLink} from "react-router-dom";
import styled from 'styled-components';
import {red, blue, mediumBlue, lightBlue, mobileBreakPoint} from '../../constants/style'

export const Topbar = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    position: absolute;
    z-index: 10;
    width: 100vw;
    @media (max-width: ${mobileBreakPoint}){
      flex-direction: column;
    }
`;

export const NavGroup = styled.div`
display: flex;
flex-direction: row;
align-items: center;
height: 50px;
width: 100vw;
justify-content: space-between;
margin-left: 240px;
@media (max-width: ${mobileBreakPoint}){
  margin: 0;
}
`;

export const Nav = styled.nav`
  background-color: ${mediumBlue};
  width: 100vw;
  margin: 0;
  height: 75px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  color: black;
  margin-left: -220px;
  z-index: 10;
  @media (max-width: ${mobileBreakPoint}){
    height: 40px;
    margin: 0;
    width: 100vw;
  }
`;

export const CustomNavLink = styled(NavLink)`
  text-decoration: none;
  color: black
  display: flex;
  margin-right: 20px;
  font-weight: ${props => props.isSelected ? "800" : "400"};
  &:hover{
    font-weight: 800;
  }
  @media (max-width: ${mobileBreakPoint}){
    margin-right: 0px;
  }
  
`;

export const Logo = styled.img`
  width: 220px;
  z-index: 15;
  @media (max-width: ${mobileBreakPoint}){
    width: 170px;
  }
`

export const LogoContainer = styled.div`
z-index: 15;
@media (max-width: 768px){
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
  align-items: center;
  width: 100vw;
  background-color: ${mediumBlue};
}


`
export const MobileSettings = styled.div`
  display: none;
  @media (max-width: ${mobileBreakPoint}){
    display: block;
    cursor: pointer;
  }
`

export const MobileLogOut = styled.div`
  display: none;
  @media (max-width: ${mobileBreakPoint}){
    display: block;
    cursor: pointer;
  }

`

export const AppActions = styled.div`
@media (max-width: ${mobileBreakPoint}){
  display: none;
}
`

export const AppRoutes = styled.div`
  display: block;
  @media (max-width: ${mobileBreakPoint}){
    width: 100vw;
    display: flex;
    justify-content: space-evenly;
  }
`