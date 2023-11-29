import React from 'react';
import styled from 'styled-components';

// index.js
const backgroundImg = 'https://rofl-public-assets.s3.us-east-2.amazonaws.com/homepageMobileBkg.png';

export const IndexContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #010626;
  height: 100vw
`;

export const LandingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 20px 50px 20px;
  background: linear-gradient(0deg, rgba(3, 16, 89, 0.50) 0%, rgba(3, 16, 89, 0.50) 100%), url(${backgroundImg}), lightgray 50% / cover no-repeat;
  `;

export const Headline = styled.h1`
  font-family: arial;
  font-size: 30px;
  font-weight: 600;
  color: white;
  text-align: center;
  padding: 0 10px 0 10px;
`;

export const SubHeadline = styled.h2`
  font-family: arial;
  font-size: 16px;
  font-weight: 400;
  color: #DBDBDB;
  text-align: center;
  padding: 0 50px 0 50px;
`;

export const LogInContainer = styled.div``;

export const LogoContainer = styled.div`
    height: 200px;
`;

export const Footer = styled.div`
  padding-top: 50px;
  font-family: arial;
  color: white; 
  letter-spacing: 1px;
  text-align: center;
  background-color: #010626;
`;

// Auth Components

export const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px 20px 50px 20px;
  font-family: Arial;
  background-color: white;
`;

export const Input = styled.input`
  font-family: "helvetica neue", Helvetica, arial, sans-serif; 
  line-height: 40px;
  width: 100%;
  border: 0;
  font-size: 0.9em;
  text-indent: ${(props) => (props.mail ? '30px' : '20px')}; 
  margin: 10px 0px 10px 0px;
  border-radius: 9px;
  outline: 1px solid #72696B;
  font-size: 16px;
`;

export const Label = styled.label`
    font-size: 16px;
    font-weight: 500;
`;
export const Button = styled.button`
  border-radius: 9px;
  background-color: #F25C05;
  color: white;
  height: 38px;
  border-style: solid;
  font-size: 16px;
`;
export const BottomText = styled.div`
    text-align: center;
`;

export const P = styled.p``;

export const Link = styled.span`
    text-decoration: underline;
    color: #F25C05;
    cursor: pointer;
    &:hover{
        font-weight: 600;
    }
`;

export const IconWrapper = styled.div`
    position: absolute;
    transform: translateY(40px);
    margin-left: 8px;
`;
