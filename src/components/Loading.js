import React from 'react';
import styled, {keyframes} from 'styled-components'
import { blue } from '../constants/style';

const spinner = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
`
const Loader = styled.div`
    border: 16px solid #f3f3f3;
    border-top: 16px solid ${blue}; 
    border-radius: 50%;
    width: 300px;
    height: 300px;
    animation: ${spinner} 2s linear infinite;
    position: fixed;
`


function Loading() {
    return(
        <Container>
        <Loader></Loader>
        <img src="https://rofl-public-assets.s3.us-east-2.amazonaws.com/MSFALogo.PNG" height="300" width="300"/>
        </Container>
    )
}


export default Loading