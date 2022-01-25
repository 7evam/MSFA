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

const ScrollMenuContainer = styled.div`
    background-color: #333;
    width: 450px;
    display: flex;
    flex-direction: row;
`

const ScrollMenu = styled.div`
    overflow: auto;
    white-space: nowrap;
    display: inline-block;
    left: 100px;
`

const ScrollMenuLink = styled.a`
    display: inline-block;
    color: ${props => props.selected ? 'limegreen' : 'white'};
    text-align: center;
    padding: 14px;
    text-decoration: none;
    width: 100px;
    cursor: pointer;
`

const ScrollMenuButton = styled.a`
    display: inline-block;
    color: white;
    text-align: center;
    padding: 14px;
    text-decoration: none;
    width: 25px;
    cursor: pointer;
`

function Roster(props) {
  
  const {
    selectedRoflYear,
    roflMonth,
    roster,
    currentOrganization,
    test,
    selectedSlot,
    areRostersEqual,
    setRoflMonth,
    handleSubmit,
    activeYears,
    activeRoflMonths
} = useRoster()

console.log('active rofl months')
console.log(activeRoflMonths)

const [appliedScroll, setAppliedScroll] = useState(false)

const currentMonthRoster = roster ? roster[`${roflMonth}-${selectedRoflYear}`] : null
const scrollLeft = () => {
    scrollRef.current.scrollLeft -= 400
}

const scrollRight = () => {
    scrollRef.current.scrollLeft += 400
}

const scrollRef = React.createRef()

useEffect(() => {
    if(scrollRef && scrollRef.current && !appliedScroll){
        scrollRef.current.scrollLeft += ((roflMonth - 1) * 107)
        setAppliedScroll(true)
    }
}, [scrollRef]);

const monthsForScroll = (year) => {
    year = Number(year)
    return [
        {number: 1, month: `April ${year}`},
        {number: 2, month: `May ${year}`},
        {number: 3, month: `June ${year}`},
        {number: 4, month: `July ${year}`},
        {number: 5, month: `August ${year}`},
        {number: 6, month: `September ${year}`},
        {number: 7, month: `October ${year}`},
        {number: 8, month: `November ${year}`},
        {number: 9, month: `December ${year}`},
        {number: 10, month: `January ${year+1}`},
        {number: 11, month: `February ${year+1}`},
        {number: 12, month: `March ${year+1}`},
        {number: 13, month: `April ${year+1}`},
        {number: 14, month: `May ${year+1}`}
    ]
}

  return (
    <Container>
      
        <p>Welcome to roster</p>
        
        {
          roster && currentOrganization && selectedRoflYear ?
          <div>
        <p>year: {selectedRoflYear}</p>
            
            <ScrollMenuContainer>
            <ScrollMenuButton onClick={scrollLeft}>{'<'}</ScrollMenuButton>
            <ScrollMenu ref={scrollRef}>
                {monthsForScroll(selectedRoflYear).map(item => (
                    <ScrollMenuLink selected={item.number === roflMonth} key={item.number} onClick={() => setRoflMonth(item.number)}>{item.month}</ScrollMenuLink>
                ))}
            </ScrollMenu>
            <ScrollMenuButton onClick={scrollRight}>{'>'}</ScrollMenuButton>
            </ScrollMenuContainer>
            
        <p>month: {roflMonth}</p>
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
