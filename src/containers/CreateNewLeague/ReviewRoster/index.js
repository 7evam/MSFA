import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../../../components/Button';

const Container = styled.div`
    margin-top: 40px;
   text-align: center;
    
`;

const ReadOnlyRoster = styled.div`
  

}
`;
const Slot = styled.div``;

const RosterContainer = styled.div`
display: grid;
grid-template-columns: 50% 50%;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

function ReviewRoster({ cnlProps }) {
  const {
    memberRosters,
    submitFinalRoster,
    slotHashMap,
    setStage,
  } = cnlProps;

  return (
    <Container>
      <Header>
        <Button onClick={() => setStage('fillTeams')}>Go Back</Button>
        <p>Review Roster</p>
        <div />
      </Header>
      <RosterContainer>
        {memberRosters.map((roster) => (
          <ReadOnlyRoster>
            <p>
              {roster.name}
              's roster
            </p>
            <p>
              Cash:
              {' '}
              {roster.cash}
            </p>
            {Object.keys(roster).filter((slot) => slot !== 'name' && slot !== 'cash' && slot !== 'email' && slot !== 'tempId').map((slot, i) => (
              <Slot key={`${slot}-${i}-reviewRoster`}>
                <p>
                  {slotHashMap[slot]}
                  {' '}
                  -
                  {' '}
                  {roster[slot].name ? roster[slot].name : 'EMPTY'}
                  {' '}

                  {roster[slot].value ? `- $${roster[slot].value} ` : null}
                </p>
              </Slot>
            ))}
          </ReadOnlyRoster>
        ))}
      </RosterContainer>
      <Button style={{ margin: '0 auto' }} onClick={submitFinalRoster}>Submit</Button>
    </Container>
  );
}

export default ReviewRoster;
