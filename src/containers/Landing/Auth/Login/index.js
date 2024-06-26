import React from 'react';
import Mail from '../../../../icons/mail.js';
import * as components from '../../components.js';

const {
  IconWrapper, Label, InputContainer, Input, Button, BottomText, P, Link,
} = components;

function Login({ authProps }) {
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
      <InputContainer className="InputContainer">
        <IconWrapper className="IconWrapper">
          <Mail width={20} height={20} />
        </IconWrapper>
        <Label>Email</Label>
        <Input
          name="email"
          placeholder="example@msfa.com"
          type="text"
          mail
          value={values.email}
          onChange={handleChange}
        />
      </InputContainer>
      <InputContainer>
        <Label>Password</Label>
        <Input
          name="password"
          placeholder="********"
          type="password"
          value={values.password}
          onChange={handleChange}
        />
      </InputContainer>
      <InputContainer>
        <Button type="button" disabled={isLoading} onClick={handleLogIn}>{isLoading ? 'Loading...' : 'Log In'}</Button>
      </InputContainer>
      <BottomText>
        <P>
          Don't have an account?
          {' '}
          <Link content={"Create an account"} onClick={() => setDisplay('signup')}>Create an account</Link>
        </P>
        <P>
          Forgot your password?
          {' '}
          <Link content={"Reset it here"} onClick={() => setDisplay('forgotPassword')}>Reset it here</Link>
        </P>
      </BottomText>
    </>
  );
}

export default Login;
