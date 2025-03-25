'use client';

import { Theme } from '@carbon/react';
import { ThemeProvider, useTheme } from './ThemeContext';

function ThemedContainer({ children }) {
  const { theme } = useTheme(); // Get theme from context
  return <Theme theme={theme}>{children}</Theme>; // Apply Carbon theme
}

export function Providers({ children }) {
  return (
    <ThemeProvider>
      <ThemedContainer>{children}</ThemedContainer>
    </ThemeProvider>
  );
}
