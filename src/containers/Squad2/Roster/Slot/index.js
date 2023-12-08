import React, { useState, useEffect } from 'react';
import {
  FirstItem, Item, PointsItem, ActionButton,
} from './components';
import lock from '../../../../icons/lock';

function Slot({
  slotName,
  teamName,
  isLocked,
  points,
  isLastInList,
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
          <FirstItem stylisLastInList={isLastInList}>{slotName.toUpperCase()}</FirstItem>
          <Item isLastInList={isLastInList}>{teamName}</Item>
          <Item isLastInList={isLastInList}>
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
          <Item isLastInList={isLastInList}>{points}</Item>
        </>
      )
  );
}

export default Slot;
