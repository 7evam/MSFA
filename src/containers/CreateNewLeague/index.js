import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FillTeams from "./FillTeams";
import InitialInfo from "./InitialInfo";
import ReviewRoster from "./ReviewRoster";
import useCreateNewLeague from "./useCreateNewLeague";

function CreateNewLeague(props) {
    
    const cnlProps = useCreateNewLeague()
    const renderSwitch = (stage) => {
        switch(stage){
            case 'initial': return <InitialInfo cnlProps={cnlProps}/>
            break;
            case 'fillTeams': return <FillTeams cnlProps={cnlProps}/>
            break;
            case 'reviewRoster': return <ReviewRoster cnlProps={cnlProps}/>
            break;
            default: 
            return <p>There has been some error</p>
        }
    }
  return (
      <div>
          <h1>Create New League</h1>
          {renderSwitch(cnlProps.stage)}
      </div>
  );
}

export default CreateNewLeague;

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
