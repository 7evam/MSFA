import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useCreateNewLeague from "./useCreateNewLeague";

const Container = styled.div`
    margin-top: 40px;
`;


const Input = styled.input`
    border: 1px solid #999;
    padding: 8px;
    width: 300px;
`

  const NoAutocomplete = styled.div`
  
  color: #999;
    padding: 8px;`
  

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
    
  
  const AutocompleteList = styled.li`
  padding: 8px;
  &:hover{
    background-color: darkgray;
    cursor: pointer;
    font-weight: 700;
    }
  &:not(:last-of-type){
    border-bottom: 1px solid #999;
  }
  }
  `
//   .autocomplete > .active,
//   .autocomplete li:hover {
//     background-color: darkgray;
//     cursor: pointer;
//     font-weight: 700;
//   }
//   .autocomplete li:not(:last-of-type) {
//     border-bottom: 1px solid #999;
//   }

function Autocomplete({suggestions}){

    const [active, setActive] = useState(false)
    const [filtered, setFiltered] = useState([])
    const [isShow, setIsShow] = useState(false)
    const [input, setInput] = useState("")

    const onChange = e => {
        const input = e.currentTarget.value;
        const newFilteredSuggestions = suggestions.filter(
          suggestion =>
            suggestion.toLowerCase().indexOf(input.toLowerCase()) > -1
        );
        setActive(0);
        setFiltered(suggestions)
        setFiltered(newFilteredSuggestions);
        setIsShow(true);
        setInputValue(e.currentTarget.value)
      };

    const onClick = e => {
        setActive(0);
        setFiltered([]);
        setIsShow(false);
        setInputValue(e.currentTarget.innerText)
      };

    const onKeyDown = e => {
        if (e.keyCode === 13) { // enter key
          setActive(0);
          setIsShow(false);
          setInputValue(filtered[active])
        }
        else if (e.keyCode === 38) { // up arrow
          return (active === 0) ? null : setActive(active - 1);
        }
        else if (e.keyCode === 40) { // down arrow
          return (active - 1 === filtered.length) ? null : setActive(active + 1);
        }
      };

      const renderAutocomplete = () => {
        if (isShow && inputValue) {
          if (filtered.length) {
            return (
              <AutocompleteContainer id="data">
                {filtered.map((suggestion, index) => (
                    <option value={suggestion} active={index === active ? 'active' : null} key={suggestion} onClick={onClick}>
                      {suggestion}
                    </option>
                ))}
              </AutocompleteContainer>
            );
          } else {
            return (
              <NoAutocomplete>
                <em>Not found</em>
              </NoAutocomplete>
            );
          }
        }
        return <></>;
      }
  return (
    <>
      <Input
        type="text"
        list="data"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={inputValue}
      />
      {renderAutocomplete()}
    </>
  );
}

export default Autocomplete;
