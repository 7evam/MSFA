import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import lock from '../../../icons/lock';

const FirstItem = styled.div`
    padding: 16px 0px 8px 16px;
    border-bottom: ${(props) => (props.isLastInList ? null : '2px solid #E5EAF4')}; 
`;

const Item = styled.div`
    padding: 16px 0px 8px 16px;
    border-bottom: ${(props) => (props.isLastInList ? null : '2px solid #E5EAF4')}; 
    &:before{
        content: "";
        right: 0;
        z-index: 100;
        top: 0;
        height: 50%; 
        border-right: 2px solid #E5EAF4;
        margin-right: 8px;
    }
`;

const PointsItem = styled.div`
    padding: 16px 0px 8px 16px;
    border-bottom: ${(props) => (props.isLastInList ? null : '2px solid #E5EAF4')}; 
    font-weight: 800;
`;

function Slot({
  league, teamName, locked, points, isLastInList, isTotalPoints,
}) {
  return (
    isTotalPoints
      ? (
        <>
          <PointsItem />
          <PointsItem />
          <PointsItem>Total Points</PointsItem>
          <Item><b>99</b></Item>
        </>
      )
      : (
        <>
          <FirstItem isLastInList={isLastInList}>MLB</FirstItem>
          <Item isLastInList={isLastInList}>Oklahoma City Trail Blazers</Item>
          <Item isLastInList={isLastInList}>{lock}</Item>
          <Item isLastInList={isLastInList}>99</Item>
        </>
      )
  );
}

export default Slot;
