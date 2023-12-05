import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Slot from './Slot';

const Container = styled.div`
    margin-top: 15px;
    border: 2px solid #E5EAF4;
    border-radius: 10px;
    display: grid;
    grid-template-columns: 1fr 3fr repeat(2, 1fr);
    grid-template-rows: repeat(4, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    width: 90%;
`;

const Item = styled.div`
    padding: 16px 0px 8px 16px;
    text-align:center;
    background-color: #EAEEF480;
    font-weight: 800;
`;

// & div:nth-of-type(${(4 * 5) + 1}){
//     grid-column: 1 / span 3;
//     width: 98%;
// }
// & div:nth-of-type(${(4 * 5) + 2}){
//     grid-column: 4 / span 1;
// }

// in math above, 4 is static while 5 represetns active slots

function Roster() {
  return (
    <Container>
      <Item>Slot</Item>
      <Item>Team</Item>
      <Item>Action</Item>
      <Item>Points</Item>
      <Slot />
      <Slot />
      <Slot />
      <Slot />
      <Slot />
      <Slot isTotalPoints />
      <Slot />
      <Slot />
      <Slot />
      <Slot />
    </Container>

  );
}

export default Roster;
