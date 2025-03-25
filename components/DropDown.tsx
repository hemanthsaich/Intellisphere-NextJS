'use client';

import { Dropdown } from '@carbon/react';
import { useState } from 'react';

interface DropDownProps {
  onChange: (selectedItem: string) => void;
}

export default function DropDown({ onChange }: DropDownProps) {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const items = [
    'All Documents',
    'Recent Documents',
    'Shared Documents',
    'Archived Documents',
  ];

  const handleSelect = (item: { selectedItem: string }) => {
    setSelectedItem(item.selectedItem);
    onChange(item.selectedItem);
  };

  return (
    <Dropdown
      id="document-filter"
      titleText="Filter Documents"
      label="Select category"
      items={items}
      selectedItem={selectedItem}
      onChange={handleSelect}
    />
  );
}