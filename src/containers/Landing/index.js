import React from 'react';
import styled from 'styled-components';
import useLogIn from './useLogIn';
import { Logo } from '../../App/Sidebar/components';
import { blue } from '../../constants/style';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  margin-left: 20px;
`;

const InputLabel = styled.label``;

const Headline = styled.h1`
  font-family: "helvetica neue", Helvetica, arial, sans-serif; 
  font-size: 20px;
`;

const LogInButton = styled.button`
  width: 100%;
  height: 40px;
  cursor: pointer;
  background:#ccc; 
  font-family: "helvetica neue", Helvetica, arial, sans-serif; 
  font-weight: 800;
  font-size: 18px;

`;

const Input = styled.input`
font-family: "helvetica neue", Helvetica, arial, sans-serif; 

  height: 50px;
  width: 100%;
  border: 0;
  border-radius: 4px;
  font-size: 0.9em;
  background-color: #ECF1F4;
  text-indent: 20px;
  margin-bottom: 10px;
`;

const EntryModes = styled.div`
  display: flex;
  flex-direction: row;
  
`;

const SelectEntryMode = styled.p`
  margin-right: 50px;
  font-size: 18px;
  font-weight: ${(props) => (props.selected ? '700' : '400')};
  text-decoration: ${(props) => (props.selected ? 'underline' : 'none')};
  cursor: pointer;
  color: ${blue};
  &:hover {
    font-weight: 700;
    text-decoration: underline;
    cursor: pointer;
  }

`;

function Landing(props) {
  const {
    handleLogIn,
    handleChange,
    values,
    registerValues,
    handleRegisterChange,
    handleRegister,
    isLoading,
    entryModeLogIn,
    setDisplay,
    display,
    goToAbout,
    handleReset,
  } = useLogIn();

  const displaySwitch = (display) => {
    switch (display) {
      case 'login': return (
        <>
          <Input
            name="email"
            placeholder="Email"
            type="text"
            value={values.email}
            onChange={handleChange}
          />
          <Input
            name="password"
            placeholder="Password"
            type="password"
            value={values.password}
            onChange={handleChange}
          />
          <LogInButton type="button" disabled={isLoading} onClick={handleLogIn}>{isLoading ? 'Loading...' : 'Log In'}</LogInButton>
        </>
      );
      case 'create': return (
        <>
          <Input
            name="email"
            placeholder="Email"
            type="text"
            value={registerValues.email}
            onChange={handleRegisterChange}
          />
          <Input
            name="password"
            placeholder="Password"
            type="password"
            value={registerValues.password}
            onChange={handleRegisterChange}
          />
          <Input
            name="confirmPassword"
            placeholder="Confirm Password"
            type="password"
            value={registerValues.confirmPassword}
            onChange={handleRegisterChange}
          />
          <LogInButton type="button" disabled={isLoading} onClick={handleRegister}>{isLoading ? 'Loading...' : 'Register'}</LogInButton>
        </>
      );
      case 'forgot': return (
        <>
          <p>
            IMPORTANT: The reset password feature is in an early stage.
            If you haven't reset your password before, please send an email to
            {' '}
            <a href="mailto:roflcommish@gmail.com?subject=Allow my Email&body=Hi Commish, I would like to reset my password. Can you please allow the email address I am sending this message from? Thank you">roflcommish@gmail.com</a>
            {' '}
            to add your email to the allow list
          </p>
          <Input
            name="resetEmail"
            placeholder="Email"
            type="text"
            value={values.resetEmail}
            onChange={handleChange}
          />
          <LogInButton type="button" disabled={isLoading} onClick={handleReset}>{isLoading ? 'Loading...' : 'Send Reset Link'}</LogInButton>
        </>
      );
      default: return (
        <div>error</div>
      );
    }
  };

  return (
    <Container>
      <Headline>Welcome to MSFA - Multi-Sport Fantasy Association</Headline>
      <Logo onClick={goToAbout} style={{ marginLeft: '140px', cursor: 'pointer' }} src="https://rofl-public-assets.s3.us-east-2.amazonaws.com/MSFALogoRectangle.png" alt="roflLogo" />
      <EntryModes>
        <SelectEntryMode selected={display === 'login'} onClick={() => setDisplay('login')}>Log In</SelectEntryMode>
        <SelectEntryMode selected={display === 'create'} onClick={() => setDisplay('create')}>Create Account</SelectEntryMode>
        <SelectEntryMode selected={display === 'forgot'} onClick={() => setDisplay('forgot')}>Forgot Password</SelectEntryMode>
      </EntryModes>
      {displaySwitch(display)}
    </Container>
  );
}

export default Landing;
