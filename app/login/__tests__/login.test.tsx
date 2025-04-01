import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import Login from '../page';

// Mock the next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock the ThemeContext
jest.mock('../../ThemeContext', () => ({
  useTheme: () => ({ theme: 'g100' }),
}));

// Mock the i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: { [key: string]: string } = {
        'auth.signIn': 'Sign In',
        'auth.email': 'Email',
        'auth.password': 'Password',
        'auth.login': 'Login',
        'auth.noAccount': 'No account?',
        'auth.validation.emailRequired': 'Email is required',
        'auth.validation.emailInvalid': "Invalid email address",
        'auth.validation.passwordRequired': 'Password is required',
        'auth.validation.passwordMin': 'Password must be at least 8 characters',
      };
      return translations[key] || key;
    },
  }),
}));

// Mock the LanguageSelector component
jest.mock('@/components/LanguageSelector', () => {
  return function MockLanguageSelector() {
    return <div data-testid="language-selector">Language Selector</div>;
  };
});

describe('Login Page', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      push: mockPush,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders login form with all fields', () => {
    render(<Login />);

    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    expect(screen.getByText('No account?')).toBeInTheDocument();
    expect(screen.getByTestId('language-selector')).toBeInTheDocument();
  });

  it('shows validation errors for empty form submission', async () => {
    render(<Login />);

    const submitButton = screen.getByRole('button', { name: 'Login' });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Password is required')).toBeInTheDocument();
    });
  });

  it('shows validation error for invalid email', async () => {
    render(<Login />);

    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    
    const submitButton = screen.getByRole('button', { name: 'Login' });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.findByRole('alert', { name: /Invalid email address/i })).resolves.toBeInTheDocument();
    });
  });

  it('shows validation error for short password', async () => {
    render(<Login />);

    const passwordInput = screen.getByLabelText('Password');
    fireEvent.change(passwordInput, { target: { value: '123' } });
    
    const submitButton = screen.getByRole('button', { name: 'Login' });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Password must be at least 8 characters')).toBeInTheDocument();
    });
  });

  it('successfully submits form with valid data', async () => {
    render(<Login />);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    
    fireEvent.change(emailInput, { target: { value: 'hem@mail.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password@123' } });

    const submitButton = screen.getByRole('button', { name: 'Login' });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/dashboard');
    });
  });

});