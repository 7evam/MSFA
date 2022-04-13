import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FillTeams from "./fillTeams";
import InitialInfo from "./InitialInfo";
import useCreateNewLeague from "./useCreateNewLeague";

function CreateNewLeague(props) {
    
    const cnlProps = useCreateNewLeague()
  return (
    cnlProps.stage === 'initial' ? 
    <InitialInfo cnlProps={cnlProps}/> : 
    <FillTeams cnlProps={cnlProps}/>
  );
}

export default CreateNewLeague;
