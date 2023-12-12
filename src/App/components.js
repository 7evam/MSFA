import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { mobileBreakPoint } from '../constants/style';

export const Container = styled.div`
  font-family: "Ariel", sans-serif;
  margin-top: -8px;

`;

export const ContentContainer = styled.div`
  
  filter: ${(props) => (props.modal ? 'blur(2px)' : null)}; 
  overflow-y: ${(props) => (props.modal ? 'hidden' : 'scroll')}; 
  @media (min-width: ${mobileBreakPoint}){
    display: grid;
    grid-template-columns: 200px 1fr;
    grid-template-rows: 90px 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
      }
`;
