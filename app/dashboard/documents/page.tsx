'use client';

import { useState } from 'react';
import {
  Grid,
  Column,
  Breadcrumb,
  BreadcrumbItem,
} from '@carbon/react';
import { useRouter } from 'next/navigation';
import TestInput from '../../../components/TestInput';
import DropDown from '../../../components/DropDown';
import DataTable from '../../../components/DataTableDoc';
import styles from './documents.module.scss';

export default function DocumentsPage() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleDropDownChange = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <div className={styles.documentsContainer}>
      <Grid>
        <Column lg={16} md={8} sm={4}>
          <Breadcrumb noTrailingSlash>
            <BreadcrumbItem onClick={() => router.push('/dashboard')}>
              Dashboard
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>Documents</BreadcrumbItem>
          </Breadcrumb>
          
          <h1 className="cds--type-productive-heading-05">Document Management</h1>
          
          <div className={styles.componentsWrapper}>
            <TestInput />
            <DropDown onChange={handleDropDownChange} />
            {selectedOption && <DataTable selectedCategory={selectedOption} />}
          </div>
        </Column>
      </Grid>
    </div>
  );
}