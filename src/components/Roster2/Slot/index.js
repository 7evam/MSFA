import React from 'react';
import {
  FirstItem, Item, PointsItem, ActionButton, TPText,
} from './components';
import lock from '../../../icons/lock';

function Slot({
  slotName,
  teamName,
  isLocked,
  points,
  isTotalPoints,
  changeRoster,
  leagueKey,
  selectedSlot,
  totalScore,
  readOnly,
}) {
  return (
    isTotalPoints
      ? (
        <>
          <PointsItem />
          {readOnly ? null : <PointsItem />}
          <PointsItem><TPText>Total Points</TPText></PointsItem>
          <Item><b>{totalScore}</b></Item>
        </>
      )
      : (
        <>
          <FirstItem>{slotName.toUpperCase()}</FirstItem>
          <Item>{teamName}</Item>
          {
            readOnly ? null : (
              <Item action lock>
                {isLocked
                  ? lock
                  : (
                    <ActionButton
                      leagueKey={leagueKey}
                      selectedSlot={selectedSlot}
                      onClick={() => changeRoster(leagueKey)}
                    >
                      Move
                    </ActionButton>
                  )}
                {' '}
              </Item>
            )
          }

          <Item>{points}</Item>
        </>
      )
  );
}

export default Slot;
