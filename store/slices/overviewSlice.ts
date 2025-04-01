import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OverviewFormData } from '../types';

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
      return {
        ...state,
        ...action.payload,
        isSubmitted: true,
      };
    },
    resetForm: () => initialState,
  },
});

export const { setFormData, resetForm } = overviewSlice.actions;
export default overviewSlice.reducer;