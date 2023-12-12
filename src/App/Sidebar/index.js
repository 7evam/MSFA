import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import RoflLogo from './RoflLogo.png';
import {
  NavGroup, SideBar, Nav, CustomNavLink, SidebarItem,
} from './components';
import Logo from '../../icons/msfaLogo';

function Sidebar({ setSidebarSelection, sidebarSelection }) {
  const location = useLocation();
  return (
    <SideBar>
      <SidebarItem>
        <Logo
          width={84}
          height={84}
        />
      </SidebarItem>
      <SidebarItem to="/squad" selected={location.pathname.includes('squad')}>
        Squad
      </SidebarItem>
      <SidebarItem to="/league" selected={location.pathname.includes('league')}>
        League
      </SidebarItem>
      <SidebarItem to="/scoring" selected={location.pathname.includes('scoring')}>
        Scoring
      </SidebarItem>
      <SidebarItem to="/transactions" selected={location.pathname.includes('transactions')}>
        Transactions
      </SidebarItem>
    </SideBar>
  );
}

export default Sidebar;
