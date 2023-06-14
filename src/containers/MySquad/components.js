import React from 'react';
import styled from 'styled-components';
import { mobileBreakPoint, lightBlue } from '../../constants/style';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  @media (max-width: ${mobileBreakPoint}){
      width: 100vw;
  }
`;
export const Slot = styled.div`
  margin-top: 25px;
`;
export const SelectButton = styled.button`
  background: ${(props) => (props.selectedSlot && props.selectedSlot === props.name
    ? 'darkred'
    : 'limegreen')};
`;

export const BannerMessage = styled.div`
  font-size: 18px;
  border: 1px solid grey;
  margin-top: 10px;
  padding: 7px;
  display: flex;
  justify-content: center;
`;

export const MonthContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 18px;
`;

export const YearContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 18px;
`;

export const MonthButton = styled.button`
  background: ${(props) => (props.selectedMonth ? 'limegreen' : 'white')};
`;

export const ScrollMenuContainer = styled.div`
  background-color: #333;
  width: 450px;
  display: flex;
  flex-direction: row;
`;

export const ScrollMenu = styled.div`
  overflow: auto;
  white-space: nowrap;
  display: inline-block;
  left: 100px;
`;

export const ScrollMenuLink = styled.a`
  display: inline-block;
  color: ${(props) => (props.selected ? 'limegreen' : 'white')};
  text-align: center;
  padding: 14px;
  text-decoration: none;
  width: 100px;
  cursor: pointer;
`;

export const ScrollMenuButton = styled.a`
  display: inline-block;
  color: white;
  text-align: center;
  padding: 14px;
  text-decoration: none;
  width: 25px;
  cursor: pointer;
`;

export const SubmitChangesButton = styled.button`
  font-size: 14px;
  background: #0066a2;
  color: white;
  border-style: outset;
  border-color: #0066a2;
  height: 25px;
  width: 70px;
  text-shadow: none;
  border-radius: 20px;
  margin-left: 15px;
`;

export const TeamName = styled.p`
    font-size: 18px;
    display: flex;
    justify-content: center;
`;
