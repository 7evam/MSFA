import React from 'react';
import styled from 'styled-components';
import { mobileBreakPoint, lightBlue } from '../../constants/style';

const backgroundImg = 'https://rofl-public-assets.s3.us-east-2.amazonaws.com/26057+1.png';

export const TeamNameContainer = styled.div`
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

export const TeamName = styled.p`
  font-size: 24px;
  margin: 0;
  font-weight: 800;
`;
export const TeamOwner = styled.p`
  font-size: 12px;
  margin: 0;
  font-weight: 400;
  margin-left: 1px;
`;

export const Bold = styled.span`
    font-weight: 800;
`;
