import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { mobileBreakPoint } from '../../constants/style';
import TeamName from '../../components/TeamName';
import Roster from '../../components/Roster';

const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  @media (max-width: ${mobileBreakPoint}){
      width: 100vw;
  }
`;

function Squad() {
  const { currentOrganization } = useSelector((state) => ({
    ...state.authReducer,
  }));
  return (
    <Container>
      <TeamName userId={currentOrganization.user_id} />
      <Roster />
    </Container>
  );
}

export default Squad;
