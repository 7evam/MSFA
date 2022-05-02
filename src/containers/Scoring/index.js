import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { useSelector, useDispatch } from 'react-redux';

const Container = styled.div`
    margin-top: 40px;
`;

function Scoring(props) {

    const {organizations, currentOrganization} = useSelector(state => ({
        ...state.authReducer
    }))

    const {makeRequest} = useApi()

    useEffect(() => {
        fetchScores()
      }, []);

    const [scores, setScores] = useState(false)

    const fetchScores = async () => {
        var res = await makeRequest({
            method: "get",
            route: `/sports/scores/${currentOrganization.id}/${2022}`
          });
          if(res.statusCode === 200){
              const scores = JSON.parse(res.body)
              console.log('here are scores')
              console.log(scores)
              setScores(scores)
          }
    }
    
    

  return (
      <Container>
          {scores ? <>hi</> : <p>Loading...</p>}
      </Container>
  );
}

export default Scoring;
