import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useCreateNewLeague from "./useCreateNewLeague";

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

const Option = styled.option``

const Select = styled.select``

function InitialInfo({cnlProps, setStage}){

    const {
        handleChange,
        values,
        addMember,
        removeMember,
        submitInitial
    } = cnlProps
  

  return (
    <Container>
        <p>Create New RoFL League</p>
        <form>
        <Input
            name="leagueName"
            placeholder="RoFL League Name"
            type="text"
            value={values.leagueName}
            onChange={handleChange}
        />
        <br/>
    <p>Members</p>
        {
            values.members.map((member, i) => (
            <>
            <Input
                id={i}
                name={'memberName'}
                placeholder={`Member Name`}
                type="text"
                value={member.memberName}
                onChange={handleChange}
            />
            <Input
                id={i}
                name={'memberEmail'}
                placeholder={`Member Email`}
                type="text"
                value={member.memberEmail}
                onChange={handleChange}
            />
            <button type='button' disabled={values.members.length<=5} onClick={() => removeMember(i)}>x</button>
            </>
            ))
        }
                <br/>
                <button type='button' onClick={addMember} disabled={values.members.length>=12}>Add Member</button>

        <p>Leagues</p>
        MLB <input type="checkbox" name="mlb" checked disabled></input>
        <br/>
        NFL <input type="checkbox" name="nfl" checked disabled></input>
        <br/>
        NBA <input type="checkbox" name="nba" checked disabled></input>
        <br/>
        NHL <input type="checkbox" name="nhl" checked disabled></input>
                <br/>
        <p>Flex Spots</p>
        {
            <Select>
                <Option selected disabled value={1}>1</Option>
            </Select>
        }
        <p>Bench Spots</p>
        {
            <Select>
                <Option selected disabled value={3}>3</Option>
            </Select>
        }
        </form>
        <br/>
        <button onClick={submitInitial}>Submit</button>
    </Container>
  );
}

export default InitialInfo;
