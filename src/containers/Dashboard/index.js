import React, {useEffect} from 'react';
import styled from 'styled-components';
import useDashboard from './useDashboard'

const Container =  styled.div``

function Dashboard(props) {
  
//   const {
    
// } = useDashboard()
  useDashboard()

  return (
    <Container>
        <p>Welcome to the dashboard</p>
    </Container>
  )
}

export default Dashboard
