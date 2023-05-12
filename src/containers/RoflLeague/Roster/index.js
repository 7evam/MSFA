import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import RosterComponent from '../../../components/Roster';
import useApi from '../../../hooks/useApi';
import MonthTicker from '../../../components/MonthTicker';
import MonthlyPoints from '../../../components/MonthlyPoints';
import IconLeft from '../../../icons/iconLeft';
import Loading from '../../../components/Loading';

const Container = styled.div`
    margin-top: 50px;
`;

const LeftIcon = styled.span`
    transform: scale(-1, 1);
`;

const Selector = styled.p`
  margin-right: 10px;
  &:hover {
    font-weight: 700;
    text-decoration: underline;
    cursor: pointer;
  }
  font-weight: ${(props) => (props.selected ? '700' : '400')};
`;

const TopMenu = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

function Roster() {
  const { currentOrganization } = useSelector((state) => ({
    ...state.authReducer,
  }));

  const {
    selectedYear,
  } = useSelector((state) => ({
    ...state.sportReducer,
  }));

  const history = useHistory();

  const dispatch = useDispatch();

  const { makeRequest, isLoading } = useApi();

  const { userId, roflMonth, roflYear } = useParams();

  const [fullRoster, setFullRoster] = useState(null);
  const [selectedRoflMonth, setSelectedRoflMonth] = useState(roflMonth);
  const [memberInfo, setMemberInfo] = useState(null);
  const [viewToRender, setViewToRender] = useState('single');
  const [readyToRender, setReadyToRender] = useState(false);

  const fetchOrgInfo = async (abort) => {
    // TODO optimize this
    // store it in redux and check if it exists before adding
    try {
      const res = await makeRequest({
        method: 'get',
        route: `organizations/summary/${currentOrganization.id}`,
        continueLoading: true,
        abort,
      });
      if (res.statusCode === 200) {
        const { body } = res;
        const member = body.members.find((mem) => mem.user_id === Number(userId));
        setMemberInfo(member);
      } else {
        throw ('Unable to fetch org info');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchRoster = async (abort, year) => {
    try {
      const res = await makeRequest({
        method: 'get',
        route: `/users/roster/${userId}/${currentOrganization.id}/${year}`,
        abort,
      });
      const roster = res.body;
      setFullRoster(roster);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (selectedYear !== roflYear) {
        dispatch({
          type: 'SET_SELECTED_YEAR',
          payload: {
            selectedYear: roflYear,
          },
        });
      }
      const abortController = new AbortController();
      await fetchOrgInfo(abortController);
      await fetchRoster(abortController, roflYear);
      setReadyToRender(true);
      return () => abortController.abort();
    };
    fetchData();
  }, []);

  useEffect(() => {
    const refetchData = async () => {
      const abortController = new AbortController();
      await fetchOrgInfo(abortController);
      await fetchRoster(abortController, selectedYear);
      setReadyToRender(true);
      return () => abortController.abort();
    };
    if (readyToRender) {
      setReadyToRender(false);
      history.push(`/rofleague/${userId}/${selectedYear}/${selectedRoflMonth}`);
      refetchData();
    }
  }, [selectedYear]);

  useEffect(() => {
    if (selectedRoflMonth) {
      history.push(`/rofleague/${userId}/${roflYear}/${selectedRoflMonth}`);
    }
  }, [selectedRoflMonth]);

  const renderSwitch = (view) => {
    switch (view) {
      case 'overview':
        return (
          <div>
            <MonthlyPoints userId={userId} roflYear={roflYear} />
          </div>
        );
      case 'single':
        return (
          <div>
            <MonthTicker
              roflMonth={selectedRoflMonth}
              setRoflMonth={setSelectedRoflMonth}
              selectedYear={roflYear}
            />
            <RosterComponent
              selectedYear={roflYear}
              currentMonthRoster={fullRoster[`${selectedRoflMonth}-${roflYear}`]}
              roflMonth={selectedRoflMonth}
              readOnly
            />
          </div>
        );
      default:
        return <div>error</div>;
    }
  };

  return (
    <Container>
      <TopMenu>
        <a onClick={() => history.push('/rofleague')}>
          {' '}
          <span>{IconLeft}</span>
          {' '}
          Back to Standings
        </a>
        <Selector selected={viewToRender === 'single'} onClick={() => setViewToRender('single')}>Monthly</Selector>
        <Selector selected={viewToRender === 'overview'} onClick={() => setViewToRender('overview')}>Overview</Selector>
      </TopMenu>
      <div>
        <p>
          Roster for
          {' '}
          {memberInfo?.team_name}
          {' '}
          managed by
          {' '}
          {memberInfo?.name}
        </p>
      </div>
      {
        readyToRender
          ? renderSwitch(viewToRender)
          : <Loading />
      }
    </Container>

  );
}

export default Roster;
