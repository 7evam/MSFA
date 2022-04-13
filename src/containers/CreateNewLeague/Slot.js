import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useCreateNewLeague from "./useCreateNewLeague";
// import Autocomplete from './Autocomplete';
import Datalist from './Datalist'

const TeamValue = styled.div``
const TeamName = styled.div``
const SlotContent = styled.div``
const SlotName = styled.div``
const Container = styled.div``

function Slot({slot, currentMember, changeTeamInput, getAutocompleteSuggestions}) {

    const suggestions = getAutocompleteSuggestions(slot, currentMember.name)
    console.log('suggestions for slot')
    console.log(slot)
    console.log(suggestions)
    console.log('-----')

  return (
    <Container key={slot}>
      <SlotName>{slot}</SlotName>
      <SlotContent>
        <TeamName>
          <Datalist
            slot={slot}
            currentMemberName={currentMember.name}
            changeTeamInput={changeTeamInput}
            inputValue={currentMember[slot].name}
            suggestions={suggestions}
          />
        </TeamName>
        <TeamValue>
          $10
        </TeamValue>
      </SlotContent>
    </Container>
  );
}

export default Slot;