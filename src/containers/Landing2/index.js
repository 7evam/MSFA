import React, { lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../icons/msfaLogo.js';
import SecondLogo from '../../icons/secondLogo.js';
import Auth from './Auth';
import * as components from './components.js';

const {
  IndexContainer, LandingContainer, Headline, SubHeadline, Footer, Link,
} = components;

function Landing() {
  const navigate = useNavigate();
  const goToAbout = () => {
    navigate('/about');
    navigate(0);
  };
  return (
    <IndexContainer>
      <LandingContainer>
        <Logo
          width={152}
          height={141}
        />
        <Headline>Welcome to the Multi-Sport Fantasy Association</Headline>
        <SubHeadline>
          Embrace team spirit in fantasy sports by drafting teams from the four major sports instead of players. If your teams win, you win!
          Want to learn more about how it all works?
          {' '}
          {' '}
          <Link onClick={goToAbout}>Click here!</Link>
        </SubHeadline>
      </LandingContainer>
      <Auth />
      <Footer>
        <SecondLogo
          height={32}
          width={32}
        />
        <p>© 2023 MSFA</p>
      </Footer>
    </IndexContainer>
  );
}

export default Landing;
