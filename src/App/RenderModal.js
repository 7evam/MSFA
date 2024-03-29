import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import SubmitBid from '../components/Modals/SubmitBid';
import AddTeam from '../components/Modals/AddTeam';
import ProposeTrade from '../components/Modals/ProposeTrade';
import BidDetails from '../components/Modals/BidDetails';
import { lightBlue, mobileBreakPoint } from '../constants/style';

// const ModalContainer = styled.div`
//     margin-left: 170px;
//     margin-top: 30px;
//     position: fixed;
//     top: 8%;
//     left: 10%;
//     right: 10%;
//     bottom: 10%;
//     background-color: ${lightBlue};
//     z-index: 4;
//     border: 1px solid black;
// `

const ModalContainer = styled.div`
    position: fixed;
    top: 10px;
    left: 10%;
    right: 10%;
    background-color: ${lightBlue};
    z-index: 4;
    border: 1px solid black;
    z-index: 100;
    max-height: 90vh;
    overflow-y: auto;
    @media (max-width: ${mobileBreakPoint}){
        top: 10px;
        left: 10px;
        right: 10px;
        overflow-y: scroll;
        height: 100%;
        z-index: 10;
      }
`;

function RenderModal() {
  const { modalContent } = useSelector((state) => ({
    ...state.modalReducer,
  }));

  const getContent = () => {
    switch (modalContent) {
      case 'SUBMIT_BID':
        return <SubmitBid />;
      case 'ADD_TEAM':
        return <AddTeam />;
      case 'PROPOSE_TRADE':
        return <ProposeTrade />;
      case 'BID_DETAILS':
        return <BidDetails />;
      default:
        return <p>Modal not found</p>;
    }
  };

  return (
    modalContent
      ? (
        <ModalContainer>
          {getContent()}
        </ModalContainer>
      )
      : null
  );
}

export default RenderModal;
