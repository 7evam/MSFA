import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {useSelector} from 'react-redux'
import Loading from "./Loading";
import useApi from '../hooks/useApi'
import { convertMonthToReadable } from "../utils";

const Container = styled.div`
`;

const Td = styled.td`
  padding: 12px;
  &:hover {
    font-weight: 700;
    text-decoration: underline;
    cursor: pointer;
  }
`;

function MonthlyPoints({roflYear}) {

    const {currentOrganization} = useSelector(state => ({
        ...state.authReducer
    }))

    const userId = currentOrganization.user_id

    const {makeRequest} = useApi()

    const [standings, setStandings] = useState(null)

    useEffect(() => {
        fetchStandings()
    }, []);

    const fetchStandings = async () => {
        var res = await makeRequest({
            method: "get",
            route: `/organizations/memberStandings/${currentOrganization.id}/${roflYear}`
          });
          const body = JSON.parse(res.body)
          console.log('here is body')
          console.log(body)
          setStandings(body)
    }

  return (
      standings ? 
        <Container>
            <tr>
            <Td>
              <strong>Month</strong>
            </Td>
            <Td>
              <strong>Monthly Points</strong>
            </Td>
            <Td>
              <strong>Total points</strong>
            </Td>
          </tr>
          {Object.keys(standings).map((val, index) => {
              const currentUser = standings[val].find(el => el.userId == userId)
              return(
                <tr key={index}>
                    <Td>{convertMonthToReadable(val.split('-')[0], 2022)}</Td>
                    <Td>{currentUser.monthlyPoints}</Td>
                    <Td>{currentUser.cumulativePoints}</Td>
                </tr>
              )
           })}
        </Container>
        : <p>Loading...</p>
  );
}

export default MonthlyPoints;
