import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useCreateNewLeague from "./useCreateNewLeague";
// import Autocomplete from './Autocomplete';
import Datalist from './Datalist'
import Slot from './Slot'

const Container = styled.div``;
const TeamValue = styled.div``
const TeamName = styled.div``
const SlotContent = styled.div``
const SlotName = styled.div``

function MemberTeamList({currentMember, changeTeamInput, getAutocompleteSuggestions}) {

  return (
    <Container>
      <p>{currentMember.name}</p>
        {
          Object.keys(currentMember).filter(slot => slot !== 'name').map(slot => (
          <Slot slot={slot} currentMember={currentMember} changeTeamInput={changeTeamInput} getAutocompleteSuggestions={getAutocompleteSuggestions}/>
          ))
        }
    </Container>
  );
}

export default MemberTeamList;