import React, { useState, useEffect } from 'react';
// import useRoster from './useRoster';
// import MonthTicker from '../../components/MonthTicker';
// import RosterComponent from '../../components/Roster';
// import '@fontsource/open-sans';
import {
  Container, TeamNameContainer, TeamName, TeamOwner, Bold,
} from './components';
// import Loading from '../../components/Loading';

import MonthSelector from './MonthSelector';

function Roster() {
  return (
    <Container>
      <TeamNameContainer>
        <TeamName>Evan's Team</TeamName>
        <TeamOwner>
          Managed by
          {' '}
          <Bold>Evan</Bold>
        </TeamOwner>
      </TeamNameContainer>

      <MonthSelector />
    </Container>
  );
}

export default Roster;
