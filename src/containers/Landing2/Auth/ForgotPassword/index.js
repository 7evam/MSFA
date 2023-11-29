import React from 'react';
import Mail from '../../../../icons/mail.js';
import * as components from '../../components.js';

const {
  IconWrapper, Label, Input, Button, BottomText, P, Link,
} = components;

function ForgotPassword({ authProps }) {
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
      <IconWrapper>
        <Mail width={20} height={20} />
      </IconWrapper>
      <Label>Email</Label>
      <Input
        name="resetEmail"
        placeholder="example@msfa.com"
        type="text"
        mail
        value={values.resetEmail}
        onChange={handleChange}
      />

      <Button type="button" disabled={isLoading} onClick={handleReset}>{isLoading ? 'Loading...' : 'Send Reset Link'}</Button>
      <BottomText>
        <P>
          <Link onClick={() => setDisplay('login')}>Back to Login</Link>
        </P>
      </BottomText>
    </>
  );
}

export default ForgotPassword;
