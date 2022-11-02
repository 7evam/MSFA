import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {useSelector} from 'react-redux'

const Container = styled.div`
background-color: #333;
width: 500px;
display: flex;
flex-direction: row;
`;

const ScrollMenu = styled.div`
  overflow: auto;
  white-space: nowrap;
  display: inline-block;
  left: 100px;
`;

const ScrollMenuLink = styled.a`
  display: inline-block;
  color: ${(props) => (props.selected ? "limegreen" : "white")};
  text-align: center;
  padding-top: 15px;
  padding-left: 5px;
  padding-right: 5px;
  text-decoration: none;
  width: 125px;
  cursor: pointer;
`;

const ScrollMenuButton = styled.a`
  display: inline-block;
  color: white;
  text-align: center;
  padding: 15px;
  text-decoration: none;
  width: 25px;
  cursor: pointer;
`;

function MonthTicker({roflMonth, setRoflMonth, selectedRoflYear, finalMonthForDisplay, onlyShownMonths}) {
  console.log('here is only shown months')
  console.log(onlyShownMonths)
  const [appliedScroll, setAppliedScroll] = useState(false);

  const scrollLeft = () => {
    scrollRef.current.scrollLeft -= 135;
  };

  const scrollRight = () => {
    scrollRef.current.scrollLeft += 135;
  };

  const scrollRef = React.createRef();

  useEffect(() => {
    if (scrollRef && scrollRef.current && !appliedScroll) {
      scrollRef.current.scrollLeft += (roflMonth - 2) * 135;
      setAppliedScroll(true);
    }
  }, [scrollRef]);

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
    let months = []
    for(let i=0;i<finalMonth;i++){
        // if onlyShownMonths array prop exists, only push months in that array. otherwise push all
        if(onlyShownMonths ? onlyShownMonths.includes(allMonths[i].number) : true) months.push(allMonths[i])
    }
    return months
  };

  return (
        <Container>
        <ScrollMenuButton onClick={scrollLeft}>{"<"}</ScrollMenuButton>
        <ScrollMenu ref={scrollRef}>
            {monthsForScroll(selectedRoflYear).map((item) => (
            <ScrollMenuLink
                selected={Number(item.number) === Number(roflMonth)}
                key={item.number}
                onClick={() => setRoflMonth(item.number)}
            >
                {item.month}
            </ScrollMenuLink>
            ))}
        </ScrollMenu>
        <ScrollMenuButton onClick={scrollRight}>{">"}</ScrollMenuButton>
        </Container>
  );
}

export default MonthTicker;
