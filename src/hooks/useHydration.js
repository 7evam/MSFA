import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'
import { toast } from "react-toastify";
import useApi from './useApi'

// this is a hook that exports functions to hydrate redux
// state with commonly needed data that isn't expected to
// change during a session (team names, org info, etc)

export default function useHydration() {

    const [isHydrating, setIsHydrating] = useState(false)

    const {makeRequest} = useApi()

    const { currentOrganization } = useSelector((state) => ({
        ...state.authReducer
      }));

    const dispatch = useDispatch()

    const hydrateOrgMembers = async (abortController) => {
        setIsHydrating(true)
        try{
          var res = await makeRequest({
              method: "get",
              route: `organizations/summary/${currentOrganization.id}`,
              abort: abortController
            });
            if(res.statusCode == 200){
              const body = res.body
              const members = body.members
              const hash = {}
              members.forEach(member => {
                  hash[member.user_id] = {...member}
              })
            //   setMemberHash(hash)
            //   setMembers(Object.keys(hash))
              dispatch({
                type: "HYDRATE_ORG_MEMBERS",
                payload: {
                  orgMembers: hash
                }
              });
            } else{
              throw ("Unable to fetch org members")
            }     
        } catch(e){
          console.log('problem')
          console.log('here is params')
          console.log(currentOrganization.id)
          console.error(e)
        } finally {
            setIsHydrating(false)
        }
      }

    const hydrateSportTeams = async (abortController) => {
        setIsHydrating(true)
        const leagueIds = [1,2,3,4]
        const sportTeams = {}
        for(let leagueId of leagueIds){
            sportTeams[leagueId] = await getTeamsByLeagueId(leagueId, abortController)
        }
        dispatch({
            type: "HYDRATE_SPORT_TEAMS",
            payload: {
              sportTeams
            }
          });
          setIsHydrating(false)
    }

    const getTeamsByLeagueId = async(leagueId, abortController) => {
        var res = await makeRequest({
            method: 'get',
            route: `/sports/teams/${leagueId}`,
            abort: abortController
        })
        const response = res.body
        const table = {}
        response.forEach(team => {
            table[team.id] = {...team}
        })
        return table
    }


   return { isHydrating, hydrateSportTeams, hydrateOrgMembers };
}