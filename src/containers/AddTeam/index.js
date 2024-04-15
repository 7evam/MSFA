import React from 'react';
import '@fontsource/open-sans';

import Loading from '../../components/Loading';
import {
  Tab, TabSelector, Container,
} from './components';
import useAddTeam from './useAddTeam';
import UnownedTeams from './UnownedTeams';
import CurrentRosters from './CurrentRosters';
import CurrentBids from './CurrentBids';
import Trades from './Trades';
import ArchivedMessage from './ArchivedMessage';
import PastTransactions from './PastTransactions';

function AddTeam() {
  const {
    isArchived,
    firstActiveMonthForClaim,
    reFetchTrades,
    trades,
    handleTrade,
    handleAdd, setAllBids,
    originalBids, reFetchBids,
    firstLeagueToShow, tab, setTab,
    allBids, handleClaim,
    activeYears, dropTeam,
    handleAction, readyToRender,
    selectedMember, handleChange, currentRoster,
    sportTeams, league, setLeague,
    unownedTeams, currentOrganization, waiverExceptions, transactions,
  } = useAddTeam();

  const getContent = (tab) => {
    switch (tab) {
      case 'rosters':
        return <CurrentRosters isArchived={isArchived} dropTeam={dropTeam} handleTrade={handleTrade} selectedMember={selectedMember} handleChange={handleChange} currentRoster={currentRoster} />;
      case 'unownedTeams':
        if (isArchived) {
          return <ArchivedMessage />;
        }
        return <UnownedTeams waiverExceptions={waiverExceptions} isArchived={isArchived} firstActiveMonthForClaim={firstActiveMonthForClaim} handleAdd={handleAdd} firstLeagueToShow={firstLeagueToShow} handleAction={handleAction} handleClaim={handleClaim} league={league} setLeague={setLeague} activeYears={activeYears} unownedTeams={unownedTeams} sportTeams={sportTeams} />;

      case 'bids':
        if (isArchived) {
          return <ArchivedMessage />;
        }
        return <CurrentBids originalBids={originalBids} setAllBids={setAllBids} reFetchBids={reFetchBids} currentOrganization={currentOrganization} allBids={allBids} sportTeams={sportTeams} />;
      case 'trades':
        if (isArchived) {
          return <ArchivedMessage />;
        }
        return <Trades reFetchTrades={reFetchTrades} trades={trades} />;
      case 'transactions':
        return <PastTransactions transactions={transactions} />;
      default:
        return <div>Tab not found</div>;
    }
  };
  return (
    readyToRender
      ? (
        <Container>
          <TabSelector>
            <Tab selected={tab === 'rosters'} onClick={() => setTab('rosters')}>
              Rosters
            </Tab>
            <Tab selected={tab === 'unownedTeams'} onClick={() => setTab('unownedTeams')}>
              Unowned Teams
            </Tab>
            <Tab selected={tab === 'bids'} onClick={() => setTab('bids')}>
              Current Bids
            </Tab>
            <Tab selected={tab === 'trades'} onClick={() => setTab('trades')}>
              Trades
            </Tab>
            <Tab selected={tab === 'transactions'} onClick={() => setTab('transactions')}>
              Past Transactions
            </Tab>
          </TabSelector>
          {
            getContent(tab)
          }
        </Container>
      ) : <Loading />
  );
}

export default AddTeam;
