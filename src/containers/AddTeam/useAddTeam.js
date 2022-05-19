import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import "@fontsource/open-sans";
import useApi from "../../hooks/useApi";
import RosterComponent from '../../components/Roster'
import Loading from "../../components/Loading";
import useHydration from "../../hooks/useHydration";
import {Container, League, LeagueSelector} from './components'

function useAddTeam() {

    const { currentOrganization } = useSelector((state) => ({
        ...state.authReducer
      }));
    
      const {makeRequest, isLoading} = useApi()
      const {isHydrating, hydrateSportTeams, hydrateOrgMembers} = useHydration()
    
    const { activeYears, currentDate, sportTeams, orgMembers } = useSelector((state) => ({
        ...state.sportReducer
    }));
    
    const [currentRoster, setCurrentRoster] = useState(null)
    const [fullRoster, setFullRoster] = useState(null)
    const [selectedMember, setSelectedMember] = useState(currentOrganization.user_id)
    const [unownedTeams, setUnownedTeams] = useState(null)
    const [league, setLeague] = useState(1)
    const [readyToRender, setReadyToRender] = useState(false)
    
    // Load page data
    useEffect(() => {
        const abortController = new AbortController()
        fetchRoster(2022)
        if(!orgMembers){
            hydrateOrgMembers(abortController)
        }
        if(!sportTeams){
            hydrateSportTeams(abortController)
        } else {
            calculateAndSetUnownedTeams()
        }
        
        return () => abortController.abort()
    }, []);
    
    useEffect(() => {
        if(currentRoster && orgMembers && sportTeams && unownedTeams){
            setReadyToRender(true)
        }
    }, [currentRoster, orgMembers, sportTeams, unownedTeams]);
    
    
    useEffect(() => {
        calculateAndSetUnownedTeams()
    }, [sportTeams, fullRoster]);

    const calculateAndSetUnownedTeams = () => {
        if(fullRoster && sportTeams && Object.keys(sportTeams).length){
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
            for(let league in sportTeams){
                Object.keys(sportTeams[league]).forEach(team => {
                    if(!ownedTeams.includes(Number(team))){
                        unownedTeams[league].push(team)
                    }
                })
            }
            setUnownedTeams(unownedTeams)
        }
    }
    
    
    // fetch current teams
    const fetchRoster = async (selectedRoflYear, abortController) => {
        try {
          var res = await makeRequest({
            method: "get",
            route: `users/currentTeams/${currentOrganization.id}/${selectedRoflYear}`,
            abort: abortController
          });
          const body = res.body
          setFullRoster(body)
          setCurrentRoster(body[currentOrganization.user_id])
        //   setRoster(JSON.parse(res.body));
        } catch (e) {
          console.log("problem");
          console.error(e);
        }
      };
    
    const handleChange = (userId) => {
        setCurrentRoster(fullRoster[userId])
        setSelectedMember(userId)
    }
    

  return {
    readyToRender, orgMembers, selectedMember, handleChange, currentRoster, sportTeams, league, setLeague, unownedTeams
  };
}

export default useAddTeam;