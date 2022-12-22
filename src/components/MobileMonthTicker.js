import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { mobileBreakPoint } from "../constants/style";
import IconRight from "../icons/iconRight";

const Container = styled.div`
display: none;
@media (max-width: ${mobileBreakPoint}){
    width: 100vw;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
`;

const Select = styled.select`
  height: 30px;
  width: 80vw;
`
const Option = styled.option`
`

const LeftIcon = styled.span`
    transform: scale(-1, 1);
`

const IconContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 10vw;
cursor: pointer;
cursor: ${(props) => (props.rendered ? 'pointer' : 'default')};
`

function MobileMonthTicker({roflMonth, setRoflMonth, selectedRoflYear, firstMonthForDisplay, finalMonthForDisplay, onlyShownMonths}) {

  const monthsForScroll = (year) => {
    year = Number(year);
    const allMonths = [
        { number: 1, month: `April ${year}` },
        { number: 2, month: `May ${year}` },
        { number: 3, month: `June ${year}` },
        { number: 4, month: `July ${year}` },
        { number: 5, month: `August ${year}` },
        { number: 6, month: `September ${year}` },
        { number: 7, month: `October ${year}` },
        { number: 8, month: `November ${year}` },
        { number: 9, month: `December ${year}` },
        { number: 10, month: `January ${year + 1}` },
        { number: 11, month: `February ${year + 1}` },
        { number: 12, month: `March ${year + 1}` },
        { number: 13, month: `April ${year + 1}` },
        { number: 14, month: `May ${year + 1}` }
    ]
    let finalMonth = finalMonthForDisplay ? finalMonthForDisplay : 14;
    let firstMonth = firstMonthForDisplay ? firstMonthForDisplay : 1

    let months = []
    for(let i=firstMonth-1;i<finalMonth;i++){
        // if onlyShownMonths array prop exists, only push months in that array. otherwise push all
        if(onlyShownMonths ? onlyShownMonths.includes(allMonths[i].number) : true) months.push(allMonths[i])
    }
    return months
  };

  const handlePointerClick = (adjustment) => {
    if((roflMonth <=1 && adjustment < 0) || (roflMonth >= 14 & adjustment > 0)){
        console.log('iit failed')
        console.log(roflMonth)
        console.log(adjustment)
    } else {
        setRoflMonth(roflMonth + adjustment)
    }
  }

  const handleChange = (e) => {
    console.log('handling change')
    setRoflMonth(e.target.value)
  }

  return (
        <Container>
                <IconContainer rendered={roflMonth >= 2 ? true : false} onClick={() => handlePointerClick(-1)}>
                {roflMonth >=2 ?<LeftIcon>{IconRight}</LeftIcon>: null
            }
            </IconContainer> 
            <Select
                value={roflMonth}
                onChange={handleChange}
            >
            {monthsForScroll(selectedRoflYear).map((item) => (
            <Option
                value={item.number}
                key={item.number}
            >
                {item.month}
            </Option>
            ))}
            </Select>
            <IconContainer rendered={roflMonth <= 13 ? true : false} onClick={() => handlePointerClick(1)}>
           {roflMonth <= 13 ? IconRight : null} 
            </IconContainer>
        </Container>
  );
}

export default MobileMonthTicker;