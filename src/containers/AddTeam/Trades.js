import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import '@fontsource/open-sans';
import TradeCard from './TradeCard';
import MonthTicker from '../../components/MonthTicker';
import YearSelector from '../../components/YearSelector';
import { red } from '../../constants/style';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const MonthContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 18px;
`;

const YearContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 18px;
`;

const tradeStates = ['received', 'proposed', 'accepted', 'declined'];

function Trades({ trades, reFetchTrades }) {
  const { currentOrganization } = useSelector((state) => ({
    ...state.authReducer,
  }));

  const { selectedYear } = useSelector((state) => ({
    ...state.sportReducer,
  }));

  const [roflMonth, setRoflMonth] = useState(
    trades ? Math.max(...Object.keys(trades)) : null,
  );

  const activeYearArray = Object.keys(currentOrganization.activeYears);

  console.log('here are trades');
  console.log(trades);

  return (
    trades && Object.keys(trades).length
      ? (
        <Container>
          {roflMonth ? (
            <Container>
              <MonthTicker
                roflMonth={roflMonth}
                setRoflMonth={setRoflMonth}
                onlyShownMonths={Object.keys(trades).map((n) => Number(n))}
                selectedYear={selectedYear}
              />
              <MonthContainer>
                <p>
                  MSFA Month:
                  {roflMonth}
                </p>
              </MonthContainer>
              {tradeStates.map((state) => {
                const hasLength = !!(trades[roflMonth] && trades[roflMonth][state]?.length);
                if (hasLength) {
                  return (
                    <>
                      <h2>
                        {state.charAt(0).toUpperCase() + state.slice(1)}
                        {' '}
                        trades
                      </h2>
                      {trades[roflMonth][state].map((trade) => (
                        <TradeCard
                          reFetchTrades={reFetchTrades}
                          state={state}
                          trade={trade}
                        />
                      ))}
                    </>
                  );
                }
              })}
            </Container>
          ) : (
            <div>You have no trades</div>
          )}
        </Container>
      ) : <Container><p>You have no trades yet. To create a trade, use the rosters tab and explore someone else's roster. Click the trade button next to a team you'd like to trade for</p></Container>
  );
}

export default Trades;
