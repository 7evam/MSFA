import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Container = styled.div`
    margin-top: 40px;
`;

function Settings(props) {

    const history = useHistory()

    const createNewLeague = () => {
        history.push('/create-new-league')
    }

  return (
    <Container>
        <p> hellloo this is settings page</p>
        <button onClick={createNewLeague}>Create New League</button>
    </Container>
  );
}

export default Settings;
