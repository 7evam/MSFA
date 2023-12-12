import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  SidebarContainer, SidebarItem,
} from './components';
import Logo from '../../icons/msfaLogo';

function Sidebar() {
  const location = useLocation();
  return (
    <SidebarContainer>
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
    </SidebarContainer>
  );
}

export default Sidebar;
