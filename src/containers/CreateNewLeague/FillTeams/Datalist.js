import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Input = styled.input`
    border: 1px solid #999;
    padding: 8px;
    width: 300px;
`

  const AutocompleteContainer = styled.datalist`
  border: 1px solid #999;
    border-top-width: 0;
    list-style: none;
    margin-top: 0;
    max-height: 143px;
    overflow-y: auto;
    padding-left: 0;
    width: calc(300px + 1rem);
    ` 

function Datalist({suggestions, slot, currentMemberName, changeTeamInput, inputValue}){
  return (
    <>
    <Input placeholder="team" type="text" list={`${currentMemberName}-${slot}-data`} onChange={(e) => changeTeamInput(e, slot, currentMemberName)} value={inputValue} />

    <AutocompleteContainer id={`${currentMemberName}-${slot}-data`}>
      {suggestions.map((item, key) => (
        <option key={`${item.text}-${key}-datalist`} value={item.text}/>
      ))}
    </AutocompleteContainer>
  </>
  );
}

export default Datalist;
