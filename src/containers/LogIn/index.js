import React from 'react';
import useLogIn from './useLogIn'
import styled from 'styled-components';

const Container =  styled.div``

const InputLabel = styled.label``

const Input = styled.input`
  height: 50px;
  width: 340px;
  border: 0;
  border-radius: 4px;
  padding-left: 20px;
  font-size: 0.9em;
  background-color: #ECF1F4;
`;

function LogIn(props) {
  const {
      handleLogIn,
      handleChange,
      values,
      isLoading
  } = useLogIn()

  return (
    <Container>
        <p>Log In</p>
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
        <button type='button' disabled={isLoading} onClick={handleLogIn}>{isLoading ? 'Loading...' : 'Log In'}</button>
    </Container>
  )
}

export default LogIn
