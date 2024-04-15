import React from "react";
import styled from "styled-components"
import { mobileBreakPoint, lightBlue } from '../../../constants/style';

export const ScoringContainer = styled.div`
    display: grid;
    grid-template-columns: ${(props) => props.isArchived ? '1fr 1fr' : '1fr 1fr 1fr'};
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    width: 100%;
    margin-top: 15px;
    border: 2px solid #E5EAF4;
    border-radius: 10px;
    ${(props) => props.isArchived ?
        `
    & div:nth-child(4n+5),
    & div:nth-child(4n+6) {
      background-color: #F7FBFF;
    }
    `
        :
        `
    & div:nth-child(6n+7), 
    & div:nth-child(6n+8),
    & div:nth-child(6n+9) {
      background-color: #F7FBFF;
    }
    `
    }
`;

export const ActionButton = styled.button`
    height: 120%;
    width: 80%;
    z-index: 100;
    display: inline-block;
    outline: none;
    cursor: pointer;
    font-weight: 500;
    padding: 0 16px;
    margin-left: 8px;
    border-radius: 4px;
    color: white;
    background: ${(props) => (props.selectedSlot && props.selectedSlot === props.leagueKey
        ? '#4E871F'
        : '#17288F')};
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
        background: #4E871F;
        box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
    }
    @media (max-width: ${mobileBreakPoint}){
        width: 80px;
        height: 20px;
       }
`;

export const Cell = styled.div`
    padding: 16px;
    padding-right: 0px;
    border-bottom: ${(props) => (props.isLastInList ? null : '2px solid #E5EAF4')}; 
    background-color: ${(props) => (props.colored ? '#F7FBFF' : 'white')};
    &:hover{
        text-decoration: ${(props) => (props.teamName ? 'underline' : null)}; 
        cursor: ${(props) => (props.teamName ? 'pointer' : null)}; 
    }
    ${(props) => props.button &&
        `
    display: flex;
    align-items: center;
    justify-content: center;
    `}
    
    @media (min-width: ${mobileBreakPoint}){
        ${(props) => !props.firstItem && `
            &:before {
                content: "";
                right: 0;
                z-index: 100;
                top: 0;
                height: 50%; 
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
    padding: 16px 0px 8px 32px;
    text-align:center;
    background-color: #F7FBFF;
    font-weight: 800;
    font-size: 14px;
    &:hover{
      cursor: pointer;
      text-decoration: underline;
  }
    @media (max-width: ${mobileBreakPoint}){
      font-size: 10px;
      padding-right: 16px;
      padding-left: 38px;
     }
`;
