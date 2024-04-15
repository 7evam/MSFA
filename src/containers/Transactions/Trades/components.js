import React from 'react';
import styled from 'styled-components';
import { mobileBreakPoint, mediumBlue } from '../../../constants/style';

export const Container = styled.div`
width: 600px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
text-align: center;
    margin-top: 20px;
    @media (max-width: ${mobileBreakPoint}){
      width: 90%;
     }
`;

export const MonthContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 18px;
`;

export const TradeCardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid black;
  &:nth-child(even) {
    background-color: ${mediumBlue};
}
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ButtonContainer = styled.div`
  text-align: right;
  padding-right: 20px;
  padding-bottom: 20px;
`;

export const Button = styled.button`
  background-color: ${(props) => (props.accept ? '#4CAF50' : red)};
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  font-size: 14px;
  margin-left: 14px;
  padding: 8px 14px 8px 14px;
  cursor: pointer;
`;

export const TradeSidesContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const TradeSideHeader = styled.p`
  font-weight: 800;
`;

export const TradeSide = styled.div``;