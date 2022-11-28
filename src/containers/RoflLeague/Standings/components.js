import React from "react";
import styled from "styled-components";
import {red, blue, mediumBlue, lightBlue, mobileBreakPoint} from '../../../constants/style'

const widths = {
  rank: 10,
  personName: 20,
  teamName: 40,
  monthPoints: 20,
  totalPoints: 20
}


export const Container = styled.div`
@media (max-width: ${mobileBreakPoint}){
  width: 100vw;
}
`;

export const Heading = styled.p`
font-size: 18px;
display: flex;
justify-content: center;
`

export const Td = styled.td`
  padding: 12px;
  &:hover {
    font-weight: 700;
    text-decoration: underline;
    cursor: pointer;
  };
  @media (max-width: ${mobileBreakPoint}){
    width: ${props => widths[props.column]}vw;
  }
`;

export const YearContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 18px;
`;

// export const Td = styled.td`
//   padding: 12px;
//   border-bottom: 1px solid gray;
//   font-family: "Roboto", sans-serif;
//   font-size: 14px;
//   border-left: 1px solid gray;
// `;

export const TitleRow = styled.tr`
    background-color: ${red};
    @media (max-width: ${mobileBreakPoint}){
      width: 100vw;
    }
`;

export const Th = styled.th`
padding: 12px;
border-bottom: 1px solid gray;
font-size: 14px;
border-left: 1px solid gray;
@media (max-width: ${mobileBreakPoint}){
  width: ${props => widths[props.column]}vw;
}

`

export const SlotRow = styled.tr`
  background-color: ${mediumBlue};
  &:nth-child(odd) {
    background-color: ${lightBlue};
  }
`;

export const StandingsContainer = styled.div`
  @media (max-width: ${mobileBreakPoint}){
  width: 100vw;
  }
`