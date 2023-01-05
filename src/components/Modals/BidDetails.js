import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useApi from "../../hooks/useApi";
import {toast} from 'react-toastify'
import {Container, TopBar, CloseContainer, TopText, CloseButton, BottomBar, BottomButton, Title, MainContent, RowContainer, TeamRow, TeamText} from './TeamSelect/components'
import styled from "styled-components";
import { mediumBlue, lightBlue } from "../../constants/style";

const Td = styled.td`
    width: 33%;
    height: 20px;
`

const Tr = styled.tr`
background-color: ${mediumBlue};
    &:nth-child(odd) {
    background-color: ${lightBlue};
    }
`

const Table = styled.table`
    width: 100%;
`

const BidContainer = styled.div``





// export const TeamRow = styled.div`
//   display: flex;
//   align-items: center;
//   flex-direction: row;
//   justify-content: space-between;
//   background-color: ${lightBlue};
//   &:nth-child(odd) {
//     background-color: ${mediumBlue};
//   }
// `;



function BidDetails() {

    const {sportTeams,playoffMonths, activeYears} = useSelector((state) => ({
        ...state.sportReducer
    }))

    const { props } = useSelector((state) => ({
        ...state.modalReducer
      }));

      const { currentOrganization } = useSelector((state) => ({
        ...state.authReducer
    }));


    const {makeRequest, isLoading} = useApi()

    const dispatch = useDispatch()

    const transformBid = (bid) => {
        return {
            "Bidding For": toTeamName(bid.team_id),
            "Bid Value": `$${bid.bid_value}`,
            "Priority": bid.priority,
            "Bid Processes": `Rofl Month ${bid.rofl_month}`,
            "First Dropped Team": toTeamName(bid.dropped_team_1),
            "Second Dropped Team": toTeamName(bid.dropped_team_2),
            "Third Dropped Team": toTeamName(bid.dropped_team_3),
        }
    }

    const toTeamName = (id) => {
        if (!id) return null;
        const leagueId = Number(String(id)[0]);
        const team = sportTeams[leagueId][id];
        return `${team.city} ${team.name}`;
      };

    const deleteBid = async (bidId) => {
        console.log("here iis bid id")
        console.log(bidId)
        const isConfirmed = confirm("Are you sure you want to delete this bid?")
        if(!isConfirmed){
            return
        }
        try {
          var res = await makeRequest({
            method: "delete",
            route: `users/bids/delete/${bidId}`
          });
          const body = res.body;
          //   if success show message
          if (body === "success") {
            toast.success("Sucessfully deleted bid");
          }
        } catch (e) {
          console.log("problem");
          console.error(e);
        }
      };

  const closeModal = () => {
        dispatch({
            type: "CLOSE_MODAL",
        });
   }

   const bid = transformBid(props.bid)

   console.log("here is bid")
   console.log(props.bid)

  return <Container>
    <TopBar>
    <div></div>
    <Title>
        Bid Details
    </Title>
    <CloseContainer>
    <CloseButton onClick={closeModal}>
    X
    </CloseButton>
    </CloseContainer>
    </TopBar>
    <MainContent>
    <BidContainer>
    <Table>
          {
              Object.keys(bid).map(key => (
                  bid[key] ? <Tr><Td><b>{key}</b>:</Td><Td>{bid[key]}</Td></Tr> : null
              ))
          }
          </Table>
    </BidContainer>
    </MainContent>
    <BottomBar>
        {props.bid.current ? <BottomButton style={{backgroundColor: "red"}}onClick={() => deleteBid(bid.id)}>Delete</BottomButton> : null}
    
    </BottomBar>
  </Container>
}

export default BidDetails;


