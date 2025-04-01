'use client';

import { Theme, Button } from '@carbon/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useTheme } from '../app/ThemeContext'; // Import global theme context

export default function Home() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    router.push('/login');
  }, [router]);

  return (
    <Theme theme={theme}>
    </Theme>
  );
}
