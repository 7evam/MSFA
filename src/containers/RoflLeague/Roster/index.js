import React, { useState, useEffect } from "react";
import styled from "styled-components";
import RosterComponent from "../../../components/Roster";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import useApi from "../../../hooks/useApi";
import MonthTicker from "../../../components/MonthTicker";
import MonthlyPoints from "../../../components/MonthlyPoints";

const Container = styled.div`
    margin-top: 50px;
`;

function Roster(props) {

    const {currentOrganization} = useSelector(state => ({
        ...state.authReducer
      }));
    
    const history = useHistory()

      const { makeRequest, isLoading } = useApi();

    let { userId, roflMonth, roflYear } = useParams();

    const [fullRoster, setFullRoster] = useState(null)
    const [selectedRoflMonth, setSelectedRoflMonth] = useState(roflMonth)
    const [memberInfo, setMemberInfo] = useState(null)

    useEffect(() => {
      const abortController = new AbortController()
      fetchOrgInfo(abortController)
      fetchRoster(abortController)
      return () => abortController.abort()
    }, []);

    const fetchInfo = () => {
      fetchOrgInfo()
      fetchRoster()
    }

    useEffect(() => {
        if(selectedRoflMonth){
            history.push(`/rofleague/${userId}/${roflYear}/${selectedRoflMonth}`)
        }
    }, [selectedRoflMonth]);

    const fetchOrgInfo = async (abort) => {
      // TODO optimize this
      // store it in redux and check if it exists before adding
      try{
        var res = await makeRequest({
            method: "get",
            route: `organizations/summary/${currentOrganization.id}`,
            continueLoading: true,
            abort: abort
          });
          if(res.statusCode == 200){
            const body = res.body
            const member = body.members.find(mem => mem.user_id === Number(userId))
            setMemberInfo(member)
          } else{
            throw ("Unable to fetch org info")
          }     
      } catch(e){
        console.log('problem')
        console.log('here is params')
        console.log(currentOrganization.id)
        console.error(e)
      }
    }

    const fetchRoster = async (abort) => {
        try{
            var res = await makeRequest({
                method: "get",
                route: `/users/roster/${userId}/${currentOrganization.id}/${roflYear}`,
                abort
              });
              const roster = res.body
              setFullRoster(roster)
        } catch(e){
          console.log('problem')
          console.log('here is params')
          console.log(currentOrganization.id)
          console.error(e)
        }
    }

  return (
    <Container>
        <button onClick={() => history.push('/rofleague')}>Back to Standings</button>
        
        {
        isLoading
        ? 
        <p>loading...</p>
        :
        fullRoster && memberInfo && fullRoster[`${selectedRoflMonth}-${roflYear}`] ?
        <>
        <div><p>Roster for {memberInfo?.team_name} managed by {memberInfo.name}</p></div>
        <MonthlyPoints userId={userId} roflYear={roflYear}/>
        <MonthTicker
            roflMonth={selectedRoflMonth}
            setRoflMonth={setSelectedRoflMonth}
            selectedRoflYear={roflYear}
          />
        <RosterComponent
            selectedRoflYear={roflYear}
            currentMonthRoster={fullRoster[`${selectedRoflMonth}-${roflYear}`]}
            roflMonth={selectedRoflMonth}
            readOnly={true}
          />
          </>
          : <p>Loadinig..</p>
        }
        
    </Container>
    
  );
}

export default Roster;


