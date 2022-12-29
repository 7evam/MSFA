import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import "@fontsource/open-sans";
import TradeCard from "./TradeCard";
import MonthTicker from "../../components/MonthTicker";
import YearSelector from "../../components/YearSelector";

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

const tradeStates = ["received", "proposed", "accepted", "declined"];

function Trades({ trades, reFetchTrades }) {
  const { currentOrganization } = useSelector((state) => ({
    ...state.authReducer
  }));

  const [selectedRoflYear, setSelectedRoflYear] = useState(2022);
  const [roflMonth, setRoflMonth] = useState(
    trades ? Math.max(...Object.keys(trades)) : null
  );

  let activeYearArray = Object.keys(currentOrganization.activeYears);

  return (
    <Container>
      {roflMonth ? (
        <Container>
          {activeYearArray.length === 2 ? (
            <YearSelector
              activeYearArray={activeYearArray}
              setSelectedRoflYear={setSelectedRoflYear}
              selectedRoflYear={selectedRoflYear}
            />
          ) : (
            <YearContainer>
              <p>RoFL Year: {selectedRoflYear}</p>
            </YearContainer>
          )}

          <MonthTicker
            roflMonth={roflMonth}
            setRoflMonth={setRoflMonth}
            selectedRoflYear={selectedRoflYear}
            onlyShownMonths={Object.keys(trades).map((n) => Number(n))}
          />
          <MonthContainer>
            <p>RoFL Month: {roflMonth}</p>
          </MonthContainer>
          {tradeStates.map((state) => {
            const hasLength =
              trades[roflMonth] && trades[roflMonth][state]?.length
                ? true
                : false;
            if (hasLength)
              return (
                <>
                  <h2>
                    {state.charAt(0).toUpperCase() + state.slice(1)} trades
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
          })}
        </Container>
      ) : (
        <div>You have no trades</div>
      )}
    </Container>
  );
}

export default Trades;
