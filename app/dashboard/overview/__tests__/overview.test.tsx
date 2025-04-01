import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import OverviewPage from '../page';
import overviewReducer from '@/store/slices/overviewSlice';
import { useRouter } from 'next/navigation';
import { OverviewFormData } from '@/store/types';

// Mock the next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Create a mock store
const createMockStore = (initialState: Partial<OverviewFormData> = {}) => {
  return configureStore({
    reducer: {
      overview: overviewReducer,
    },
    preloadedState: {
      overview: {
        department: '',
        location: '',
        projectName: '',
        description: '',
        searchTerm: '',
        isSubmitted: false,
        ...initialState,
      },
    },
  });
};

// Create a wrapper component with the necessary providers
const renderWithProviders = (ui: React.ReactElement, { store = createMockStore() } = {}) => {
  return render(
    <Provider store={store}>
      {ui}
    </Provider>
  );
};

describe('OverviewPage', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      push: mockPush,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders all form fields', () => {
    renderWithProviders(<OverviewPage />);

    expect(screen.getByText('Department')).toBeInTheDocument();
    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getByLabelText('Project Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByLabelText('Search')).toBeInTheDocument();
  });

  it('shows validation errors when submitting empty form', async () => {
    renderWithProviders(<OverviewPage />);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Please select a department')).toBeInTheDocument();
      expect(screen.getByText('Please select a location')).toBeInTheDocument();
      expect(screen.getByText('Please enter a project name')).toBeInTheDocument();
      expect(screen.getByText('Please enter a description')).toBeInTheDocument();
    });
  });

  it('successfully submits form with valid data', async () => {
    renderWithProviders(<OverviewPage />);

    // Fill in the form
    const departmentDropdown = screen.getByText('Select department');
    fireEvent.click(departmentDropdown);
    fireEvent.click(screen.getByText('Engineering'));

    const locationDropdown = screen.getByText('Select location');
    fireEvent.click(locationDropdown);
    fireEvent.click(screen.getByText('New York'));

    const projectNameInput = screen.getByLabelText('Project Name');
    fireEvent.change(projectNameInput, { target: { value: 'Test Project' } });

    const descriptionInput = screen.getByLabelText('Description');
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('disables form when data exists in Redux store', () => {
    const store = createMockStore({
      department: 'Engineering',
      location: 'New York',
      projectName: 'Existing Project',
      description: 'Existing Description',
      isSubmitted: true,
    });

    renderWithProviders(<OverviewPage />, { store });

    expect(screen.getByLabelText('Project Name')).toBeDisabled();
    expect(screen.getByLabelText('Description')).toBeDisabled();
    expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled();
  });

  it('navigates back to dashboard when clicking breadcrumb', () => {
    renderWithProviders(<OverviewPage />);

    const dashboardLink = screen.getByText('Dashboard');
    fireEvent.click(dashboardLink);

    expect(mockPush).toHaveBeenCalledWith('/dashboard');
  });
});