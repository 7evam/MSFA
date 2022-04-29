import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Standings from './Standings'
import Roster from './Roster'
import { Switch, Route } from "react-router-dom";

function RoflLeague(props) {

    console.log("rendering rofleague")

  return (
     <Switch>
        <Route exact path="/rofleague" component={Standings} />
        <Route exact path="/rofleague/:userId/:roflYear/:roflMonth" component={Roster} />
      </Switch>
  );
}

export default RoflLeague;
