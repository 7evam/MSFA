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

const SelectEntryMode = styled.p`
  color: ${(props) => (props.selected ? "limegreen" : "black")};
`

console.log('in landing page')
console.log(process.env.ROFL_API_BASE_URL)

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
      setEntryModeLogIn
  } = useLogIn()

  return (
    <Container>

        <SelectEntryMode selected={entryModeLogIn} onClick={() => setEntryModeLogIn(!entryModeLogIn)}>Log In</SelectEntryMode>
        <SelectEntryMode selected={!entryModeLogIn} onClick={() => setEntryModeLogIn(!entryModeLogIn)}>Create Account</SelectEntryMode>
        {
          entryModeLogIn ?
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
        <button type='button' disabled={isLoading} onClick={handleLogIn}>{isLoading ? 'Loading...' : 'Log In'}</button>
        </> :
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
        <button type='button' disabled={isLoading} onClick={handleRegister}>{isLoading ? 'Loading...' : 'Register'}</button>
        </>
        }
        
    </Container>
  )
}

export default Landing
