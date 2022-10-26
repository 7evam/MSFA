import React from "react";
import styled from "styled-components";
import {red, blue, mediumBlue, lightBlue} from '../../constants/style'

export const Container = styled.div`
  margin-top: 50px;
  width: 500px;
  margin-bottom: 100px;
  display: flex;
  flex-direction: row;
`;

export const LeagueSelector = styled.div`
  display: flex;
  flex-direction: row;
`;

export const League = styled.p`
  margin-right: 10px;
  &:hover {
    font-weight: 700;
    text-decoration: underline;
    cursor: pointer;
  }
  font-weight: ${(props) => (props.selected ? "700" : "400")};
`;

export const TabSelector = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Tab = styled.p`
  margin-right: 10px;
  &:hover {
    font-weight: 700;
    text-decoration: underline;
    cursor: pointer;
  }
  font-weight: ${(props) => (props.selected ? "700" : "400")};
`;

// const red  = '#DA2929'
export const Table = styled.table``;

export const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid gray;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  border-left: 1px solid gray;
`;

export const TitleRow = styled.tr`
    background-color: ${red}
`;

export const Th = styled.th`
padding: 12px;
border-bottom: 1px solid gray;
font-family: "Roboto", sans-serif;
font-size: 14px;
border-left: 1px solid gray;
`

// export const Tbody = styled.tbody`

// `;

export const slotData = styled.td`
  padding: 12px;
  border-bottom: 1px solid gray;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  border-left: 1px solid gray;
`;

export const SlotRow = styled.tr`
  background-color: ${mediumBlue};
  &:nth-child(odd) {
    background-color: ${lightBlue};
  }
`;

export const ActionButton = styled.button`
    padding:0.35em 1.2em;
    border:0.1em solid #FFFFFF;
    margin:0 0.3em 0.3em 0;
    border-radius:0.12em;
    box-sizing: border-box;
    text-decoration:none;
    font-family:'Roboto',sans-serif;
    font-weight:300;
    color:${blue};
    text-align:center;
    background-color: ${lightBlue};
    &:hover {
        cursor: pointer;
      }
`
export const Headline = styled.h1`
      font-size: 24px;
      font-family:'Roboto',sans-serif;      
      color: ${blue}
`

export const Label = styled.label`
    font-size: 24px;
    font-family:'Roboto',sans-serif;      
    color: ${blue}
`

export const CashContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-family: "Roboto", sans-serif;
  font-size: 18px;
`;

export const Select = styled.select`
    height: 40px;
    background-color: ${lightBlue};
    font-weight: 800;
    padding-left: 10px;
    font-family: "Roboto", sans-serif;
`
export const Section = styled.div`
      margin-right: 100px;
`