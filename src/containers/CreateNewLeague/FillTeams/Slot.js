import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// import Autocomplete from './Autocomplete';
import CurrencyInput from 'react-currency-input-field';
import Datalist from './Datalist';

const TeamValue = styled.div``;
const TeamName = styled.div``;
const SlotContent = styled.div``;
const SlotName = styled.div``;
const Container = styled.div``;

function Slot({
  slot, currentMember, changeTeamInput, getAutocompleteSuggestions, changeTeamValue,
}) {
  const suggestions = getAutocompleteSuggestions(slot, currentMember.name);

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
          <CurrencyInput
            prefix="$"
            placeholder="Cash Value"
            defaultValue={0}
            value={currentMember[slot].value}
            onValueChange={(value) => changeTeamValue(value, slot)}
            allowDecimals={false}
            allowNegativeValue={false}
          />
        </TeamValue>
      </SlotContent>
    </Container>
  );
}

export default Slot;
