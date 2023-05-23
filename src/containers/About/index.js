import React, { useState } from 'react';
import styled from 'styled-components';
// import useLogIn from './useLogIn';
import { useHistory } from 'react-router-dom';
import { blue } from '../../constants/style';
import { Logo } from '../../App/Sidebar/components';
import IconLeft from '../../icons/iconLeft';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Headline = styled.h1`
  font-family: "helvetica neue", Helvetica, arial, sans-serif; 
  font-size: 20px;
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

const BackButton = styled.a`
    display: flex;
    justify-content: left;
    align-items: center;
    margin-top: 15px;
    margin-left: 15px;
    cursor: pointer;
    &:hover{
        text-decoration: underline;
    }
`;

const P = styled.p`
  max-width: 500px;
`;

function About(props) {
  const history = useHistory();
  const [entryModeGuide, setEntryModeGuide] = useState(true);

  return (
    <>
      <BackButton onClick={() => history.goBack()}>
        {' '}
        <span>{IconLeft}</span>
        {' '}
        Back
      </BackButton>
      <Container>

        <Headline>About MSFA - Multi-Sport Fantasy Association</Headline>
        <Logo src="https://rofl-public-assets.s3.us-east-2.amazonaws.com/MSFALogoRectangle.png" alt="roflLogo" />

        <EntryModes>
          <SelectEntryMode selected={entryModeGuide} onClick={() => setEntryModeGuide(!entryModeGuide)}>Guide</SelectEntryMode>
          <SelectEntryMode selected={!entryModeGuide} onClick={() => setEntryModeGuide(!entryModeGuide)}>FAQ</SelectEntryMode>
        </EntryModes>
        {entryModeGuide
          ? (
            <div>
              <h1>Guide</h1>
              <h2>Squad</h2>
              <P>
                On this page you can see the teams you have started in each slot for each month, see how many points they have scored, and adjust your roster for future months.
              </P>
            </div>
          )
          : (
            <div>
              <h1>FAQ</h1>
              <h2>What is a season?</h2>
              <P>A season lasts from the start of the MLB season in April until the end of the NBA and NHL playoffs the following year. Each season consists of multiple MSFA months which mimic (but aren’t always exactly the same as) the calendar months of the year. Each player must finalize their roster for each MSFA month before the month begins and will score points based on the teams they include in their starting slots. A month will always have the same start and end dates as the corresponding calendar month unless the regular season or playoffs for a league are starting or ending.</P>
            </div>
          )}
      </Container>
    </>
  );
}

export default About;
