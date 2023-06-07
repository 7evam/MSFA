/* eslint-disable no-nested-ternary */
import React from 'react';
import styled from 'styled-components';
import useResetPassword from './useResetPassword';
import { Logo } from '../../App/Sidebar/components';
import { blue } from '../../constants/style';
import Loading from '../../components/Loading';

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

function ResetPassword(props) {
  const {
    setValues,
    readyToRender,
    handleReset,
    values,
    goToAbout,
    isLoading,
    resetCode,
    handleChange,
  } = useResetPassword(props);

  console.log('in reset password');
  console.log(values);

  return (
    readyToRender
      ? resetCode ? (
        <Container>
          <Headline>
            Hi
            {' '}
            {values.name}
            , let's reset your password
          </Headline>
          <Logo onClick={goToAbout} style={{ marginLeft: '140px', cursor: 'pointer' }} src="https://rofl-public-assets.s3.us-east-2.amazonaws.com/MSFALogoRectangle.png" alt="roflLogo" />
          <Input
            name="email"
            placeholder="Email"
            type="text"
            value={values.email}
            disabled
          />
          <Input
            name="password"
            placeholder="New Password"
            type="password"
            value={values.password}
            onChange={handleChange}
          />
          <Input
            name="confirmPassword"
            placeholder="Confirm Password"
            type="password"
            value={values.confirmPassword}
            onChange={handleChange}
          />
          <LogInButton type="button" disabled={isLoading} onClick={handleReset}>{isLoading ? 'Loading...' : 'Reset'}</LogInButton>
        </Container>
      ) : <div>Reset code not found</div>
      : <Loading />
  );
}

export default ResetPassword;
