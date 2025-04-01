'use client';

import { Theme } from '@carbon/react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { ThemeProvider, useTheme } from './ThemeContext';
import { I18nextProvider } from 'react-i18next';
import i18n from '../components/i18n/i18n';

function ThemedContainer({ children }) {
  const { theme } = useTheme();
  return <Theme theme={theme}>{children}</Theme>;
}

export function Providers({ children }) {
  return (
    <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <ThemeProvider>
        <ThemedContainer>{children}</ThemedContainer>
      </ThemeProvider>
    </Provider>
    </I18nextProvider>
  );
}