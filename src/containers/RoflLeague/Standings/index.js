import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import useStandings from './useStandings';
import { convertMonthToReadable, shortenName } from '../../../utils';
import MonthTicker from '../../../components/MonthTicker';
import Loading from '../../../components/Loading';
import {
  StandingsContainer, Heading, Container, Td, Th, SlotRow, YearContainer, TitleRow,
} from './components';

function Standings(props) {
  const {
    standings,
    selectedRoflYear,
    roflMonth,
    setRoflMonth,
    finalMonthForDisplay,
    goToSquad,
    selectedYear,
    readyToRender,
  } = useStandings();

  const [appliedScroll, setAppliedScroll] = useState(false);

  const scrollRef = React.createRef();

  useEffect(() => {
    if (scrollRef && scrollRef.current && !appliedScroll) {
      scrollRef.current.scrollLeft += (roflMonth - 2) * 228;
      setAppliedScroll(true);
    }
  }, [scrollRef]);

  return (
    <Container>
      {/* <Heading>League Standings</Heading> */}
      {readyToRender ? (
        <StandingsContainer>
          <YearContainer>
            <p>
              MSFA Year:
              {selectedYear}
            </p>
          </YearContainer>
          <MonthTicker
            finalMonthForDisplay={finalMonthForDisplay}
            roflMonth={roflMonth}
            setRoflMonth={setRoflMonth}
            selectedYear={selectedYear}
          />
          <TitleRow>
            <Th column="rank">
              <strong>Rank</strong>
            </Th>
            <Th column="personName">
              <strong>Person Name</strong>
            </Th>
            <Th column="teamName">
              <strong>Team Name</strong>
            </Th>
            <Th column="monthPoints">
              <strong>Monthly Points</strong>
            </Th>
            <Th column="totalPoints">
              <strong>Total points</strong>
            </Th>
          </TitleRow>

          {standings[`${roflMonth}-${selectedYear}`].map((val, index) => (
            <SlotRow key={val.userId}>
              <Td column="rank">{index + 1}</Td>
              <Td column="personName">{val.personName}</Td>
              <Td column="teamName"><a onClick={() => goToSquad(val.userId)}>{shortenName(val.teamName)}</a></Td>
              <Td column="monthPoints">{val.monthlyPoints}</Td>
              <Td column="totalPoints">{val.cumulativePoints}</Td>
            </SlotRow>
          ))}
        </StandingsContainer>

      ) : (
        <Loading />
      )}
    </Container>
  );
}

export default Standings;
