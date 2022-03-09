import React from "react";
import styled from "styled-components";

export const Container = styled.div``;
export const Slot = styled.div`
  margin-top: 25px;
`;
export const SelectButton = styled.button`
  background: ${(props) =>
    props.selectedSlot && props.selectedSlot === props.name
      ? "darkred"
      : "limegreen"};
`;

export const BannerMessage = styled.div``;

export const MonthButton = styled.button`
  background: ${(props) => (props.selectedMonth ? "limegreen" : "white")};
`;

export const ScrollMenuContainer = styled.div`
  background-color: #333;
  width: 450px;
  display: flex;
  flex-direction: row;
`;

export const ScrollMenu = styled.div`
  overflow: auto;
  white-space: nowrap;
  display: inline-block;
  left: 100px;
`;

export const ScrollMenuLink = styled.a`
  display: inline-block;
  color: ${(props) => (props.selected ? "limegreen" : "white")};
  text-align: center;
  padding: 14px;
  text-decoration: none;
  width: 100px;
  cursor: pointer;
`;

export const ScrollMenuButton = styled.a`
  display: inline-block;
  color: white;
  text-align: center;
  padding: 14px;
  text-decoration: none;
  width: 25px;
  cursor: pointer;
`;