import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import overviewReducer from '@/store/slices/overviewSlice';
import OverviewPage from '@/app/dashboard/overview/page';

// Mock the next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
}));

const store = configureStore({
  reducer: {
    overview: overviewReducer,
  },
});

describe('OverviewPage', () => {
  const renderWithProvider = (component: React.ReactNode) => {
    return render(
      <Provider store={store}>
        {component}
      </Provider>
    );
  };

  it('renders all form fields', () => {
    renderWithProvider(<OverviewPage />);
    
    expect(screen.getByText('Department')).toBeInTheDocument();
    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getByLabelText('Project Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('shows validation errors when submitting empty form', () => {
    renderWithProvider(<OverviewPage />);
    
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    expect(screen.getByText('Please select a department')).toBeInTheDocument();
    expect(screen.getByText('Please select a location')).toBeInTheDocument();
    expect(screen.getByText('Please enter a project name')).toBeInTheDocument();
    expect(screen.getByText('Please enter a description')).toBeInTheDocument();
  });

  it('successfully submits form with valid data', () => {
    renderWithProvider(<OverviewPage />);
    
    // Fill in form fields
    fireEvent.change(screen.getByLabelText('Department'), { target: { value: 'Engineering' } });
    fireEvent.change(screen.getByLabelText('Location'), { target: { value: 'New York' } });
    fireEvent.change(screen.getByLabelText('Project Name'), { target: { value: 'Test Project' } });
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Test Description' } });
    
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    // Check if form data is in Redux store
    const state = store.getState();
    expect(state.overview.isSubmitted).toBe(true);
    expect(state.overview.projectName).toBe('Test Project');
  });

  it('disables form fields when form is already submitted', () => {
    store.dispatch({
      type: 'overview/setFormData',
      payload: {
        department: 'Engineering',
        location: 'New York',
        projectName: 'Test Project',
        description: 'Test Description',
        searchTerm: '',
      },
    });

    renderWithProvider(<OverviewPage />);

    expect(screen.getByLabelText('Project Name')).toBeDisabled();
    expect(screen.getByLabelText('Description')).toBeDisabled();
    expect(screen.queryByText('Submit')).not.toBeInTheDocument();
  });
});