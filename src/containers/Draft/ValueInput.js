import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { mobileBreakPoint } from '../../constants/style';
import TeamList from './TeamList';

function ValueInput({ selectedTeam, updateValue, removeTeam }) {
  const [value, setValue] = useState(selectedTeam.value);
  return (
    <>
      <input key={selectedTeam.name} type="number" value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={() => removeTeam(selectedTeam.name)}>{selectedTeam.removed ? 'Un-Remove' : 'Remove'}</button>
      <button onClick={() => updateValue(value, selectedTeam.name)}>Update</button>
    </>
  );
}

export default ValueInput;
