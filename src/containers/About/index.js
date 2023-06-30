import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { blue } from '../../constants/style';
import { Logo } from '../../App/Sidebar/components';
import IconLeft from '../../icons/iconLeft';
import Collapsable from '../../components/Collapsable';

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
  const [entryModeGuide, setEntryModeGuide] = useState(false);

  const FAQCollapsables = [
    {
      title: 'How do you play?',
      text: 'MSFA is an original fantasy sports concept where participants draft entire teams instead of players. Participants form their rosters with teams from the MLB, NFL, NHL and NBA and score points based how many wins their teams get in the regular season and how well they do in the playoffs. The concept was created by a group of friends who shared a love for fantasy sports but wanted a more meaningful experience. Instead of being fixated on individual stats, MSFA immersers participants in the same goal as athletes themselves: the pursuit of victory.',
    },
    {
      title: 'What is a season?',
      text: 'A MSFA season lasts from the start of the MLB season in April until the end of the NBA and NHL playoffs the following year. Each season consists of multiple MSFA months which mimic (but aren’t always exactly the same as) the calendar months of the year. Each player must finalize their roster for each MSFA month before the month begins and will score points based on the teams they include in their starting slots. A month will always have the same start and end dates as the corresponding calendar month unless the regular season or playoffs for a league are starting or ending.',
    },
    {
      title: 'What is a roster?',
      text: 'A roster consists of multiple months that each have multiple slots. In the initial months before the MLB season ends each roster has one slot for each league, 1 flex spot that counts toward scoring and 3 bench spots. Bench spots and flex spots can be filled with a team from any league while league slots can only be filled by a team from a corresponding league. A valid roster must have at least one team from each league and no more than 3 teams from any one league. Once a league’s season ends, the league’s slot and a bench slot are removed from each participants roster. Participants must choose which team they will drop at the end of a season if this leaves them with more teams than fit in their roster.',
    },
    {
      title: 'How does regular season scoring work?',
      text: 'At the start of each league’s MSFA month, teams from that league in each participant’s roster lock in the slot they are in. So if you have an MLB team in your flex spot on August 31, you have until the end of the day to move the team in or out of your roster slot. Once the month starts, you will receive points for each regular season win. Generally, MLB teams score 1 point per win, NFL teams 10 points, NHL teams score 1 point per overtime loss and NBA and NHL teams score 2 points per win. Teams can also score a playoff bonus during the regular season for clinching the playoffs.',
    },
    {
      title: 'How does playoff scoring work?',
      text: 'Each league has one playoff month. Once the playoff month starts the teams start for that month cannot be changed, even if the calendar month changes during the playoffs. A league’s playoff month starts on the first day of a playoff matchup for that league, even if it doesn’t correspond to the start of a calendar month. If a league’s playoffs start on January 15, then the regular season ends on January 14 and the playoff month starts on January 15. This leads to some regular season months being longer or shorter than a calendar month. MSFA scoring is designed so that every game counts for something, so in a playoff series teams score points for winning games in a series they eventually lose, lose points for losing games in a series they eventually win and, of course, score more points for winning a series.',
    },
    {
      title: 'Are there midseason trades?',
      text: 'Yes! You can offer trades mid season. When a trade is accepted, each participant’s roster is updated for the next MSFA month.',
    },
    {
      title: 'Can you add teams that nobody owns midseason?',
      text: 'Yes! In the app there is a list of teams that are currently unowned. You may place a bid for any of these teams before the waiver deadline. Each team can bid with the MSFA cash leftover from their auction draft. At the waiver deadline, the bids will process and whoever has the highest bid for each team will win the team. Dropping a team gives you the MSFA cash back. The cash from teams you conditionally drop in a bid can be used in a bid.',
    },
    {
      title: 'How does bidding work?',
      text: (
        <>
          Bidding can get complicated with multiple participants placing
          multiple bids. If a participant places multiple bids,
          they can prioritize their bids based on which teams they’d
          prefer to get. This comes in handy if winning one bid renders
          another bid invalid based on roster slots or lack of MSFA cash.
          It can also be a determining factor on who wins a bid. Teams are
          awarded to a participant based on, in order:
          <ol>
            <li>The bid value</li>
            <li>The priority set (highest priority wins)</li>
            <li>Time bid was submitted (earliest wins)</li>
          </ol>
        </>),
    },
    {
      title: 'When does the season end?',
      text: 'The season ends once both the NBA and NHL playoffs have concluded. Since the season is long about half the league is typically eliminated by this time, but since the most points are scored in the playoffs and half of the leagues have their playoffs at the end of the season, big exciting swings typically happen right at the end of the season.',
    },

  ];

  const GuideCollapsables = [
    {
      title: 'Squad',
      text: 'On this page you can see the teams you have started in each slot for each month, see how many points they have scored, and adjust your roster for all future months.',
    },
    {
      title: 'League',
      text: 'This shows you the current standings of your league based on total points throughout the season or based on each MSFA month. You can also click on each team to see their roster for each month and an overview of how they’ve scored each month.',
    },
    {
      title: 'Scoring',
      text: 'The scoring page shows a breakdown of how each MLB NFL NHL and NBA team has scored for each month, their records for each month, and a scheme that shows how many points a team from each league scores for winning regular season games or playoff games',
    },
    {
      title: 'Transactions',
      text: 'Here you can alter your roster with trades and bids on unowned teams. The rosters tab shows each participant’s current roster of teams that they can trade or drop for future months and allows participants to offer trades. The unowned teams tab shows all unowned teams and allows a participant to place a bid on any unowned team. The current bids tab shows any current bids a participant has placed and allows them to re-order their priority. The trades tab shows any past and pending trades.',
    },
  ];

  return (
    <>
      <BackButton onClick={() => navigate(-1)}>
        {IconLeft}
      </BackButton>
      <Container>

        <Headline>About MSFA - Multi-Sport Fantasy Association</Headline>
        <Logo src="https://rofl-public-assets.s3.us-east-2.amazonaws.com/MSFALogoRectangle.png" alt="roflLogo" />

        <EntryModes>
          <SelectEntryMode first selected={!entryModeGuide} onClick={() => setEntryModeGuide(!entryModeGuide)}>FAQ</SelectEntryMode>
          <SelectEntryMode selected={entryModeGuide} onClick={() => setEntryModeGuide(!entryModeGuide)}>Guide</SelectEntryMode>
        </EntryModes>
        {entryModeGuide
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
