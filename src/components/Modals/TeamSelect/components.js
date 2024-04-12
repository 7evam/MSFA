import React from "react";
import styled from 'styled-components';
import { blue, lightBlue, mediumBlue, mobileBreakPoint } from "../../../constants/style";

export const ErrorContainer = styled.div`
  color: red;
`;

export const BottomBar = styled.div`
  background-color: #4E871F;
  height: 50px;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SubmitButton = styled.button``;

export const MainContent = styled.div``;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TopBar = styled.div`
  background-color: #4E871F;
  height: 50px;
  font-size: 14px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CloseContainer = styled.div`
  height: 70%;
  margin-right: 10px;
`;

export const CloseButton = styled.button`
  height: 100%;
  width: 100%;
  color: grey;
  cursor: pointer;
`;

export const BottomButton = styled.button`
  height: 35px;
  padding: 0px 15px;
  font-size: 16px;
  font-weight: 800;
  background-color: #F7FBFF;
  border: 0px;
  border: 1px solid rgba(27, 31, 35, 0.15);
  border-radius: 6px;
  box-shadow: grey 0 1px 0;
  cursor: pointer;
  margin-left: ${(props) => (props.position === "left" ? "10px" : "0px")};
  margin-right: ${(props) => (props.position === "left" ? "0px" : "10px")};
`;

export const SelectBox = styled.input`
  display: none;
  padding: 7px;
  cursor: pointer;
  border: 1px solid black;
  color: black;
  background-color: white;
  margin-bottom: 10px;
`;

export const BoxText = styled.label`
  padding: 10px;
  cursor: pointer;
  border: 1px solid black;
  color: black;
  margin-bottom: 20px;
  background-color: ${(props) => (props.checked ? "#c7ffc8" : "#f5f5f5")};
  border-radius: 10px;
  font-size: 14px;
  font-weight: 800;
  width: 70px;
  text-align: center;
`;
export const RowContainer = styled.div``;

export const TeamRow = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${mediumBlue};
  &:nth-child(odd) {
    background-color: #F7FBFF;
  }
`;
export const TeamText = styled.p`
  margin-left: 20%;
`;

export const SelectContainer = styled.div`
  margin-right: 20%;
`;

export const TopText = styled.p`
  text-align: center;
  margin-left: 20%;
  margin-right: 20%;
`;

// box-shadow: rgba(27, 31, 35, 0.04) 0 1px 0, rgba(255, 255, 255, 0.25) 0 1px 0 inset;

export const Title = styled.h1`
  margin-left: 30px;
`;

export const currencyInputStyle = {
  width: "75px",
  padding: "12px 12px",
  margin: "4px 0",
  border: "1px solid #ccc",
  borderRadius: "4px",
  boxSizing: "border-box"
}

