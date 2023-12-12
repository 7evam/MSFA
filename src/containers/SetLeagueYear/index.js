import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import useApi from '../../hooks/useApi';
import { mobileBreakPoint } from '../../constants/style';

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

const Year = styled.option` 
  width: 100%;
  height: 25px;
  text-align: center;
`;

const YearSelector = styled.select`
  width: 100%;
  height: 25px;
  margin-top: 80px;
  text-align: center;
  font-weight: 800;
  @media (max-width: ${mobileBreakPoint}){
    margin-top: 110px;
  }
`;

const DummyYearSelector = styled.div`
  height: 20px;
  margin-top: 80px;
`;

function SetLeagueYear(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { organizations, currentOrganization } = useSelector((state) => ({
    ...state.authReducer,
  }));

  const { selectedYear } = useSelector((state) => ({
    ...state.sportReducer,
  }));

  const { makeRequest } = useApi();

  const [isLoading, setIsLoading] = useState(false);

  const handleYearChange = (newYear) => {
    dispatch({
      type: 'SET_SELECTED_YEAR',
      payload: {
        selectedYear: newYear,
      },
    });
  };

  const linkToCreateNewLeague = () => {
    navigate('/create-new-league');
  };

  const createNewSeason = () => {
    navigate('/new-season');
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
          <p>Set league:</p>
          {organizations.map((org) => (
            <ChooseOrgButton disabled={org.current === 1} onClick={() => setNewCurrentOrg(org.id)}>
              {org.name}
              {' '}
              {org.id}
            </ChooseOrgButton>
          ))}

          {
        currentOrganization.activeYears && Object.keys(currentOrganization.activeYears).length > 1
          ? (
            <>
              <p>Select Year:</p>
              <YearSelector value={selectedYear} onChange={(e) => handleYearChange(e.target.value)} name="selectedYear">
                {Object.keys(currentOrganization.activeYears).map((year) => (
                  <Year key={year} value={year}>{year}</Year>
                ))}
              </YearSelector>
            </>
          )
          : <DummyYearSelector />
      }
        </Container>
      )
  );
}

export default SetLeagueYear;
