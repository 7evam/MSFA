import React from 'react';
import styled, { keyframes } from 'styled-components';
import { blue, mobileBreakPoint } from '../constants/style';
import Logo from '../icons/msfaLogo.js';
// import Logo from '../../icons/msfaLogo.js';

const spinner = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
`;
const Loader = styled.div`
    border: 16px solid #f3f3f3;
    border-top: 16px solid ${blue}; 
    border-radius: 50%;
    width: 200px;
    height: 200px;
    animation: ${spinner} 2s linear infinite;
    position: fixed;
`;

function Loading() {
  return (
    <Container>
      <Loader />
      <Logo
        width={150}
        height={150}
      />
    </Container>
  );
}

export default Loading;
