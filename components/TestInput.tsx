'use client';

import { TextInput, Button } from '@carbon/react';
import { Search } from '@carbon/icons-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFormData } from '@/store/slices/overviewSlice';
import type { RootState } from '@/store/store';

export default function TestInput() {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.overview);
  const [searchTerm, setSearchTerm] = useState(formData.searchTerm || '');

  const handleSearch = () => {
    dispatch(setFormData({ ...formData, searchTerm }));
    console.log('Searching for:', searchTerm);
  };

  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
      <TextInput
        id="search-input"
        labelText="Search Documents"
        placeholder="Enter search term"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        disabled={formData.isSubmitted}
      />
      <Button
        renderIcon={Search}
        onClick={handleSearch}
        disabled={formData.isSubmitted}
      >
        Search
      </Button>
    </div>
  );
}