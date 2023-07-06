import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { mobileBreakPoint } from '../../constants/style';
import useApi from '../../hooks/useApi';
import Scoring from '../Scoring';
import Loading from '../../components/Loading';

const Container = styled.div`
    display: flex;
    justify-content: center;
    @media (max-width: ${mobileBreakPoint}){
        width: 100vw;
    }
  `;
const placeholderCurrentOrg = {
  id: '35',
  user_id: 2,
  organization_id: 35,
  team_name: 'placeholder',
  current: 1,
  name: 'placeholder',
  member_count: 10,
  league_1: {
    id: '1',
    name: 'MLB',
    active: 1,
  },
  league_2: {
    id: '2',
    name: 'NFL',
    active: 0,
  },
  league_3: {
    id: '3',
    name: 'NHL',
    active: 1,
  },
  league_4: {
    id: '4',
    name: 'NBA',
    active: 0,
  },
  flex_spots: 1,
  bench_spots: 3,
  activeYears: {
    2022: {
      id: 6,
      org_id: 35,
      rofl_year: 2022,
      league1: 1,
      league2: 2,
      league3: 3,
      league4: 4,
      flex_spots: 1,
      bench_spots: 3,
      active: 1,
    },
    2023: {
      id: 0,
      org_id: 35,
      rofl_year: 2023,
      league1: 1,
      league2: 2,
      league3: 3,
      league4: 4,
      flex_spots: 1,
      bench_spots: 3,
      active: 1,
    },
  },
};

function DraftScoring() {
  const dispatch = useDispatch();

  const { makeRequest } = useApi();

  const { selectedYear } = useSelector((state) => ({
    ...state.sportReducer,
  }));

  const getActiveMonths = async () => {
    const res = await makeRequest({
      method: 'get',
      route: '/sports/active',
    });

    const parsedRes = res.body;

    dispatch({
      type: 'SET_ACTIVE_YEARS_AND_MONTHS',

      payload: {
        activeYears: parsedRes.activeYears,
        currentDate: parsedRes.currentDate,
      },
    });
  };

  useEffect(() => {
    getActiveMonths();
    dispatch({
      type: 'SET_SELECTED_YEAR',
      payload: {
        selectedYear: 2022,
      },
    });
    dispatch({
      type: 'SET_NEW_ORGS',
      payload: {
        organizations: [placeholderCurrentOrg],
      },
    });
  }, []);

  return (
    <Container>
      {selectedYear ? <Scoring /> : <Loading />}
    </Container>
  );
}

export default DraftScoring;
