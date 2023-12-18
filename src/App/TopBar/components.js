import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { mobileBreakPoint } from '../../constants/style';

export const TopBarContainer = styled.div`
  font-family: "Ariel", sans-serif;
  height: 70px;
  background-color: #010626;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 16px 0px 16px;
    margin-bottom: ${(props) => (props.menuOpen ? null : '16px;')};
    @media (min-width: ${mobileBreakPoint}){
      grid-area: 1 / 1 / 2 / 3;
    }
    
`;

export const MenuContainer = styled.div`
margin-left: 25px;
    &:hover{
        cursor: pointer;
    }
    @media (min-width: ${mobileBreakPoint}){
      display: none;
    }
`;

export const MenuContent = styled.div`
    height: 100vh;
    background-color: #010626;
`;

export const MenuItem = styled(NavLink)`
    text-decoration: none;
    width: 100%;
    border: 4px solid white;
    box-sizing: border-box;
    border-bottom: ${(props) => (props.$finalItem ? '4px solid white' : 'none')};
    height: 60px;
    color: ${(props) => (props.selected ? '#F25C05' : 'white')};
    font-size: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover{
        background-color: #F25C05;
        color: white;
    }
`;

export const LogoContainer = styled.div`
  @media (min-width: ${mobileBreakPoint}){
    display: none;
  }
`;

export const LeagueContainer = styled(NavLink)`
color: white;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
&:hover{
  cursor: pointer;
  color: #F25C05;
}
`;

export const SettingsContainer = styled(NavLink)`
color: white;
margin-left: 25px;
&:hover{
  color: #F25C05;
}
cursor: pointer;
@media (max-width: ${mobileBreakPoint}){
  display: none;
}
`;

export const RightSideContainer = styled.div`
display: flex;
flex-direction: row;
align-items: center;
`;
