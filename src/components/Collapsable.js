import React, { useState } from 'react';
import styled from 'styled-components';
// import useLogIn from './useLogIn';
import { blue, lightBlue } from '../constants/style';

const Button = styled.button`
  font-family: "helvetica neue", Helvetica, arial, sans-serif; 
  background-color: ${lightBlue};
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: center;
  outline: none;
  font-size: 20px;
  transition: 0.2s ease-out;
  display: flex;
  justify-content: space-between;
  font-weight: 500;
`;

const TitleText = styled.span`
    &:hover{
        text-decoration: underline;
    }
  `;

const Text = styled.p`
  padding-left: 15px;
  padding-right: 15px;
  transition: 0.2s ease-out;
  max-height: ${(props) => (props.active ? null : '0')};
  overflow: hidden;
  max-width: 550px;
  font-family: "helvetica neue", Helvetica, arial, sans-serif; 
`;

function Collapsable({ title, text }) {
  const [active, setActive] = useState(false);

  return (
    <div>
      <Button onClick={() => setActive(!active)}>
        <TitleText>{title}</TitleText>
        <span>{active ? '-' : '+'}</span>
      </Button>
      <Text active={active}>{text}</Text>
    </div>
  );
}

export default Collapsable;
