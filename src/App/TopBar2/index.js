import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from '../../icons/msfaLogo';
import Menu from '../../icons/menu';
import Settings from '../../icons/settings';
import chevron from '../../icons/chevron';
import { mobileBreakPoint } from '../../constants/style';
// const CustomNavLink = styled(NavLink)`
// `;

const Container = styled.div`
  font-family: "Ariel", sans-serif;
  height: 70px;
  background-color: #010626;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 16px 0px 16px;
    margin-bottom: ${(props) => (props.menuOpen ? null : '16px;')};
    @media (min-width: ${mobileBreakPoint}){
      grid-area: 1 / 1 / 2 / 3;
    }
    
`;

const MenuContainer = styled.div`
margin-left: 25px;
    &:hover{
        cursor: pointer;
    }
    @media (min-width: ${mobileBreakPoint}){
      display: none;
    }
`;

const MenuContent = styled.div`
    height: 100vh;
    background-color: #010626;
`;

const MenuItem = styled(NavLink)`
    text-decoration: none;
    width: 100%;
    border: 4px solid white;
    box-sizing: border-box;
    border-bottom: ${(props) => (props.bottomItem ? '4px solid white' : 'none')};
    height: 60px;
    color: ${(props) => (props.selected ? '#F25C05' : 'white')};
    font-size: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover{
        background-color: #F25C05;
        color: white;
    }
`;

const LogoContainer = styled.div`
  @media (min-width: ${mobileBreakPoint}){
    display: none;
  }
`;

const LeagueContainer = styled(NavLink)`
color: white;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
&:hover{
  cursor: pointer;
  color: #F25C05;
}
`;

const SettingsContainer = styled(NavLink)`
color: white;
margin-left: 25px;
&:hover{
  color: #F25C05;
}
cursor: pointer;
@media (max-width: ${mobileBreakPoint}){
  display: none;
}
`;

const RightSideContainer = styled.div`
display: flex;
flex-direction: row;
align-items: center;
`;

function TopBar({ isMenuOpen, setIsMenuOpen }) {
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <Container menuOpen={isMenuOpen}>
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
      </Container>
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

{ /* <CustomNavLink >
                Squad
              </CustomNavLink> */ }

//   <Nav className="grid-container">
//     <NavGroup>
//       <AppRoutes>
//         <CustomNavLink to="/squad" selected={location.pathname.includes('squad')}>
//           Squad
//         </CustomNavLink>
//         <CustomNavLink to="/rofleague" selected={location.pathname.includes('rofleague')}>
//           League
//         </CustomNavLink>

//         <CustomNavLink to="/scoring" selected={location.pathname.includes('scoring')}>
//           Scoring
//         </CustomNavLink>

//         <CustomNavLink to="/add-team" selected={location.pathname.includes('add-team')}>
//           Transactions
//         </CustomNavLink>
//       </AppRoutes>
//       <AppActions>
//         <CustomNavLink to="/settings" selected={location.pathname.includes('settings')}>
//           Settings
//         </CustomNavLink>
//         <CustomNavLink to="/">
//           <span onClick={logOut}>Log Out</span>
//         </CustomNavLink>
//       </AppActions>
//     </NavGroup>
//   </Nav>;
