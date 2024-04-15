import React from 'react';
import styled from 'styled-components';
import { mobileBreakPoint, lightBlue } from '../../../constants/style';

export const Container = styled.div`
width: 100%;
max-width: 800px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
text-align: center;
    margin-top: 20px;
`;

export const NoTrxContainer = styled.div`
margin-top: 20px;
width: 100%;
max-width: 800px;
`

export const CellContent = styled.p`
display: inline-block;
width: 100%;
position: relative;
`

export const TableContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 2fr) 3fr repeat(2, 4fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    width: 90%;
    margin-top: 15px;
    border: 2px solid #E5EAF4;
    border-radius: 10px;
    & div:nth-child(7n+14),
    & div:nth-child(7n+15),
    & div:nth-child(7n+16),
    & div:nth-child(7n+17),
    & div:nth-child(7n+18),
    & div:nth-child(7n+19),
    & div:nth-child(7n+20), {
      background-color: #F7FBFF;
    }
  }
`;

export const Cell = styled.div`
padding: 5px;
text-align: center;
    position: relative;
    border-bottom: ${(props) => (props.isLastInList ? null : '2px solid #E5EAF4')}; 
    background-color: ${(props) => (props.colored ? '#F7FBFF' : 'white')};
    &:hover{
        text-decoration: ${(props) => (props.teamName ? 'underline' : null)}; 
        cursor: ${(props) => (props.teamName ? 'pointer' : null)}; 
    }
    @media (min-width: ${mobileBreakPoint}){
        ${(props) => !props.firstItem && `
            &:before {
                content: "";
                left: 0;
                z-index: 100;
                position: absolute; 
                top: 40%;
                height: 20%; 
                border-right: 2px solid #E5EAF4;
                margin-right: 8px;
            }
        `}
    }
    
    @media (max-width: ${mobileBreakPoint}){
        font-size: 14px;
    }
`;

export const HeaderLabel = styled.div`
    padding: 5px;
    padding-left: 8px;
    background-color: #F7FBFF;
    font-weight: 800;
    font-size: 14px;
    text-align: center;
    &:hover{
      cursor: pointer;
      text-decoration: underline;
  }
    @media (max-width: ${mobileBreakPoint}){
      font-size: 10px;
      padding-right: 16px;
     }
`;
