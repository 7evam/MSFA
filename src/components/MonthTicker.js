import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { blue, lightBlue, mobileBreakPoint } from '../constants/style';
import MobileMonthTicker from './MobileMonthTicker';

const Container = styled.div`
background-color: ${lightBlue};
max-width: 700px;
display: flex;
flex-direction: row;
height: 70px;
@media (max-width: ${mobileBreakPoint}){
  width: 0px;
  display: none;
  height: 0px;
}
`;

const ScrollMenu = styled.div`
  overflow: auto;
  white-space: nowrap;
  display: inline-block;
`;

const ScrollMenuLink = styled.a`
  display: inline-block;
  color: ${(props) => (props.selected ? '#308AEB' : 'black')};
  text-align: center;
  padding-top: 15px;
  padding-left: 5px;
  padding-right: 5px;
  text-decoration: none;
  width: 215px;
  cursor: pointer;
`;

const ScrollMenuButton = styled.a`
  display: inline-block;
  color: black;
  padding: 15px;
  text-decoration: none;
  width: 29px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const MonthTextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

function MonthTicker({
  roflMonth, setRoflMonth, selectedYear, firstMonthForDisplay, finalMonthForDisplay, onlyShownMonths,
}) {
  const [appliedScroll, setAppliedScroll] = useState(false);

  const scrollLeft = () => {
    scrollRef.current.scrollLeft -= 228;
  };

  const scrollRight = () => {
    scrollRef.current.scrollLeft += 228;
  };

  const scrollRef = React.createRef();

  useEffect(() => {
    if (scrollRef && scrollRef.current && !appliedScroll) {
      scrollRef.current.scrollLeft += (roflMonth - 2) * 114;
      setAppliedScroll(true);
    }
  }, [scrollRef, roflMonth]);

  // useEffect(() => {
  //   if (scrollRef && scrollRef.current && !appliedScroll) {
  //     console.log("in rofl month if")
  //     scrollRef.current.scrollLeft += (roflMonth - 2) * 228;
  //     setAppliedScroll(true);
  //   }
  // }, [roflMonth]);

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
      { number: 14, month: `May ${year + 1}` },
    ];
    const finalMonth = finalMonthForDisplay || 14;
    const firstMonth = firstMonthForDisplay || 1;

    const months = [];
    for (let i = firstMonth - 1; i < finalMonth; i++) {
      // if onlyShownMonths array prop exists, only push months in that array. otherwise push all
      if (onlyShownMonths ? onlyShownMonths.includes(allMonths[i].number) : true) months.push(allMonths[i]);
    }
    return months;
  };

  return (
    <div>
      <MobileMonthTicker roflMonth={roflMonth} setRoflMonth={setRoflMonth} firstMonthForDisplay={firstMonthForDisplay} selectedYear={selectedYear} finalMonthForDisplay={finalMonthForDisplay} onlyShownMonths={onlyShownMonths} />
      <Container>
        <ScrollMenuButton onClick={scrollLeft}><MonthTextContainer><span>{'<'}</span></MonthTextContainer></ScrollMenuButton>
        <ScrollMenu ref={scrollRef}>
          {monthsForScroll(selectedYear).map((item) => (
            <ScrollMenuLink
              selected={Number(item.number) === Number(roflMonth)}
              key={item.number}
              onClick={() => setRoflMonth(item.number)}
            >
              <MonthTextContainer>
                <span>
                  Month
                  {' '}
                  {item.number}
                </span>
                <span>{item.month}</span>
              </MonthTextContainer>
            </ScrollMenuLink>
          ))}
        </ScrollMenu>
        <ScrollMenuButton onClick={scrollRight}>{'>'}</ScrollMenuButton>
      </Container>
    </div>
  );
}

export default MonthTicker;
