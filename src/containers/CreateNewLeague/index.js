import React from 'react';
import FillTeams from './FillTeams';
import InitialInfo from './InitialInfo';
import ReviewRoster from './ReviewRoster';
import useCreateNewLeague from './useCreateNewLeague';

function CreateNewLeague() {
  const cnlProps = useCreateNewLeague();
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
      <h1>Create New League</h1>
      {renderSwitch(cnlProps.stage)}
    </div>
  );
}

export default CreateNewLeague;
