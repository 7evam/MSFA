import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useStandings from "./useStandings";
import { convertMonthToReadable } from "../../../utils";
import { useSelector } from "react-redux";
import MonthTicker from "../../../components/MonthTicker";
import Loading from "../../../components/Loading";
import {Container, Td, Th, SlotRow, YearContainer, TitleRow} from './components'
import {shortenName} from '../../../utils'

function Standings(props) {
  const {
    standings,
    selectedRoflYear,
    roflMonth,
    setRoflMonth,
    finalMonthForDisplay,
    goToSquad
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
          <YearContainer>
          <p>RoFL Year: {selectedRoflYear}</p>
          </YearContainer>
          <MonthTicker
            finalMonthForDisplay={finalMonthForDisplay}
            roflMonth={roflMonth}
            setRoflMonth={setRoflMonth}
            selectedRoflYear={selectedRoflYear}
          />

          <TitleRow>
            <Th>
              <strong>Rank</strong>
            </Th>
            <Th>
              <strong>Person Name</strong>
            </Th>
            <Th>
              <strong>Team Name</strong>
            </Th>
            <Th>
              <strong>Monthly Points</strong>
            </Th>
            <Th>
              <strong>Total points</strong>
            </Th>
          </TitleRow>

          {standings[`${roflMonth}-${selectedRoflYear}`].map((val, index) => (
            <SlotRow key={val.userId}>
              <Td>{index + 1}</Td>
              <Td>{val.personName}</Td>
              <Td><a onClick={() => goToSquad(val.userId)}>{shortenName(val.teamName)}</a></Td>
              <Td>{val.monthlyPoints}</Td>
              <Td>{val.cumulativePoints}</Td>
            </SlotRow>
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </Container>
  );
}

export default Standings;
