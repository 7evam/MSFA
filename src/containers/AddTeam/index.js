import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import "@fontsource/open-sans";
import useApi from "../../hooks/useApi";
import RosterComponent from '../../components/Roster'
import Loading from "../../components/Loading";


const Container = styled.div`
  width: 500px;
`;

const LeagueSelector = styled.div`
  display: flex;
  flex-direction: row;
`;

const League = styled.p`
  margin-right: 10px;
  &:hover {
    font-weight: 700;
    text-decoration: underline;
    cursor: pointer;
  }
  font-weight: ${(props) => (props.selected ? "700" : "400")};
`;

const LeftArrow = styled.div``
const RightArrow = styled.div``

function AddTeam(props) {

    const { currentOrganization } = useSelector((state) => ({
        ...state.authReducer
      }));

      const {makeRequest, isLoading} = useApi()
    
    // const { activeYears, currentDate } = useSelector((state) => ({
    //     ...state.sportReducer
    // }));

    const [roflMonth, setRoflMonth] = useState(2)
    const [currentMonthRoster, setCurrentMonthRoster] = useState(null)
    const [fullRoster, setFullRoster] = useState(null)
    const [members, setMembers] = useState(null)
    const [memberHash, setMemberHash] = useState(null)
    const [selectedMember, setSelectedMember] = useState(currentOrganization.user_id)
    const [teams, setTeams] = useState(null)
    const [unownedTeams, setUnownedTeams] = useState(null)
    const [league, setLeague] = useState(1)

    useEffect(() => {
        fetchRoster(2022)
        fetchOrgInfo()
        fetchTeams()
    }, []);

    useEffect(() => {
        if(fullRoster && teams && Object.keys(teams).length){
            // get owned teams
            let ownedTeams = []
            Object.keys(fullRoster).forEach(member => {
                Object.keys(fullRoster[member]).forEach(slot => {
                    ownedTeams.push(fullRoster[member][slot].teamId)
                })
            })

            let unownedTeams = {
                1: [],
                2: [],
                3: [],
                4: []
            }
            // add team to unowned if its not in owned teams array
            for(let league in teams){
                Object.keys(teams[league]).forEach(team => {
                    if(!ownedTeams.includes(Number(team))){
                        unownedTeams[league].push(team)
                    }
                })
            }
            setUnownedTeams(unownedTeams)
        }
    }, [teams]);


    // fetch current teams
    const fetchRoster = async (selectedRoflYear) => {
        try {
          var res = await makeRequest({
            method: "get",
            route: `users/currentTeams/${currentOrganization.id}/2022`
          });
          const body = res.body
          setFullRoster(body)
          setCurrentMonthRoster(body[currentOrganization.user_id])
        //   setRoster(JSON.parse(res.body));
        } catch (e) {
          console.log("problem");
          console.error(e);
        }
      };

    const fetchOrgInfo = async (abort) => {
        // TODO optimize this
        // store it in redux and check if it exists before adding
        try{
          var res = await makeRequest({
              method: "get",
              route: `organizations/summary/${currentOrganization.id}`,
              continueLoading: true,
            //   abort
            });
            if(res.statusCode == 200){
              const body = res.body
              const members = body.members
              const hash = {}
              members.forEach(member => {
                  hash[member.user_id] = {...member}
              })
              setMemberHash(hash)
              setMembers(Object.keys(hash))
            //   setMemberInfo(member)
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

    const handleChange = (userId) => {
        setCurrentMonthRoster(fullRoster[userId])
        setSelectedMember(userId)
    }

    const fetchTeams = async () => {
        const leagueIds = [1,2,3,4]
        const teams = {}
        for(let id of leagueIds){
            teams[id] = await getTeamsByLeagueId(id)
        }
        setTeams(teams)
    }

    const getTeamsByLeagueId = async(leagueId) => {
        var res = await makeRequest({
            method: 'get',
            route: `/sports/teams/${leagueId}`
        })
        const response = res.body
        const table = {}
        response.forEach(team => {
            table[team.id] = {...team}
        })
        return table
    }

  return (
    currentMonthRoster && members && teams && unownedTeams ?
    <Container>
        <p>Add Team</p>
        <p>Add Team</p>
        <h1>Current Rosters</h1>
        <label>Choose a member</label>
        <select value={selectedMember} onChange={e => handleChange(e.target.value)}name="currentTeams">
        {
            members.map(member => (
                <option key={member} value={member}>{memberHash[member].team_name}</option>
            ))
        }
        </select>
        <h2>Here is roster</h2>
        <p>RoFL cash: ${currentMonthRoster.cash}</p>
        {
            Object.keys(currentMonthRoster).filter(el => el!=='cash').map(el => {
                let teamId = currentMonthRoster[el].teamId
                let leagueId = currentMonthRoster[el].leagueId
                if(currentMonthRoster[el].teamId) {
                    return(
                        <div key={el}>
                        <p>{teams[leagueId][teamId].city} {teams[leagueId][teamId].name} - ${currentMonthRoster[el].val}</p>
                        {/* <button>{selectedMember === currentOrganization.user_id ? "Trade" : "Drop"}</button> */}
                        </div>
                        )
                }
            })
        }
        
        <LeagueSelector>
            <League selected={league == 1} onClick={() => setLeague(1)}>
              MLB
            </League>
            <League selected={league == 2} onClick={() => setLeague(2)}>
              NFL
            </League>
            <League selected={league == 3} onClick={() => setLeague(3)}>
              NHL
            </League>
            <League selected={league == 4} onClick={() => setLeague(4)}>
              NBA
            </League>
          </LeagueSelector>
        <h3>Unowned Teams</h3>
          {unownedTeams[league].map(team => (
              <p>{teams[league][team].city} {teams[league][team].name}</p>
          ))}
 
    </Container>  : <Loading/>
  );
}

export default AddTeam;
