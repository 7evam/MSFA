import React, { useState, useEffect } from 'react';
// import useRoster from './useRoster';
// import MonthTicker from '../../components/MonthTicker';
// import RosterComponent from '../../components/Roster';
// import '@fontsource/open-sans';
import { useSelector } from 'react-redux';
import {
  Container, TeamNameContainer, TeamName, TeamOwner, Bold,
} from './components';

import Roster from '../../components/Roster2';
// import Loading from '../../components/Loading';

function Squad() {
  const { currentOrganization, name } = useSelector((state) => ({
    ...state.authReducer,
  }));

  return (
    <Container>
      <TeamNameContainer>
        <TeamName>{currentOrganization.team_name}</TeamName>
        <TeamOwner>
          Managed by
          {' '}
          <Bold>{name}</Bold>
        </TeamOwner>
      </TeamNameContainer>
      <Roster />
    </Container>
  );
}

export default Squad;
