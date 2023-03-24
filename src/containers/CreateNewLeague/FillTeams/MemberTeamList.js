import React from 'react';
import styled from 'styled-components';
import Slot from './Slot';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const MemberName = styled.p`
    font-family: "helvetica neue", Helvetica, arial, sans-serif; 
    font-size: 16px;
    font-weight: 800;
`;

function MemberTeamList({
  currentMember, changeTeamInput, getAutocompleteSuggestions, changeTeamValue, slotHashMap,
}) {
  return (
    <Container>
      <MemberName>{currentMember.name}</MemberName>
      <p>
        Cash:
        {' '}
        {currentMember.cash}
      </p>
      {
          Object.keys(currentMember).filter((slot) => slot !== 'name' && slot !== 'cash' && slot !== 'email' && slot !== 'tempId').map((slot, i) => (
            <Slot key={`${slot}-${i}-memberTeamList`} slot={slot} changeTeamValue={changeTeamValue} currentMember={currentMember} changeTeamInput={changeTeamInput} slotHashMap={slotHashMap} getAutocompleteSuggestions={getAutocompleteSuggestions} />
          ))
        }
    </Container>
  );
}

export default MemberTeamList;
