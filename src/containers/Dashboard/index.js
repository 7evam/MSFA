import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import useDashboard from './useDashboard'
import {convertMonthToReadable} from '../../utils'

const Container =  styled.div``
const Slot = styled.div`
  margin-top: 25px;
`
const SelectButton = styled.button`
background: ${props => props.selectedSlot && props.selectedSlot === props.name ? 'darkred' : 'limegreen'}
`

const BannerMessage =  styled.div`

`

const MonthButton = styled.button`
background: ${props => props.selectedMonth ? 'limegreen' : 'white'}
`

function Dashboard(props) {
  
  const {
    year,
    month,
    roster,
    currentOrganization,
    setMonth,
} = useDashboard()

const currentMonthRoster = roster ? roster[year][month] : null

  return (
    <Container>
      
        <p>Welcome to the dashboard</p>
        
        {
          roster && currentOrganization ?
          <div>
        <p>year: {year}</p>
        <p>month: {convertMonthToReadable(month, year)}</p>
        <Slot>{currentOrganization.league_1.name}: {currentMonthRoster.league_1.city} {currentMonthRoster.league_1.name}</Slot>
        <Slot>{currentOrganization.league_2.name}: {currentMonthRoster.league_2.city} {currentMonthRoster.league_2.name}</Slot>
        {currentOrganization.league_3 ? 
        <Slot>{currentOrganization.league_3.name}: {currentMonthRoster.league_3.city} {currentMonthRoster.league_3.name}</Slot>
      : null}
      {currentOrganization.league_4 ? 
        <Slot>{currentOrganization.league_4.name}: {currentMonthRoster.league_4.city} {currentMonthRoster.league_4.name}</Slot>
      : null}
      {
        Array.from(Array(currentOrganization.flex_spots)).map((x, i) => (
          <Slot key={`p-${i}`}>FLEX: {currentMonthRoster[`flex_${i+1}`].city} {currentMonthRoster[`flex_${i+1}`].name}</Slot>
        ))
      }
      {
        Array.from(Array(currentOrganization.bench_spots)).map((x, i) => (
          <Slot key={`p-${i}`}>BENCH: {currentMonthRoster[`bench_${i+1}`].city} {currentMonthRoster[`bench_${i+1}`].name}</Slot>
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
