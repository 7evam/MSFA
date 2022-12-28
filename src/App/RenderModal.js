import React from 'react';
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import SubmitBid from '../components/Modals/SubmitBid';
import AddTeam from '../components/Modals/AddTeam';
import ProposeTrade from '../components/Modals/ProposeTrade';

const ModalContainer = styled.div`
    margin-left: 170px;
    margin-top: 30px;
    position: fixed;
    top: 8%;
    left: 10%;
    right: 10%;
    bottom: 10%;
    background-color: grey;
    z-index: 4;
    border: 1px solid black;
`

function RenderModal() {

    const dispatch = useDispatch()

    const { modalContent } = useSelector(state => ({
        ...state.modalReducer
      }));

      const getContent = () => {
        switch(modalContent){
            case "SUBMIT_BID":
                return <SubmitBid/>
            case "ADD_TEAM":
                return <AddTeam/>
            case "PROPOSE_TRADE":
                return <ProposeTrade/>
            default:
                return <p>Modal not found</p>
        }
    }

    const closeModal = () => {
        dispatch({
            type: "CLOSE_MODAL",
          });
    }

    return(
     modalContent ?   
    <ModalContainer>
        {getContent()}
        <button onClick={closeModal}>Close</button>
    </ModalContainer>
    : null
    )
}


export default RenderModal