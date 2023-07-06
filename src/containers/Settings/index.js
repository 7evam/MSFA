import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import useApi from '../../hooks/useApi';

const Container = styled.div`
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ChooseOrgButton = styled.button`
    display: flex;
`;

function Settings(props) {
  const history = useNavigate();
  const dispatch = useDispatch();

  const { organizations, currentOrganization } = useSelector((state) => ({
    ...state.authReducer,
  }));

  const { makeRequest } = useApi();

  const [isLoading, setIsLoading] = useState(false);

  const linkToCreateNewLeague = () => {
    history.push('/create-new-league');
  };

  const createNewSeason = () => {
    history.push('/new-season');
  };

  const setSelectedYear = (org) => {
    const lowestYear = Math.min(...Object.keys(org.activeYears).map((year) => Number(year)));
    dispatch({
      type: 'SET_SELECTED_YEAR',
      payload: {
        selectedYear: lowestYear,
      },
    });
  };

  const setNewCurrentOrg = async (organizationId) => {
    setIsLoading(true);
    const res = await makeRequest({
      method: 'patch',
      route: `/users/changeOrg/${currentOrganization.user_id}`,
      data: { organizationId },
    });
    // await getAndSetActiveMonths();
    if (res.statusCode === 200) {
      const organizations = res.body;
      console.log('here is organiations');
      console.log(organizations);
      dispatch({
        type: 'SET_NEW_ORGS',
        payload: {
          organizations,
        },
      });
      setSelectedYear(organizations.find((org) => org.id === organizationId));
    }
    setIsLoading(false);
  };

  return (
    isLoading
      ? <p>Loading...</p>
      : (
        <Container>
          <p>Settings</p>
          <button type="button" onClick={linkToCreateNewLeague}>Create New League</button>
          <button type="button" onClick={createNewSeason}>Start New Season in Current League</button>
          <p>Set league:</p>
          {organizations.map((org) => (
            <ChooseOrgButton disabled={org.current === 1} onClick={() => setNewCurrentOrg(org.id)}>
              {org.name}
              {' '}
              {org.id}
            </ChooseOrgButton>
          ))}
        </Container>
      )
  );
}

export default Settings;
