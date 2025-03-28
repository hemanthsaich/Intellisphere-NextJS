'use client';

import { Theme } from '@carbon/react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { ThemeProvider, useTheme } from './ThemeContext';

function ThemedContainer({ children }) {
  const { theme } = useTheme();
  return <Theme theme={theme}>{children}</Theme>;
}

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ThemedContainer>{children}</ThemedContainer>
      </ThemeProvider>
    </Provider>
  );
}