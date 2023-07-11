import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { blue } from '../../constants/style';
import { Logo } from '../../App/Sidebar/components';
import IconLeft from '../../icons/iconLeft';
import Collapsable from '../../components/Collapsable';
import { FAQCollapsables, GuideCollapsables } from './collapsablleText';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Headline = styled.h1`
  font-family: "helvetica neue", Helvetica, arial, sans-serif; 
  font-size: 20px;
  padding-top: 40px;
  text-align: center;
`;

const EntryModes = styled.div`
  display: flex;
  flex-direction: row;
`;

const H1 = styled.h1`
  font-family: "helvetica neue", Helvetica, arial, sans-serif; 
`;

const SelectEntryMode = styled.p`
display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: ${(props) => (props.selected ? '700' : '400')};
  text-decoration: ${(props) => (props.selected ? 'underline' : 'none')};
  cursor: pointer;
  color: ${blue};
  padding: 0px 50px;

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
    position: fixed;
    cursor: pointer;
    &:hover{
        text-decoration: underline;
    }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

function About() {
  const navigate = useNavigate();
  const [entryModeIsGuide, setEntryModeIsGuide] = useState(false);

  return (
    <>
      <BackButton onClick={() => navigate(-1)}>
        {IconLeft}
      </BackButton>
      <Container>

        <Headline>About MSFA - Multi-Sport Fantasy Association</Headline>
        <Logo src="https://rofl-public-assets.s3.us-east-2.amazonaws.com/MSFALogoRectangle.png" alt="roflLogo" />

        <EntryModes>
          <SelectEntryMode
            first
            selected={!entryModeIsGuide}
            onClick={() => setEntryModeIsGuide(false)}
          >
            FAQ
          </SelectEntryMode>
          <SelectEntryMode
            selected={entryModeIsGuide}
            onClick={() => setEntryModeIsGuide(true)}
          >
            Guide
          </SelectEntryMode>
        </EntryModes>
        {entryModeIsGuide
          ? (
            <TextContainer>
              <H1>Site Guide</H1>
              {GuideCollapsables.map((item) => (
                <Collapsable title={item.title} text={item.text} />
              ))}
            </TextContainer>
          )
          : (
            <TextContainer>
              <H1>FAQ</H1>
              {FAQCollapsables.map((item) => (
                <Collapsable title={item.title} text={item.text} />
              ))}
            </TextContainer>
          )}
      </Container>
    </>
  );
}

export default About;
