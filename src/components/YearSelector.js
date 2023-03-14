import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { blue } from '../constants/style';

const Container = styled.div`
background-color: ${blue};
display: flex;
flex-direction: row;
`;

const Year = styled.div`
    width: 50%;
    padding-top: 15px;
    padding-left: 5px;
    padding-right: 5px;
    display: inline-block;
    color: ${(props) => (props.selected ? 'limegreen' : 'white')};
    text-align: center;
    padding: 15px;
    text-decoration: none;
    cursor: pointer;
    border: 1px solid white;
`;

function YearSelector({
  selectedRoflYear, setSelectedRoflYear, activeYearArray, handleYearChange,
}) {
  return (
    activeYearArray
      ? (
        <Container>
          <Year onClick={() => handleYearChange(activeYearArray[0])} selected={Number(selectedRoflYear) === Number(activeYearArray[0])}>{activeYearArray[0]}</Year>
          <Year onClick={() => handleYearChange(activeYearArray[1])} selected={Number(selectedRoflYear) === Number(activeYearArray[1])}>{activeYearArray[1]}</Year>
        </Container>
      )
      : <p>loading...</p>
  );
}

export default YearSelector;
