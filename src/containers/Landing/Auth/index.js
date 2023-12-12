import React, { lazy, Suspense } from 'react';
import styled from 'styled-components';
import Mail from '../../../icons/mail.js';
import * as components from '../components.js';
import useAuth from './useAuth.js';
import Login from './Login';
import Signup from './Signup';
import ForgotPassword from './ForgotPassword';

const {
  AuthContainer, IconWrapper, Label, Input, Button, BottomText, P, Link,
} = components;

// inside auth container return switch
// options below change mode for switch
// each switch returns imported component
// each component defined as separate file in Auth folder (login, signup, forgot)

function Auth() {
  const authProps = useAuth();

  const authSwitch = (display) => {
    switch (display) {
      case 'login': return (
        <Login authProps={authProps} />
      );
      case 'signup': return (
        <Signup authProps={authProps} />
      );
      case 'forgotPassword': return (
        <ForgotPassword authProps={authProps} />
      );
      default: return (
        <div>error</div>
      );
    }
  };
  return (
    <AuthContainer>
      {authSwitch(authProps.display)}
    </AuthContainer>
  );
}

export default Auth;
