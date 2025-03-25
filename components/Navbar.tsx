'use client';

import {
  Header,
  HeaderContainer,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
} from '@carbon/react';
import { Moon, Sun, Notification, Settings, UserAvatar } from '@carbon/icons-react';
import { useTheme } from '../app/ThemeContext'; // Use theme from context

export default function NavBar() {
  const { theme, toggleTheme } = useTheme(); // Get theme and toggle function

  return (
    <HeaderContainer
      render={() => (
        <Header aria-label="IBM IntelliSphere® Optim™">
          <HeaderName prefix="IBM IntelliSphere®">Optim™</HeaderName>
          <HeaderNavigation aria-label="IBM IntelliSphere® Optim™">
            {/* <HeaderMenuItem href="/dashboard">Dashboard</HeaderMenuItem> */}
            {/* <HeaderMenuItem href="/dashboard/archive">Archive</HeaderMenuItem> */}
          </HeaderNavigation>
          <HeaderGlobalBar>
            <HeaderGlobalAction aria-label="Switch Theme" onClick={toggleTheme}>
              {theme === 'white' ? <Moon size={20} /> : <Sun size={20} />}
            </HeaderGlobalAction>
            <HeaderGlobalAction aria-label="Notifications">
              <Notification size={20} />
            </HeaderGlobalAction>
            <HeaderGlobalAction aria-label="Settings">
              <Settings size={20} />
            </HeaderGlobalAction>
            <HeaderGlobalAction aria-label="User">
              <UserAvatar size={20} />
            </HeaderGlobalAction>
          </HeaderGlobalBar>
        </Header>
      )}
    />
  );
}
