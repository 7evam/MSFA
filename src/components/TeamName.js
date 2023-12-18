import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const backgroundImg = 'https://rofl-public-assets.s3.us-east-2.amazonaws.com/26057+1.png';

const TeamNameContainer = styled.div`
    color: white;
    height: 90px;
    width: 94%;
    border-radius: 10px;
    background: linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url(${backgroundImg});
    background-size: cover;
    background-position: 50% 55%;
    border-radius: 10px;
    font-family: Inter;
    font-family: "Inter", sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding-bottom: 8px;
    padding-left: 8px;
    margin-bottom: 20px;
    `;

const TeamNameText = styled.p`
  font-size: 24px;
  margin: 0;
  font-weight: 800;
`;
const TeamOwner = styled.p`
  font-size: 12px;
  margin: 0;
  font-weight: 400;
  margin-left: 1px;
`;

const Bold = styled.span`
    font-weight: 800;
`;

function TeamName({ userId }) {
  console.log('here is user id');
  console.log(userId);

  const { orgMembers } = useSelector((state) => ({
    ...state.sportReducer,
  }));

  console.log('here is org memebers');
  console.log(orgMembers);

  const user = orgMembers && orgMembers[userId];

  return (
    user
      ? (
        <TeamNameContainer>
          <TeamNameText>{user.team_name}</TeamNameText>
          <TeamOwner>
            Managed by
            {' '}
            <Bold>{user.name}</Bold>
          </TeamOwner>
        </TeamNameContainer>
      ) : null
  );
}

export default TeamName;
