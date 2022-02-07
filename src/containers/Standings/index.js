import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import useStandings from './useStandings';
import { convertMonthToReadable } from "../../utils";
import {useSelector} from 'react-redux'
import MonthTicker from '../../components/MonthTicker'

const Container = styled.div``;
const Slot = styled.div`
  margin-top: 25px;
`;
const SelectButton = styled.button`
  background: ${(props) =>
    props.selectedSlot && props.selectedSlot === props.name
      ? "darkred"
      : "limegreen"};
`;

const BannerMessage = styled.div``;

const MonthButton = styled.button`
  background: ${(props) => (props.selectedMonth ? "limegreen" : "white")};
`;

const ScrollMenuContainer = styled.div`
  background-color: #333;
  width: 450px;
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
  padding: 14px;
  text-decoration: none;
  width: 100px;
  cursor: pointer;
`;

const ScrollMenuButton = styled.a`
  display: inline-block;
  color: white;
  text-align: center;
  padding: 14px;
  text-decoration: none;
  width: 25px;
  cursor: pointer;
`;

const Td = styled.td`
    padding: 12px;
`

function Standings(props) {
    const {
        standings,
        selectedRoflYear,
        roflMonth,
        setRoflMonth,
        lastMonth
    } = useStandings()

  const [appliedScroll, setAppliedScroll] = useState(false);

  const scrollLeft = () => {
    scrollRef.current.scrollLeft -= 400;
  };

  const scrollRight = () => {
    scrollRef.current.scrollLeft += 400;
  };

  const scrollRef = React.createRef();

  useEffect(() => {
    if (scrollRef && scrollRef.current && !appliedScroll) {
      scrollRef.current.scrollLeft += (roflMonth - 1) * 107;
      setAppliedScroll(true);
    }
  }, [scrollRef]);


  return (
    
    <Container>
      <p>Welcome to standings</p>
      {standings ?
      <div>
          <p>year: {selectedRoflYear}</p>

          <MonthTicker lastMonth={lastMonth} roflMonth={roflMonth} setRoflMonth={setRoflMonth} selectedRoflYear={selectedRoflYear}/>

          {/* <ScrollMenuContainer>
            <ScrollMenuButton onClick={scrollLeft}>{"<"}</ScrollMenuButton>
            <ScrollMenu ref={scrollRef}>
              {monthsForScroll(selectedRoflYear).map((item) => (
                <ScrollMenuLink
                  selected={item.number === roflMonth}
                  key={item.number}
                  onClick={() => setRoflMonth(item.number)}
                >
                  {item.month}
                </ScrollMenuLink>
              ))}
            </ScrollMenu>
            <ScrollMenuButton onClick={scrollRight}>{">"}</ScrollMenuButton>
          </ScrollMenuContainer> */}

          <tr>
            <Td><strong>Rank</strong></Td>   
            <Td><strong>Person Name</strong></Td>
            <Td><strong>Team Name</strong></Td> 
            <Td><strong>Monthly Points</strong></Td>
            <Td><strong>Total points</strong></Td>
          </tr>

          {standings[`${roflMonth}-${selectedRoflYear}`].map((val, index) => (
            ( 
            <tr key={val.userId}>
            <Td>{index + 1}</Td>   
            <Td>{val.personName}</Td>
            <Td>{val.teamName}</Td> 
            <Td>{val.monthlyPoints}</Td>
            <Td>{val.cumulativePoints}</Td>
            </tr>
            )
          ))}

          </div>
          : 
    <p>loading....</p>}
    </Container> 
    
  );
}

export default Standings;



