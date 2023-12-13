import React from 'react';
import {
  FirstItem, Item, PointsItem, ActionButton,
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
}) {
  return (
    isTotalPoints
      ? (
        <>
          <PointsItem />
          <PointsItem />
          <PointsItem>Total Points</PointsItem>
          <Item><b>{totalScore}</b></Item>
        </>
      )
      : (
        <>
          <FirstItem>{slotName.toUpperCase()}</FirstItem>
          <Item>{teamName}</Item>
          <Item action>
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
          <Item>{points}</Item>
        </>
      )
  );
}

export default Slot;
