import React from 'react';
import styled from 'styled-components';
import { mobileBreakPoint } from '../../../constants/style';

export const FirstItem = styled.div`
    padding: 16px 0px 8px 16px;
    border-bottom: ${(props) => (props.isLastInList ? null : '2px solid #E5EAF4')}; 
`;

export const Item = styled.div`
    padding: 16px 0px 8px 16px;
    border-bottom: ${(props) => (props.isLastInList ? null : '2px solid #E5EAF4')}; 
    @media (min-width: ${mobileBreakPoint}){
        &:before{
            content: "";
            right: 0;
            z-index: 100;
            top: 0;
            height: 50%; 
            border-right: 2px solid #E5EAF4;
            margin-right: 8px;
        }
       }
    
    @media (max-width: ${mobileBreakPoint}){
        font-size: 16px;
        text-align: ${(props) => (props.action ? 'center' : 'left')}; 
        display: inline-block;
        padding: 16px 0px 8px 16px;
        padding-left: ${(props) => (props.action ? '0px' : '16px')}; 
       }
`;

export const PointsItem = styled.div`
    padding: 16px 0px 8px 16px;
    border-bottom: ${(props) => (props.isLastInList ? null : '2px solid #E5EAF4')}; 
    font-weight: 800;
    @media (max-width: ${mobileBreakPoint}){
       padding-right: 40px;
       width: 100%;
      }
`;

export const ActionButton = styled.button`
    height: 120%;
    width: 100%;
    z-index: 100;
    display: inline-block;
    outline: none;
    cursor: pointer;
    font-weight: 500;
    padding: 0 16px;
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

export const TPText = styled.p`
       margin: 0;
       text-align: right;
       @media (max-width: ${mobileBreakPoint}){
        margin-right: 30px;
       }
`;
