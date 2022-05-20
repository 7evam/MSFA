import React from "react";
import styled from "styled-components";
import {red, blue, mediumBlue, lightBlue} from '../../../constants/style'

export const Container = styled.div``;
export const Td = styled.td`
  padding: 12px;
  &:hover {
    font-weight: 700;
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const YearContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-family: "Roboto", sans-serif;
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
    background-color: ${red}
`;

export const Th = styled.th`
padding: 12px;
border-bottom: 1px solid gray;
font-family: "Roboto", sans-serif;
font-size: 14px;
border-left: 1px solid gray;
`

export const SlotRow = styled.tr`
  background-color: ${mediumBlue};
  &:nth-child(odd) {
    background-color: ${lightBlue};
  }
`;