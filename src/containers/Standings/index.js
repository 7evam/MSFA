import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useStandings from "./useStandings";
import { convertMonthToReadable } from "../../utils";
import { useSelector } from "react-redux";
import MonthTicker from "../../components/MonthTicker";
import Loading from "../../components/Loading";

const Container = styled.div``;
const Td = styled.td`
  padding: 12px;
`;

function Standings(props) {
  const {
    standings,
    selectedRoflYear,
    roflMonth,
    setRoflMonth,
    finalMonthForDisplay
  } = useStandings();

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
      {standings ? (
        <div>
          <p>year: {selectedRoflYear}</p>

          <MonthTicker
            finalMonthForDisplay={finalMonthForDisplay}
            roflMonth={roflMonth}
            setRoflMonth={setRoflMonth}
            selectedRoflYear={selectedRoflYear}
          />

          <tr>
            <Td>
              <strong>Rank</strong>
            </Td>
            <Td>
              <strong>Person Name</strong>
            </Td>
            <Td>
              <strong>Team Name</strong>
            </Td>
            <Td>
              <strong>Monthly Points</strong>
            </Td>
            <Td>
              <strong>Total points</strong>
            </Td>
          </tr>

          {standings[`${roflMonth}-${selectedRoflYear}`].map((val, index) => (
            <tr key={val.userId}>
              <Td>{index + 1}</Td>
              <Td>{val.personName}</Td>
              <Td>{val.teamName}</Td>
              <Td>{val.monthlyPoints}</Td>
              <Td>{val.cumulativePoints}</Td>
            </tr>
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </Container>
  );
}

export default Standings;
