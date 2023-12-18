import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { mobileBreakPoint } from '../../constants/style';
import { convertMonthToReadable } from '../../utils';

const FirstItem = styled.div`
    padding: 16px 0px 8px 16px;
    border-bottom: ${(props) => (props.isLastInList ? null : '2px solid #E5EAF4')}; 
`;

const Item = styled.div`
    padding: 16px 0px 8px 16px;
    border-bottom: ${(props) => (props.isLastInList ? null : '2px solid #E5EAF4')}; 
    &:hover{
        text-decoration: ${(props) => (props.teamName ? 'underline' : null)}; 
        cursor: ${(props) => (props.teamName ? 'pointer' : null)}; 
    }
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
       }
`;

function SeasonOverviewSlot({
  userPoints,
  month,
  roflYear,
}) {
  return (
    <>
      <FirstItem>{convertMonthToReadable(month, roflYear)}</FirstItem>
      <Item>{userPoints.monthlyPoints}</Item>
      <Item>{userPoints.cumulativePoints}</Item>
    </>
  );
}

export default SeasonOverviewSlot;
