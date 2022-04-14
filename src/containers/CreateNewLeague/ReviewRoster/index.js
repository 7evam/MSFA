import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
    margin-top: 40px;
`;

const ReadOnlyRoster = styled.div`
  border: 1px solid black;
`
const Slot = styled.div``

const RosterContainer = styled.div``

function ReviewRoster({cnlProps}){

    const {
        memberRosters,
        submitFinalRoster
    } = cnlProps

  return (
    <Container>
        <p>Review Roster</p>
          <RosterContainer>
          {memberRosters.map(roster => (
            <ReadOnlyRoster>
              <p>{roster.name}'s roster</p>
              <p>Cash: {roster.cash}</p>
              {Object.keys(roster).filter(slot => slot !== 'name' && slot!=='cash' && slot !== 'email').map((slot, i) => (
                <Slot key={`${slot}-${i}-reviewRoster`}>
                    <p>{slot} - {roster[slot].name} - ${roster[slot].value}</p>
                </Slot>
          ))}
            </ReadOnlyRoster>
          ))}
          </RosterContainer>
        <button onClick={submitFinalRoster}>Submit</button>
    </Container>
  );
}

export default ReviewRoster;
