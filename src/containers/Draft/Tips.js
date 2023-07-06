import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { mobileBreakPoint } from '../../constants/style';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "helvetica neue", Helvetica, arial, sans-serif; 

    @media (max-width: ${mobileBreakPoint}){
        width: 100vw;
    }
  `;
const Title = styled.h1``;
const Tip = styled.h2`
width: 70vw;
`;
const Text = styled.p`
    width: 65vw;
  `;

function Tips(props) {
  return (
    <Container>
      <Title>MSFA Draft Tips</Title>
      <Text>
        The MSFA draft is the most important part of the season.
        Although successful teams from each league score approximately the same amount of points,
        the number of games in each league’s regular season and the length of each league’s
        season adds some interesting twists. For example, the best teams in the NFL play
        only 17 games in a season and have a much higher winning percentage than the best
        teams in the MLB who play 162 games. On the flip side, it’s also more likely for an
        NFL team to have one major injury and hardly win a game the rest of the season.
        This makes the NFL a high-risk high-reward league and the MLB a
        lower-risk lower-reward league.
        Here are some top tips to keep in mind for the draft:
      </Text>

      <Tip>
        1. Championships will win you the league
      </Tip>
      <Text>
        When a team wins the championship, they get
        24 points more than any other team PLUS credit for all
        the other playoff games they won along the way.
        These teams are super valuable and you should be
        willing to pay a huge premium for a team you think
        can win it all.
      </Text>
      <Tip>
        2. Regular season counts most in the NFL
      </Tip>
      <Text>
        The NFL is the most high-risk high-reward league.
        Since the best teams in the NFL have a very high
        regular season winning percentage and the
        playoff bonus is lowest in the NFL,
        you can win the league by drafting NFL
        teams that do well during the regular season
      </Text>
      <Tip>
        3. Playoffs count most in the MLB
      </Tip>
      <Text>
        To counteract for the relatively low winning percentage that MLB teams have,
        they have the highest playoff bonus of all the leagues. Drafting multiple MLB
        teams that make the playoffs can be a huge bonus.
      </Text>
      <Tip>
        4. The NBA and NHL seasons are far away
      </Tip>
      <Text>
        Depending on when you are drafting, the NBA and NHL seasons might not have started
        free agency yet. There is less certainty for how each team's roster will look so
        they can be de-valued a little during the MSFA draft. There is also an opportunity to
        add surprise playoff teams later during the season. If too many people de-value NBA or NHL
        teams during the draft though, this would be a great time to secure a top team for later
        in the MSFA season.
      </Text>
    </Container>
  );
}

export default Tips;
