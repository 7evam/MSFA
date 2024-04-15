import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import useApi from '../../hooks/useApi';
import { mobileBreakPoint } from '../../constants/style';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ActionButton = styled.button`
    z-index: 100;
    padding: 8px;
    margin-bottom: 10px;
    outline: none;
    cursor: ${(props) => (!props.disabled
    && 'pointer'
  )};
    font-weight: 500;
    margin-left: 8px;
    border-radius: 4px;
    color: white;
    background: ${(props) => (props.disabled
    ? 'grey'
    : '#17288F')};
    line-height: 1.15;
    font-size: 14px;
    letter-spacing: .08em;
    text-decoration: none;
    text-transform: uppercase;
    border: none;
    text-align: center;
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
    transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
    ${(props) => !props.disabled &&
    `:hover {
        background: #4E871F;
        box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
    }`
  }
    
    @media (max-width: ${mobileBreakPoint}){
        width: 120px;
        height: 50px;
        display: flex;
    align-items: center;
    justify-content: center;
       }
`;

const Year = styled.option` 
  width: 100%;
  height: 25px;
  text-align: center;
`;

const YearSelector = styled.select`
  width: 100%;
  max-width: 600px;
  height: 25px;
  margin-top: 10px;
  text-align: center;
  font-weight: 800;
  transform: translateX(5px);
`;

const DummyYearSelector = styled.div`
  height: 20px;
  margin-top: 80px;
`;

const Line = styled.hr`
border: 0;
  clear:both;
  display:block;
  width: 96%;               
  background-color: black;
  height: 3px;
`

const H1 = styled.h1`
  font-size: 18px;
  color: #010626;
`

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
          <H1>Set League + Year</H1>
          <Line />
          <p>Set League:</p>
          {organizations.map((org) => (
            <ActionButton disabled={org.current === 1} onClick={() => setNewCurrentOrg(org.id)}>
              {org.name}
              {' '}
              {org.id}
            </ActionButton>
          ))}
          <Line />
          {
            currentOrganization.activeYears && Object.keys(currentOrganization.activeYears).length > 1
              ? (
                <>
                  <p>Set Year:</p>
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
