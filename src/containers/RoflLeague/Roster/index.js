import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RosterComponent from '../../../components/Roster';
import useApi from '../../../hooks/useApi';
import MonthTicker from '../../../components/MonthTicker';
import MonthlyPoints from '../../../components/MonthlyPoints';
import IconLeft from '../../../icons/iconLeft';

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

  const history = useHistory();

  const { makeRequest, isLoading } = useApi();

  const { userId, roflMonth, roflYear } = useParams();

  const [fullRoster, setFullRoster] = useState(null);
  const [selectedRoflMonth, setSelectedRoflMonth] = useState(roflMonth);
  const [memberInfo, setMemberInfo] = useState(null);
  const [viewToRender, setViewToRender] = useState('single');

  useEffect(() => {
    const abortController = new AbortController();
    fetchOrgInfo(abortController);
    fetchRoster(abortController);
    return () => abortController.abort();
  }, []);

  const fetchInfo = () => {
    fetchOrgInfo();
    fetchRoster();
  };

  useEffect(() => {
    if (selectedRoflMonth) {
      history.push(`/rofleague/${userId}/${roflYear}/${selectedRoflMonth}`);
    }
  }, [selectedRoflMonth]);

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
      if (res.statusCode == 200) {
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

  const fetchRoster = async (abort) => {
    try {
      const res = await makeRequest({
        method: 'get',
        route: `/users/roster/${userId}/${currentOrganization.id}/${roflYear}`,
        abort,
      });
      const roster = res.body;
      setFullRoster(roster);
    } catch (e) {
      console.error(e);
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
        <Selector onClick={() => setViewToRender('single')}>Monthly</Selector>
        <Selector onClick={() => setViewToRender('overview')}>Overview</Selector>
      </TopMenu>
      {
        isLoading
          ? <p>loading...</p>
          : fullRoster && memberInfo && fullRoster[`${selectedRoflMonth}-${roflYear}`]
            ? viewToRender === 'single'
              ? (
                <div>
                  <MonthTicker
                    roflMonth={selectedRoflMonth}
                    setRoflMonth={setSelectedRoflMonth}
                    selectedRoflYear={roflYear}
                  />
                  <RosterComponent
                    selectedRoflYear={roflYear}
                    currentMonthRoster={fullRoster[`${selectedRoflMonth}-${roflYear}`]}
                    roflMonth={selectedMonth}
                    readOnly
                  />
                </div>
              )
              : (
                <div>
                  <div>
                    <p>
                      Roster for
                      {memberInfo?.team_name}
                      {' '}
                      managed by
                      {memberInfo.name}
                    </p>
                  </div>
                  <MonthlyPoints userId={userId} roflYear={roflYear} />
                </div>
              )

            : <p>Loading..</p>
        }

    </Container>

  );
}

export default Roster;
