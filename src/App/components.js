import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components';
import {mobileBreakPoint} from '../constants/style'

export const Container = styled.div`
  font-family: "Ariel", sans-serif;
  margin-top: -8px;
`;

export const ContentContainer = styled.div`
  padding-top: 70px; 
  display: flex;
  justify-content: center;
  @media (max-width: ${mobileBreakPoint}){
    padding-top: 100px;
  }
`