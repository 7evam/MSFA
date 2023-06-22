import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { mobileBreakPoint } from '../constants/style';

export const Container = styled.div`
  font-family: "Ariel", sans-serif;
  margin-top: -8px;

`;

export const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  filter: ${(props) => (props.modal ? 'blur(2px)' : null)}; 
  overflow-y: ${(props) => (props.modal ? 'hidden' : 'scroll')}; 

`;
