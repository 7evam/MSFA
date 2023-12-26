import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { mobileBreakPoint } from '../../constants/style';

const SchemeContainer = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr 1fr; 
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    width: 90%;
`;

const Cell = styled.div`
padding: 16px 0px 8px 16px;
border-bottom: ${(props) => (props.isLastInList ? null : '2px solid #E5EAF4')}; 
background-color: lightBlue;
`;

function Scheme() {
  return (
    <SchemeContainer>
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
    </SchemeContainer>
  );
}

export default Scheme;
