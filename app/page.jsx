'use client';

import { Theme, Button } from '@carbon/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useTheme } from '../app/ThemeContext'; // Import global theme context

export default function Home() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme(); // Use global theme

  useEffect(() => {
    router.push('/login');
  }, [router]);

  return (
    <Theme theme={theme}>
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: theme === 'g100' ? '#fff' : '#000' }}>Loading...</p>
      </div>
    </Theme>
  );
}
