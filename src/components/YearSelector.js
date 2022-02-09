import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {useSelector} from 'react-redux'

const Container = styled.div`
background-color: #333;
width: 500px;
display: flex;
flex-direction: row;
`;

const Year = styled.div`
    width: 50%;
    padding-top: 15px;
    padding-left: 5px;
    padding-right: 5px;
    display: inline-block;
    color: ${(props) => (props.selected ? "limegreen" : "white")};
    text-align: center;
    padding: 15px;
    text-decoration: none;
    cursor: pointer;
    border: 1px solid white;
`



function YearSelector({selectedRoflYear, setSelectedRoflYear}) {

    const {activeYears} = useSelector(state => ({
        ...state.sportReducer
      }))

    console.log('here is active years in year selector')
    console.log(activeYears)

    let activeYearArray = []
    activeYears.forEach((year,i) => {
        console.log('here is year')
        console.log(i)
        activeYearArray.push(Object.keys(year)[0])
    })

  return (
        <Container>
            <Year onClick={() => setSelectedRoflYear(activeYearArray[0])} selected={Number(selectedRoflYear)===Number(activeYearArray[0])}>{activeYearArray[0]}</Year>
            <Year onClick={() => setSelectedRoflYear(activeYearArray[1])} selected={Number(selectedRoflYear)===Number(activeYearArray[1])}>{activeYearArray[1]}</Year>
        </Container>
  );
}

export default YearSelector;
