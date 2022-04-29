import React, { useState, useEffect } from "react";
import styled from "styled-components";
import RosterComponent from "../../../components/Roster";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useApi from "../../../hooks/useApi";
import MonthTicker from "../../../components/MonthTicker";

const Container = styled.div`
    margin-top: 50px;
`;

function Roster(props) {

    const {currentOrganization} = useSelector(state => ({
        ...state.authReducer
      }));

      const { makeRequest, isLoading } = useApi();

    let { userId, roflMonth, roflYear } = useParams();

    const [fullRoster, setFullRoster] = useState(null)
    const [selectedRoflMonth, setSelectedRoflMonth] = useState(roflMonth)

    useEffect(() => {
        fetchRoster()
    }, []);

    const fetchRoster = async () => {
        try{
            var res = await makeRequest({
                method: "get",
                route: `/users/roster/${userId}/${currentOrganization.id}/${roflYear}`
              });
              const roster = JSON.parse(res.body)
              setFullRoster(roster)
        } catch(e){
          console.log('problem')
          console.log('here is params')
          console.log(currentOrganization.id)
          console.error(e)
        }
    }
    console.log('here is full then current month roster')
    console.log(fullRoster)
    const currentMonthRoster = fullRoster ? fullRoster[`${roflMonth}-${roflYear}`] : null
    console.log(currentMonthRoster)
  return (
    <Container>
        <MonthTicker
            roflMonth={selectedRoflMonth}
            setRoflMonth={setSelectedRoflMonth}
            selectedRoflYear={roflYear}
          />
        {
        currentMonthRoster
        ? 
        <RosterComponent
            selectedRoflYear={roflYear}
            currentMonthRoster={currentMonthRoster}
            roflMonth={selectedRoflMonth}
            readOnly={true}
          />
        :
          <p>loading...</p>
        }
        
    </Container>
    
  );
}

export default Roster;
