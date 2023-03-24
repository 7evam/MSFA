import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Input = styled.input`
    border: 1px solid #999;
    padding: 8px;
    width: 300px;
`;

const AutocompleteContainer = styled.datalist`
  border: 1px solid #999;
 
    list-style: none;
    margin-top: 0;
    max-height: 143px;
    overflow-y: auto;
    padding-left: 0;
    width: calc(300px + 1rem);
    height: 30px;
    `;

function Datalist({
  suggestions, slot, currentMemberEmail, changeTeamInput, inputValue, tempId,
}) {
  return (
    <>
      <Input placeholder="Team Name" type="text" list={`${tempId}-${slot}-data`} onChange={(e) => changeTeamInput(e, slot, tempId)} value={inputValue} />

      <AutocompleteContainer id={`${tempId}-${slot}-data`}>
        {suggestions.map((item, key) => (
          <option key={`${item.text}-${key}-datalist`} value={item.text} />
        ))}
      </AutocompleteContainer>
    </>
  );
}

export default Datalist;
