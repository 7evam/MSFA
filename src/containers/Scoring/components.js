import React from "react";
import styled from "styled-components";
import { lightBlue, mobileBreakPoint } from "../../constants/style";

export const Container = styled.div`
margin-top: 20px;
@media (max-width: ${mobileBreakPoint}){
    width: 100vw;
  }
`;

export const LeagueSelector = styled.div`
  display: flex;
  flex-direction: row;
  width: 700px;
  justify-content: space-evenly;
  background-color: ${lightBlue};
  height: 30px;
  align-items: center;
  @media (max-width: ${mobileBreakPoint}){
    width: 100vw;
  }
`;

export const DisplaySelector = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  background-color: #FFCCCB;
  height: 30px;
  align-items: center;
  width: 700px;
  @media (max-width: ${mobileBreakPoint}){
    width: 100vw;
  }
`;

export const ScItem = styled.p`
  margin-right: 10px;
  &:hover {
    font-weight: 700;
    text-decoration: underline;
    cursor: pointer;
  }
  font-weight: ${(props) => (props.selected ? "700" : "400")};
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

