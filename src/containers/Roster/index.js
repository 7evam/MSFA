import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import useRoster from './useRoster'
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

function Roster(props) {
  
  const {
    year,
    month,
    roster,
    currentOrganization,
    test,
    selectedSlot,
    areRostersEqual,
    setMonth,
    handleSubmit
} = useRoster()

const currentMonthRoster = roster ? roster[year][month] : null

  return (
    <Container>
      
        <p>Welcome to the dashboard</p>
        
        {
          roster && currentOrganization ?
          <div>
        <p>year: {year}</p>
        <div>{Object.keys(roster[year]).map(item => (
          <p><MonthButton selectedMonth={item === month} onClick={() => setMonth(item)}>{convertMonthToReadable(item, year)}</MonthButton></p>
        ))}</div>
        <p>month: {month}</p>
        <Slot>{currentOrganization.league_1.name}: {currentMonthRoster.league_1.city} {currentMonthRoster.league_1.name} <SelectButton selectedSlot={selectedSlot} name={'league_1'} onClick={() => test('league_1')}>Move</SelectButton></Slot>
        <Slot>{currentOrganization.league_2.name}: {currentMonthRoster.league_2.city} {currentMonthRoster.league_2.name}<SelectButton selectedSlot={selectedSlot} name={'league_2'} onClick={() => test('league_2')}>Move</SelectButton></Slot>
        {currentOrganization.league_3 ? 
        <Slot>{currentOrganization.league_3.name}: {currentMonthRoster.league_3.city} {currentMonthRoster.league_3.name}<SelectButton selectedSlot={selectedSlot} name={'league_3'} onClick={() => test('league_3')}>Move</SelectButton></Slot>
      : null}
      {currentOrganization.league_4 ? 
        <Slot>{currentOrganization.league_4.name}: {currentMonthRoster.league_4.city} {currentMonthRoster.league_4.name}<SelectButton selectedSlot={selectedSlot} name={'league_4'} onClick={() => test('league_4')}>Move</SelectButton></Slot>
      : null}
      {
        Array.from(Array(currentOrganization.flex_spots)).map((x, i) => (
          <Slot key={`p-${i}`}>FLEX: {currentMonthRoster[`flex_${i+1}`].city} {currentMonthRoster[`flex_${i+1}`].name}<SelectButton selectedSlot={selectedSlot} name={`flex_${i+1}`} onClick={() => test(`flex_${i+1}`)}>Move</SelectButton></Slot>
        ))
      }
      {
        Array.from(Array(currentOrganization.bench_spots)).map((x, i) => (
          <Slot key={`p-${i}`}>BENCH: {currentMonthRoster[`bench_${i+1}`].city} {currentMonthRoster[`bench_${i+1}`].name}<SelectButton selectedSlot={selectedSlot} name={`bench_${i+1}`} onClick={() => test(`bench_${i+1}`)}>Move</SelectButton></Slot>
        ))
      }
      {
         areRostersEqual ? null :
           <BannerMessage>
             You have unsaved changes
              <button onClick={handleSubmit}>Submit</button>
           </BannerMessage>
      }
          </div>
          :
          <p>loading...</p>
        }
        
    </Container>
  )
}

export default Roster
