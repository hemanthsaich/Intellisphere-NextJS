'use client';

import { TextInput, Button } from '@carbon/react';
import { Search } from '@carbon/icons-react';
import { useState } from 'react';

export default function TestInput() {
  const [value, setValue] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', value);
  };

  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
      <TextInput
        id="search-input"
        labelText="Search Documents"
        placeholder="Enter search term"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button
        renderIcon={Search}
        onClick={handleSearch}
      >
        Search
      </Button>
    </div>
  );
}