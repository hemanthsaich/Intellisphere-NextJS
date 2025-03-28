import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OverviewFormData {
  department: string;
  location: string;
  projectName: string;
  description: string;
  searchTerm: string;
  isSubmitted: boolean;
}

const initialState: OverviewFormData = {
  department: '',
  location: '',
  projectName: '',
  description: '',
  searchTerm: '',
  isSubmitted: false,
};

const overviewSlice = createSlice({
  name: 'overview',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<Omit<OverviewFormData, 'isSubmitted'>>) => {
      return { ...state, ...action.payload, isSubmitted: true };
    },
    resetForm: () => initialState,
  },
});

export const { setFormData, resetForm } = overviewSlice.actions;
export default overviewSlice.reducer;