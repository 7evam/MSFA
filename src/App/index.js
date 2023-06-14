import React, { useEffect } from 'react';
import {
  Navigate, Outlet,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useApi from '../hooks/useApi';
import TopBar from './TopBar';
import { Container, ContentContainer } from './components';

function NewApp(props) {
  const dispatch = useDispatch();

  const { makeRequest } = useApi();

  const { userToken } = useSelector((state) => ({
    ...state.authReducer,
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
  }, []);

  return (
    userToken
      ? (
        <Container>
          <ContentContainer>
            <TopBar />
            <Outlet />
          </ContentContainer>
        </Container>
      )
      : <Navigate to="/login" replace />
  );
}

export default NewApp;
