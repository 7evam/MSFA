import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import FillTeams from '../CreateNewLeague/FillTeams';
import InitialInfo from './InitialInfo';
import ReviewRoster from '../CreateNewLeague/ReviewRoster';
import useCreateNewLeague from '../CreateNewLeague/useCreateNewLeague';

const Headline = styled.h1`
    font-family: "helvetica neue", Helvetica, arial, sans-serif; 
    font-size: 20px;
    text-align: center;
`;

function NewSeason(props) {
  const { currentOrganization, organizations } = useSelector((state) => ({
    ...state.authReducer,
  }));

  const existingOrganizationId = organizations.find((org) => org.id === currentOrganization.id);
  // TODO handle existing organization ID find fail
  const cnlProps = useCreateNewLeague(existingOrganizationId);
  const renderSwitch = (stage) => {
    switch (stage) {
      case 'initial': return <InitialInfo cnlProps={cnlProps} />;

      case 'fillTeams': return <FillTeams cnlProps={cnlProps} />;

      case 'reviewRoster': return <ReviewRoster cnlProps={cnlProps} />;

      default:
        return <p>There has been some error</p>;
    }
  };
  return (
    <div>
      <Headline>Start New Season</Headline>
      {renderSwitch(cnlProps.stage)}
    </div>
  );
}

export default NewSeason;

// (() => {
//     console.log('change in proprs')
//     console.log(cnlProps.stage)
//    switch(cnlProps.stage){
//       case 'initial': return <InitialInfo cnlProps={cnlProps}/>
//       case 'fillTeams': return <FillTeams cnlProps={cnlProps}/>
//       case 'reviewRoster': return <ReviewRoster cnlProps={cnlProps}/>
//       default:
//       return <p>There has been some error</p>
//   }
// })()
