import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import TeamName from '../../components/TeamName';
import Roster from '../../components/Roster2';
import IconLeft from '../../icons/iconLeft';
import {
  Container, RosterNav, BackButton, MonthlyOrOverview, NavButton, OverviewContainer, HeaderLabel,
} from './components';
import SeasonOverview from './SeasonOverview';

function ViewRoster() {
  const { userId, roflMonth, roflYear } = useParams();

  const [showMonthly, setShowMonthly] = useState(true);

  return (
    <Container>
      <RosterNav>
        <BackButton to="/league">
          {' '}
          <span>{IconLeft}</span>
          {' '}
          Back to Standings
        </BackButton>
        <MonthlyOrOverview>
          <NavButton selected={showMonthly} onClick={() => setShowMonthly(true)}>
            Monthly
          </NavButton>
          <NavButton selected={!showMonthly} onClick={() => setShowMonthly(false)}>
            Overview
          </NavButton>
        </MonthlyOrOverview>
        <span style={{ width: '33%' }} />
      </RosterNav>
      <TeamName userId={userId} />
      {
        showMonthly
          ? <Roster readOnly userId={userId} /> : (
            <SeasonOverview userId={Number(userId)} roflYear={roflYear} />
          )
      }

    </Container>
  );
}

export default ViewRoster;
