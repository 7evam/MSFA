/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import {
  Navigate, Outlet,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import useApi from '../hooks/useApi';
import TopBar from './TopBar';
import { Container, ContentContainer, OutletContainer } from './components';
import RenderModal from './RenderModal';
import Loading from '../components/Loading';
import Sidebar from './Sidebar';
import { mobileBreakPoint } from '../constants/style';

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
  const [isMenuOpen, setIsMenuOpen] = useState(true);

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
    getActiveMonths();
  }, []);

  return (
    userToken
      ? readyToRender ? (
        <Container>
          <ContentContainer modal={!!modalContent}>
            <TopBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            <Sidebar />
            <OutletContainer isMenuOpen={isMenuOpen} className="outletContainer">
              <Outlet />
            </OutletContainer>
          </ContentContainer>
          <RenderModal />
        </Container>
      ) : <Loading />
      : <Navigate to="/login" />
  );
}

export default App;
