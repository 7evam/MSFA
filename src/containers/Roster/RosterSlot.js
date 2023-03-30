import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Slot = styled.div`
  margin-top: 25px;
`;
const SelectButton = styled.button`
background: ${(props) => (props.selectedSlot && props.selectedSlot === props.name ? 'darkred' : 'limegreen')}
`;

function RosterSlot({
  isLocked, isInactive, test, teamInfo, slotName, leagueName, selectedSlot,
}) {
  return (
    isInactive ? null
      : (
        <Slot>
          {slotName}
          :
          {' '}
          {teamInfo.city}
          {' '}
          {teamInfo.name}
          {isLocked ? ' - Locked' : <SelectButton selectedSlot={selectedSlot} name={leagueName} onClick={() => test(leagueName)}>Move</SelectButton>}
        </Slot>
      )

  );
}

export default RosterSlot;
