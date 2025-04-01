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
import { useTheme } from '../app/ThemeContext';
import { useTranslation } from 'react-i18next';
// import LanguageSelector from './LanguageSelector';

export default function NavBar() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <HeaderContainer
      render={() => (
        <Header aria-label="IBM IntelliSphere® Optim™">
          <HeaderName prefix="IBM IntelliSphere®">Optim™</HeaderName>
          <HeaderNavigation aria-label="IBM IntelliSphere® Optim™">
          </HeaderNavigation>
          <HeaderGlobalBar>
            <HeaderGlobalAction aria-label={t('switchTheme')} onClick={toggleTheme}>
              {theme === 'white' ? <Moon size={20} /> : <Sun size={20} />}
            </HeaderGlobalAction>
            {/* <LanguageSelector /> */}
            <HeaderGlobalAction aria-label={t('notifications')}>
              <Notification size={20} />
            </HeaderGlobalAction>
            <HeaderGlobalAction aria-label={t('settings')}>
              <Settings size={20} />
            </HeaderGlobalAction>
            <HeaderGlobalAction aria-label={t('user')}>
              <UserAvatar size={20} />
            </HeaderGlobalAction>
          </HeaderGlobalBar>
        </Header>
      )}
    />
  );
}