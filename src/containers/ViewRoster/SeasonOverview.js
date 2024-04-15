import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  OverviewContainer, HeaderLabel,
} from './components';
import useApi from '../../hooks/useApi';
import Loading from '../../components/Loading';
import SeasonOverviewSlot from './SeasonOverviewSlot';

function SeasonOverview({ userId, roflYear }) {
  const { selectedYear } = useSelector((state) => ({
    ...state.sportReducer,
  }));

  const { currentOrganization } = useSelector((state) => ({
    ...state.authReducer,
  }));
  const { makeRequest } = useApi();

  const [standings, setStandings] = useState(null);

  const fetchStandings = async () => {
    const res = await makeRequest({
      method: 'get',
      route: `/organizations/memberStandings/${currentOrganization.id}/${selectedYear}`,
    });
    const { body } = res;
    const ordered = Object.keys(body).sort().reduce(
      (obj, key) => {
        obj[key] = body[key];
        return obj;
      },
      {},
    );
    setStandings(ordered);
  };

  useEffect(() => {
    fetchStandings();
  }, []);

  const sortKeys = (a, b) => {
    const numA = parseInt(a.split("-")[0]);
    const numB = parseInt(b.split("-")[0]);
    return numA - numB;
  }

  return standings ? (
    <OverviewContainer>
      <HeaderLabel>Month</HeaderLabel>
      <HeaderLabel>Monthly Points</HeaderLabel>
      <HeaderLabel>Total Points</HeaderLabel>
      {Object.keys(standings).sort(sortKeys).map((val, index) => {
        const currentUser = standings[val].find((el) => el.userId === userId);
        return (
          <SeasonOverviewSlot key={val} userPoints={currentUser} roflYear={roflYear} month={val.split('-')[0]} />
        );
      })}
    </OverviewContainer>
  ) : <Loading />;
}

export default SeasonOverview;