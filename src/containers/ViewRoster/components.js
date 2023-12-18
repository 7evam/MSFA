import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { mobileBreakPoint } from '../../constants/style';

export const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  @media (max-width: ${mobileBreakPoint}){
      width: 100vw;
  }
`;

export const RosterNav = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
`;

export const BackButton = styled(Link)`
width: 33%;
display: flex;
text-decoration: none;
color: black;
margin-left: 10px;
&:hover{
  text-decoration: underline;
}
`;

export const MonthlyOrOverview = styled.div`
display: flex;
justify-content; center;
align-items: center;
height: 60%;

`;

export const NavButton = styled.button`
    margin-left: 5px;
    height: 100%;
    width: 100%;
    z-index: 100;
    display: inline-block;
    outline: none;
    cursor: pointer;
    font-weight: 500;
    padding: 0 16px;
    border-radius: 8px;
    color: white;
    background: ${(props) => (props.selected ? '#F25C05' : '#17288F')};
    line-height: 1.15;
    font-size: 14px;
    letter-spacing: .08em;
    text-decoration: none;
    text-transform: uppercase;
    border: none;
    text-align: center;
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
    transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
    :hover {
        background: #F25C05;
        box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
    }
    @media (max-width: ${mobileBreakPoint}){
        width: 90px;
        height: 30px;
        font-size: 10px;
       }
`;

export const OverviewContainer = styled.div`
    margin-top: 15px;
    border: 2px solid #E5EAF4;
    border-radius: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    width: 90%;
`;

export const HeaderLabel = styled.div`
    padding: 16px 0px 8px 16px;
    text-align:center;
    background-color: #EAEEF480;
    font-weight: 800;
    font-size: 14px;
    @media (max-width: ${mobileBreakPoint}){
      font-size: 14px;
      padding-right: 16px;
     }
`;

// & div:nth-child(10n+11){
//   background-color: #F7FBFF;
// }
// & div:nth-child(10n+12){
//   background-color: #F7FBFF;
// }
// & div:nth-child(10n+13){
//   background-color: #F7FBFF;
// }
// & div:nth-child(10n+14){
//   background-color: #F7FBFF;
//   z-index: -1;
// }
// & div:nth-child(10n+15){
//   background-color: #F7FBFF;
//   z-index: -1;
// }
