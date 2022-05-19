import React from "react";
import styled from "styled-components";

export const Container = styled.div`
  width: 500px;
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