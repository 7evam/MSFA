import React, { useState, useEffect } from 'react';
// import useRoster from './useRoster';
// import MonthTicker from '../../components/MonthTicker';
// import RosterComponent from '../../components/Roster';
// import '@fontsource/open-sans';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import arrowUnClickable from '../../icons/arrowUnClickable';
import arrowClickable from '../../icons/arrowClickable';

const Container = styled.div`
  width: 86%;
  height: 65px;
  font-size: 18px;
  border-radius: 10px;
  background: #4E871F;
  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.12), 0px 0px 4px 0px rgba(0, 0, 0, 0.04), 0px 4px 8px 0px rgba(0, 0, 0, 0.08);
  padding: 0 3%;
  color: white;
  font-family: Inter;
  
`;

const MonthText = styled.p`
  display: flex;
  justify-content: space-between;
`;

const ArrowContainer = styled.span`
  ${(props) => (props.onClick ? '&:hover{cursor: pointer;}' : null)};
`;

function MonthSelector({
  selectedMonth, setSelectedMonth, finalMonthForDisplay, firstMonthForDisplay,
}) {
  const { selectedYear } = useSelector((state) => ({
    ...state.sportReducer,
  }));

  const monthsForScroll = (year, firstMonthForDisplay, finalMonthForDisplay, onlyShownMonths) => {
    year = Number(year);

    const allMonths = {
      1: `April ${year}`,
      2: `May ${year}`,
      3: `June ${year}`,
      4: `July ${year}`,
      5: `August ${year}`,
      6: `September ${year}`,
      7: `October ${year}`,
      8: `November ${year}`,
      9: `December ${year}`,
      10: `January ${year + 1}`,
      11: `February ${year + 1}`,
      12: `March ${year + 1}`,
      13: `April ${year + 1}`,
      14: `May ${year + 1}`,
    };

    const finalMonth = finalMonthForDisplay || 14;
    const firstMonth = firstMonthForDisplay || 1;

    const months = {};
    for (let i = firstMonth; i <= finalMonth; i++) {
      // if onlyShownMonths array prop exists, only push months in that array. otherwise push all
      if (onlyShownMonths ? onlyShownMonths.includes(allMonths[i]) : true) months[i] = allMonths[i];
    }
    return months;
  };

  const months = monthsForScroll(selectedYear, firstMonthForDisplay, finalMonthForDisplay);

  return (

    <Container>
      <MonthText>
        {
          months[selectedMonth - 1]
            ? <ArrowContainer onClick={() => setSelectedMonth(selectedMonth - 1)} style={{ transform: 'scale(-1,1)' }}>{arrowClickable}</ArrowContainer>
            : <ArrowContainer>{arrowUnClickable}</ArrowContainer>

        }
        <span>{months[selectedMonth]}</span>
        {
          months[selectedMonth + 1]
            ? <ArrowContainer onClick={() => setSelectedMonth(selectedMonth + 1)}>{arrowClickable}</ArrowContainer>
            : <ArrowContainer style={{ transform: 'scale(-1,1)' }}>{arrowUnClickable}</ArrowContainer>

        }
      </MonthText>
    </Container>
  );
}

export default MonthSelector;
