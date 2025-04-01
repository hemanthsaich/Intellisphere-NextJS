'use client';

import { TextInput, Button } from '@carbon/react';
import { Search } from '@carbon/icons-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFormData } from '@/store/slices/overviewSlice';
import type { RootState } from '@/store/store';

interface TestInputProps {
  searchTerm?: string;
  setSearchTerm?: (value: string) => void;
  isDisabled?: boolean;
  onSearch?: (term: string) => void;
  useRedux?: boolean;
}

export default function TestInput({
  searchTerm: propSearchTerm,
  setSearchTerm: propSetSearchTerm,
  isDisabled = false,
  onSearch,
  useRedux = false
}: TestInputProps) {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.overview);

  const [searchTerm, setSearchTerm] = useState(propSearchTerm || formData.searchTerm || '');

  const handleSearch = () => {
    if (useRedux) {
      dispatch(setFormData({ ...formData, searchTerm }));
    }
    onSearch?.(searchTerm);
    console.log('Searching for:', searchTerm);
  };

  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
      <TextInput
        id="search-input"
        labelText="Search Documents"
        placeholder="Enter search term"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          propSetSearchTerm?.(e.target.value);
        }}
        disabled={isDisabled || formData.isSubmitted}
      />
      <Button
        renderIcon={Search}
        onClick={handleSearch}
        disabled={isDisabled || formData.isSubmitted}
      >
        Search
      </Button>
    </div>
  );
}
