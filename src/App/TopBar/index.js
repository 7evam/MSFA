import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Logo from '../../icons/msfaLogo';
import Menu from '../../icons/menu';
import Settings from '../../icons/settings';
import chevron from '../../icons/chevron';
import {
  TopBarContainer,
  MenuContainer,
  MenuContent,
  MenuItem,
  LogoContainer,
  LeagueContainer,
  SettingsContainer,
  RightSideContainer,
} from './components';

function TopBar({ isMenuOpen, setIsMenuOpen }) {
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <TopBarContainer menuOpen={isMenuOpen}>
        <LogoContainer>
          <Logo
            width={38}
            height={38}
          />
        </LogoContainer>
        <span />
        <RightSideContainer>
          <LeagueContainer to="/set-league-year">
            KHA 2022-23
            {chevron}
          </LeagueContainer>
          <MenuContainer selected={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu color={isMenuOpen ? '#F25C05' : 'white'} />
          </MenuContainer>
          <SettingsContainer to="/settings">
            <Settings color={location.pathname.includes('settings') ? '#F25C05' : 'white'} />
          </SettingsContainer>
        </RightSideContainer>
      </TopBarContainer>
      {
        isMenuOpen
          ? (
            <MenuContent>
              <MenuItem to="/squad" selected={location.pathname.includes('squad')}>Squad</MenuItem>
              <MenuItem to="/league" selected={location.pathname.includes('league')}>League</MenuItem>
              <MenuItem to="/scoring" selected={location.pathname.includes('scoring')}>Scoring</MenuItem>
              <MenuItem to="/league" selected={location.pathname.includes('transactions')}>Transactions</MenuItem>
              <MenuItem to="/settings" selected={location.pathname.includes('settings')} bottomItem>Settings</MenuItem>
            </MenuContent>
          )
          : null

      }

    </>
  );
}

export default TopBar;
