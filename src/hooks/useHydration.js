import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import useApi from './useApi';

// this is a hook that exports functions to hydrate redux
// state with commonly needed data that isn't expected to
// change during a session (team names, org info, etc)

export default function useHydration() {
  const [isHydrating, setIsHydrating] = useState(false);

  const { makeRequest } = useApi();

  const { currentOrganization } = useSelector((state) => ({
    ...state.authReducer,
  }));

  const dispatch = useDispatch();

  const hydrateOrgMembers = async (abortController) => {
    setIsHydrating(true);
    try {
      const res = await makeRequest({
        method: 'get',
        route: `organizations/summary/${currentOrganization.id}`,
        abort: abortController,
      });
      if (res.statusCode === 200) {
        const { body } = res;
        const { members } = body;
        const hash = {};
        members.forEach((member) => {
          hash[member.user_id] = { ...member };
        });
        //   setMemberHash(hash)
        //   setMembers(Object.keys(hash))
        dispatch({
          type: 'HYDRATE_ORG_MEMBERS',
          payload: {
            orgMembers: hash,
          },
        });
        return hash;
      }
      throw ('Unable to fetch org members');
    } catch (e) {
      console.log('problem');
      console.log('here is params');
      console.log(currentOrganization.id);
      console.error(e);
    } finally {
      setIsHydrating(false);
    }
  };

  const hydrateSportTeams = async (abortController) => {
    setIsHydrating(true);
    const sportTeams = await getTeams(abortController);
    dispatch({
      type: 'HYDRATE_SPORT_TEAMS',
      payload: {
        sportTeams,
      },
    });
    setIsHydrating(false);
    return sportTeams;
  };

  const getTeams = async (abortController) => {
    const res = await makeRequest({
      method: 'get',
      route: '/sports/teams',
      abort: abortController,
    });
    const response = res.body;
    return response;
  };

  const getTeamsByLeagueId = async (leagueId, abortController) => {
    const res = await makeRequest({
      method: 'get',
      route: `/sports/teams/${leagueId}`,
      abort: abortController,
    });
    const response = res.body;
    const table = {};
    response.forEach((team) => {
      table[team.id] = { ...team };
    });
    return table;
  };

  const hydrateDeadlines = async (abortController, roflYear) => {
    setIsHydrating(true);
    try {
      const res = await makeRequest({
        method: 'get',
        route: `sports/deadlines/${roflYear}`,
        abort: abortController,
      });
      if (res.statusCode === 200) {
        const { body } = res;
        dispatch({
          type: 'HYDRATE_DEADLINES',
          payload: {
            roflYear,
            deadlines: body,
          },
        });
      } else {
        throw ('Unable to fetch org members');
      }
    } catch (e) {
      console.log('problem');
      console.log('here is params');
      console.log(currentOrganization.id);
      console.error(e);
    } finally {
      setIsHydrating(false);
    }
  };

  const hydrateActiveYears = async (abortController) => {
    setIsHydrating(true);
    try {
      const res = await makeRequest({
        method: 'get',
        route: '/sports/active',
        abort: abortController,
      });
      const parsedRes = res.body;
      dispatch({
        type: 'SET_ACTIVE_YEARS_AND_MONTHS',
        payload: {
          activeYears: parsedRes.activeYears,
          currentDate: parsedRes.currentDate,
        },
      });
      return {
        activeYears: parsedRes.activeYears,
        currentDate: parsedRes.currentDate,
      };
    } catch (e) {
      console.error(e);
    } finally {
      setIsHydrating(false);
    }
  };

  return {
    isHydrating, hydrateSportTeams, hydrateActiveYears, hydrateOrgMembers, hydrateDeadlines,
  };
}
