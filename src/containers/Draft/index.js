import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { mobileBreakPoint } from '../../constants/style';
import DraftTopBar from './DraftTopBar';

const Container = styled.div`
display: flex;
justify-content: center;
@media (max-width: ${mobileBreakPoint}){
    width: 100vw;
}
`;

function Draft(props) {
  return (
    <>
      <DraftTopBar />
      <Outlet />
    </>
  );
}

export default Draft;
