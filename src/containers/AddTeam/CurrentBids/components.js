import React from 'react';
import styled from 'styled-components';
import { mobileBreakPoint, lightBlue } from '../../../constants/style';

export const Container = styled.div`
width: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
    margin-top: 50px;
`;

export const ScoringContainer = styled.div`
    display: grid;
    grid-template-columns: ${(props) => (props.currentMonthIncludesCurrentBid ? '1fr 2fr 1fr 1fr 2fr 1fr' : '2fr 1fr 1fr 2fr')};
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    margin-top: 15px;
    border: 2px solid #E5EAF4;
    width: 90%;
    border-radius: 10px;
    @media (max-width: ${mobileBreakPoint}){
      
      grid-template-columns: ${(props) => (props.currentMonthIncludesCurrentBid ? '1fr 2fr 1fr 1fr' : '1fr 1fr')};
     }
`;

export const HeaderLabel = styled.div`
    padding: 16px 0px 8px 16px;
    text-align:center;
    background-color: #F7FBFF;
    font-weight: 800;
    font-size: 14px;
    display: ${(props) => (props.onlyMobile && 'none')};

    &:hover{
      cursor: pointer;
      text-decoration: underline;
  }
    @media (max-width: ${mobileBreakPoint}){
      display: ${(props) => (props.mobile ? 'inline-block' : 'none')};
      font-size: 10px;
      padding-right: 16px;
     }
`;