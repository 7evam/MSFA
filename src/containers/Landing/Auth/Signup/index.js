import React from 'react';
import Mail from '../../../../icons/mail.js';
import * as components from '../../components.js';

const {
  InputContainer, IconWrapper, Label, Input, Button, BottomText, P, Link,
} = components;

function Signup({ authProps }) {
  const {
    handleLogIn,
    handleChange,
    values,
    registerValues,
    handleRegisterChange,
    isLoading,
    handleRegister,
    entryModeLogIn,
    setDisplay,
    display,
    goToAbout,
    handleReset,
    setValues,
  } = authProps;
  return (
    <>
      <InputContainer>
        <IconWrapper>
          <Mail width={20} height={20} />
        </IconWrapper>
        <Label>Email</Label>
        <Input
          name="email"
          placeholder="example@msfa.com"
          type="text"
          mail
          value={registerValues.email}
          onChange={handleRegisterChange}
        />
      </InputContainer>
      <InputContainer>
        <Label>Password</Label>
        <Input
          name="password"
          placeholder="********"
          type="password"
          value={registerValues.password}
          onChange={handleRegisterChange}
        />
      </InputContainer>
      <InputContainer>
        <Label>Confirm Password</Label>
        <Input
          name="confirmPassword"
          placeholder="********"
          type="password"
          value={registerValues.confirmPassword}
          onChange={handleRegisterChange}
        />
      </InputContainer>
      <Button type="button" disabled={isLoading} onClick={handleRegister}>{isLoading ? 'Loading...' : 'Register'}</Button>
      <BottomText>
        <P>
          Have an Account?
          {' '}
          <Link onClick={() => setDisplay('login')}>Log In</Link>
        </P>
      </BottomText>
    </>
  );
}

export default Signup;
