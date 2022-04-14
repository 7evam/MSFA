import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import Autocomplete from './Autocomplete';
import Datalist from './Datalist'
import Slot from './Slot'

const Container = styled.div``;
const TeamValue = styled.div``
const TeamName = styled.div``
const SlotContent = styled.div``
const SlotName = styled.div``

function MemberTeamList({currentMember, changeTeamInput, getAutocompleteSuggestions, changeTeamValue}) {

  return (
    <Container>
      <p>{currentMember.name}</p>
      <p>Cash: {currentMember.cash}</p>
        {
          Object.keys(currentMember).filter(slot => slot !== 'name' && slot!=='cash').map((slot, i) => (
          <Slot key={`${slot}-${i}-memberTeamList`} slot={slot} changeTeamValue={changeTeamValue} currentMember={currentMember} changeTeamInput={changeTeamInput} getAutocompleteSuggestions={getAutocompleteSuggestions}/>
          ))
        }
    </Container>
  );
}

export default MemberTeamList;