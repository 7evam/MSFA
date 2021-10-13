import React, {useEffect} from 'react';
import styled from 'styled-components';
import useDashboard from './useDashboard'

const Container =  styled.div``

function Dashboard(props) {
  
  const {
    year,
    month,
    roster,
    currentOrganization
} = useDashboard()

console.log("here i s current org")
console.log(currentOrganization)


const currentMonthRoster = roster ? roster[year][month] : null

console.log('here is current month roster')
console.log(currentMonthRoster)

  return (
    <Container>
        <p>Welcome to the dashboard</p>
        {
          roster && currentOrganization ?
          <div>
        <p>year: {year}</p>
        <p>month: {month}</p>
        <p>{currentOrganization.league_1.name}: {currentMonthRoster.league_1.city} {currentMonthRoster.league_1.name}</p>
        <p>{currentOrganization.league_2.name}: {currentMonthRoster.league_2.city} {currentMonthRoster.league_2.name}</p>
        {currentOrganization.league_3 ? 
        <p>{currentOrganization.league_3.name}: {currentMonthRoster.league_3.city} {currentMonthRoster.league_3.name}</p>
      : null}
      {currentOrganization.league_4 ? 
        <p>{currentOrganization.league_4.name}: {currentMonthRoster.league_4.city} {currentMonthRoster.league_4.name}</p>
      : null}
      {
        Array.from(Array(currentOrganization.flex_spots)).map((x, i) => (
          <p>FLEX: {currentMonthRoster[`flex_${i+1}`].city} {currentMonthRoster[`flex_${i+1}`].name}</p>
        ))
      }
      {
        Array.from(Array(currentOrganization.bench_spots)).map((x, i) => (
          <p>BENCH: {currentMonthRoster[`bench_${i+1}`].city} {currentMonthRoster[`bench_${i+1}`].name}</p>
        ))
      }
          </div>
          :
          <p>loading...</p>
        }
        
    </Container>
  )
}

export default Dashboard
