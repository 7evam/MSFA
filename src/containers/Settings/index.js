import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import useApi from '../../hooks/useApi';

const Container = styled.div`
    margin-top: 40px;
`;

const ChooseOrgButton = styled.button`
    display: flex;
`;

function Settings(props) {
  const history = useHistory();
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

  const setNewCurrentOrg = async (organizationId) => {
    setIsLoading(true);
    const res = await makeRequest({
      method: 'patch',
      route: `/users/changeOrg/${currentOrganization.user_id}`,
      data: { organizationId },
    });
    if (res.statusCode === 200) {
      const organizations = JSON.parse(res.body);
      dispatch({
        type: 'SET_NEW_ORGS',
        payload: {
          organizations,
        },
      });
    }
    setIsLoading(false);
  };

  return (
    isLoading
      ? <p>Loading...</p>
      : (
        <Container>
          <p>Settings</p>
          <button onClick={linkToCreateNewLeague}>Create New League</button>
          <button onClick={createNewSeason}>Start New Season in Current League</button>
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
