import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    margin-top: 40px;
`;

const Input = styled.input`
  height: 50px;
  width: 340px;
  border: 0;
  border-radius: 4px;
  padding-left: 20px;
  font-size: 0.9em;
  background-color: #ECF1F4;
`;

const Option = styled.option``;

const Select = styled.select``;

function InitialInfo({ cnlProps, setStage }) {
  const {
    handleChange,
    values,
    addMember,
    removeMember,
    submitInitial,
  } = cnlProps;

  return (
    <Container>
      <p>Create New MSFA League</p>
      <form>
        <Input
          name="leagueName"
          placeholder="MSFA League Name"
          type="text"
          value={values.leagueName}
          onChange={handleChange}
        />
        <br />
        <p>Members</p>
        {
            values.members.map((member, i) => (
              <div key={`member-${i}-name`}>
                <Input
                  id={i}
                  name="memberName"
                  placeholder="Member Name"
                  type="text"
                  value={member.memberName}
                  onChange={handleChange}
                />
                <Input
                  disabled={i === 0}
                  id={i}
                  name="memberEmail"
                  placeholder="Member Email"
                  type="text"
                  value={member.memberEmail}
                  onChange={handleChange}
                />
                <button type="button" disabled={values.members.length <= 5} onClick={() => removeMember(i)}>x</button>
              </div>
            ))
        }
        <br />
        <button type="button" onClick={addMember} disabled={values.members.length >= 12}>Add Member</button>

        <p>Leagues</p>
        MLB
        {' '}
        <input type="checkbox" name="mlb" checked disabled />
        <br />
        NFL
        {' '}
        <input type="checkbox" name="nfl" checked disabled />
        <br />
        NBA
        {' '}
        <input type="checkbox" name="nba" checked disabled />
        <br />
        NHL
        {' '}
        <input type="checkbox" name="nhl" checked disabled />
        <br />
        <p>Flex Spots</p>
        <Select defaultValue={1}>
          <Option disabled value={1}>1</Option>
        </Select>
        <p>Bench Spots</p>
        <Select defaultValue={3}>
          <Option disabled value={3}>3</Option>
        </Select>
      </form>
      <br />
      <button onClick={submitInitial}>Submit</button>
    </Container>
  );
}

export default InitialInfo;
