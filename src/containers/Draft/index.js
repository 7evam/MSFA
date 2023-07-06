import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { mobileBreakPoint } from '../../constants/style';
import DraftTopBar from './DraftTopBar';

function Draft(props) {
  const Container = styled.div`
    display: flex;
    justify-content: center;
    @media (max-width: ${mobileBreakPoint}){
        width: 100vw;
    }

  `;
  return (
    <>
      <DraftTopBar />
      <Outlet />
    </>
  );
}

export default Draft;
