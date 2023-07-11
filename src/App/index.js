import React, { useEffect, useState } from 'react';
import {
  Navigate, Outlet,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useApi from '../hooks/useApi';
import TopBar from './TopBar';
import { Container, ContentContainer } from './components';
import RenderModal from './RenderModal';
import Loading from '../components/Loading';

function App(props) {
  const dispatch = useDispatch();

  const { makeRequest } = useApi();

  const { userToken } = useSelector((state) => ({
    ...state.authReducer,
  }));

  const { modalContent } = useSelector((state) => ({
    ...state.modalReducer,
  }));

  const [readyToRender, setReadyToRender] = useState(false);

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
    setReadyToRender(true);
  };

  useEffect(() => {
    console.log('in app use effect');
    getActiveMonths();
  }, []);

  return (
    userToken
      ? readyToRender ? (
        <Container>
          <ContentContainer modal={!!modalContent}>
            <TopBar />
            <Outlet />
          </ContentContainer>
          <RenderModal />
        </Container>
      ) : <Loading />
      : <Navigate to="/login" />
  );
}

export default App;
