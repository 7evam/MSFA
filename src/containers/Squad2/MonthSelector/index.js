import React, { useState, useEffect } from 'react';
// import useRoster from './useRoster';
// import MonthTicker from '../../components/MonthTicker';
// import RosterComponent from '../../components/Roster';
// import '@fontsource/open-sans';
import styled from 'styled-components';
import IconRight from '../../../icons/iconRight';
import arrowClickable from '../../../icons/arrowClickable';

const Container = styled.div`
  width: 86%;
  height; 90px;
  border-radius: 10px;
  background: #4E871F;
  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.12), 0px 0px 4px 0px rgba(0, 0, 0, 0.04), 0px 4px 8px 0px rgba(0, 0, 0, 0.08);
  padding: 0 3%;
  color: white;
  font-family: Inter;
`;

const MonthText = styled.p`
  display: flex;
  justify-content: space-between;
  
`;

function MonthSelector() {
  return (
    <Container>
      <MonthText>
        <span style={{ transform: 'scale(-1,1)' }}>{arrowClickable}</span>
        <span>September 2023</span>
        <span>{arrowClickable}</span>
      </MonthText>
    </Container>
  );
}

export default MonthSelector;
