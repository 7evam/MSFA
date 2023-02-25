import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import useApi from '../../hooks/useApi';
import Button from '../../components/Button';

const Container = styled.div`
    font-family: "helvetica neue", Helvetica, arial, sans-serif; 

    margin-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
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

const LeagueContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const ExtraSlotsContainer = styled.div`
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const SubHeader = styled.p`
    font-weight: 800;
`;

const ExtraSlot = styled.div`
    padding: 15px;
`;

const League = styled.div``;

const Option = styled.option``;

const Select = styled.select``;

function InitialInfo({ cnlProps, setStage }) {
  const { currentOrganization, organizations } = useSelector((state) => ({
    ...state.authReducer,
  }));

  const { makeRequest } = useApi();

  // const [members, setMembers] = useState(null)

  // const fetchUsersInOrg = async () => {
  //     const organization = organizations.find(org => org.id === currentOrganization.id)
  //     try {
  //         // console.log(`fetching for ${selectedRoflYear}`)
  //         var res = await makeRequest({
  //           method: "get",
  //           route: `organizations/summary/${organization.id}`
  //         });
  //         console.log('here is res')
  //         console.log(res.body)
  //         if(res.body && res.body.members && res.body.members.length){
  //             setMembers(res.body.members)
  //         }

  //       } catch (e) {
  //         console.error(e);
  //       }
  // }

  const {
    handleChange,
    values,
    addMember,
    removeMember,
    submitInitial,
  } = cnlProps;

  return (
    <Container>
      <SubHeader>MSFA League Name</SubHeader>
      <Form>
        <Input
          disabled
          name="leagueName"
          placeholder="MSFA League Name"
          type="text"
          value={values.leagueName}
          onChange={handleChange}
        />

        <SubHeader>Members</SubHeader>
        {
            values.members.map((member, i) => (
              <div key={`member-${i}-name`}>
                <Input
                  disabled
                  id={i}
                  name="memberName"
                  placeholder="Member Name"
                  type="text"
                  value={member.memberName}
                  onChange={handleChange}
                />
                <Input

                  disabled
                  id={i}
                  name="memberEmail"
                  placeholder="Member Email"
                  type="text"
                  value={member.memberEmail}
                  onChange={handleChange}
                />
                <button disabled type="button" onClick={() => removeMember(i)}>x</button>
              </div>
            ))
        }
        <br />
        <button disabled type="button" onClick={addMember}>Add Member</button>

        <SubHeader>Leagues</SubHeader>
        <LeagueContainer>
          <League>
            MLB
            {' '}
            <input type="checkbox" name="mlb" checked disabled />
          </League>
          <League>
            NFL
            {' '}
            <input type="checkbox" name="nfl" checked disabled />
          </League>
          <League>
            NBA
            {' '}
            <input type="checkbox" name="nba" checked disabled />
          </League>
          <League>
            NHL
            {' '}
            <input type="checkbox" name="nhl" checked disabled />
          </League>
        </LeagueContainer>
        <ExtraSlotsContainer>
          <ExtraSlot>
            <p>Flex Spots</p>
          </ExtraSlot>
          <ExtraSlot>
            <Select defaultValue={1}>
              <Option disabled value={1}>1</Option>
            </Select>
          </ExtraSlot>
          <ExtraSlot>
            <p>Bench Spots</p>
          </ExtraSlot>
          <ExtraSlot>
            <Select defaultValue={3}>
              <Option disabled value={3}>3</Option>
            </Select>
          </ExtraSlot>
        </ExtraSlotsContainer>
      </Form>
      <br />
      <Button onClick={submitInitial}>Submit</Button>
    </Container>
  );
}

export default InitialInfo;
