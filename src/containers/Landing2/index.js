import React, { lazy, Suspense } from 'react';
import styled from 'styled-components';
import Logo from '../../icons/msfaLogo.js'
import mobileBkg from './homepageMobileBkg.png'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  margin-left: 20px;
`;

const Headline = styled.h1`
  font-family: "helvetica neue", Helvetica, arial, sans-serif; 
  font-size: 20px;
`;

const SubHeadline = styled.h2`
  font-family: "helvetica neue", Helvetica, arial, sans-serif; 
  font-size: 16px;

`;

const LandingContainer = styled.div`
    background-image: url(mobileBkg);
    background-size: cover;
`

const LogoContainer = styled.div`
    height: 200px;
`


function Landing() {
    return (
      <Container>
        <LandingContainer>
        <Logo
            width={152}
            height={141}
        />
                <Headline>Welcome to the Multi-Sport Fantasy Association</Headline>
                <SubHeadline>Embrace team spirit in fantasy sports by drafting teams instead of players</SubHeadline>
        </LandingContainer>
      </Container>
    );
  }
  
  export default Landing;
  