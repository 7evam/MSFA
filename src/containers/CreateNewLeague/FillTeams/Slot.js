import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// import Autocomplete from './Autocomplete';
import CurrencyInput from 'react-currency-input-field';
import Datalist from './Datalist';

const TeamValue = styled.div``;
const TeamName = styled.div``;
const SlotContent = styled.div`
  display: flex;
  flex-direction: column;
`;
const SlotName = styled.div``;
const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const marginBetweenInputs = '5px';

function Slot({
  slot, slotHashMap, currentMember, changeTeamInput, getAutocompleteSuggestions, changeTeamValue,
}) {
  const suggestions = getAutocompleteSuggestions(slot, currentMember.name);

  return (
    <Container key={slot}>
      <SlotContent>
        <SlotName>{slotHashMap[slot]}</SlotName>
        <TeamName>
          <Datalist
            slot={slot}
            currentMemberName={currentMember.name}
            changeTeamInput={changeTeamInput}
            inputValue={currentMember[slot].name}
            suggestions={suggestions}

          />
        </TeamName>
      </SlotContent>
      <SlotContent>
        <SlotName style={{ marginLeft: marginBetweenInputs }}>Cash Value</SlotName>
        <TeamValue>
          <CurrencyInput
            prefix="$"
            placeholder="Cash Value"
            defaultValue={0}
            value={currentMember[slot].value}
            onValueChange={(value) => changeTeamValue(value, slot)}
            allowDecimals={false}
            allowNegativeValue={false}
            style={{ height: '30px', border: '1px solid #999', marginLeft: marginBetweenInputs }}
          />
        </TeamValue>
      </SlotContent>
    </Container>
  );
}

export default Slot;
