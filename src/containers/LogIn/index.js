import React from 'react';
import useLogIn from './useLogIn'
import styled from 'styled-components';

const Container =  styled.div``

function LogIn(props) {
  const {
      test
  } = useLogIn()

  return (
    <Container>
        <p>Log In</p>
        <button onClick={test}>Click Me</button>
    </Container>
  )
}

export default LogIn
