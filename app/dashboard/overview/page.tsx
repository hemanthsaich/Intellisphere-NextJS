'use client';

import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setFormData } from '@/store/slices/overviewSlice';
import type { RootState } from '@/store/types';
import {
  Grid,
  Column,
  Dropdown,
  TextInput,
  Button,
  Form,
  Breadcrumb,
  BreadcrumbItem,
} from '@carbon/react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import styles from './overview.module.scss';

const departments = ['Engineering', 'Marketing', 'Sales', 'Human Resources', 'Finance'];
const locations = ['New York', 'London', 'Tokyo', 'Singapore', 'Sydney'];

const validationSchema = Yup.object({
  department: Yup.string().required('Please select a department'),
  location: Yup.string().required('Please select a location'),
  projectName: Yup.string().required('Please enter a project name'),
  description: Yup.string().required('Please enter a description'),
});

type FormValues = {
  department: string;
  location: string;
  projectName: string;
  description: string;
  searchTerm: string;
};

export default function OverviewPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.overview);
  
  const [isFormDisabled, setIsFormDisabled] = useState(formData.isSubmitted);

  const initialValues: FormValues = {
    department: formData.department,
    location: formData.location,
    projectName: formData.projectName,
    description: formData.description,
    searchTerm: formData.searchTerm,
  };

  const handleSubmit = (values: FormValues) => {
    dispatch(setFormData(values));
    setIsFormDisabled(true);
    router.push('/dashboard');
  };

  return (
    <div className={styles.formContainer}>
      <Grid>
        <Column lg={16} md={8} sm={4}>
          <Breadcrumb noTrailingSlash>
            <BreadcrumbItem onClick={() => router.push('/dashboard')}>Dashboard</BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>Overview</BreadcrumbItem>
          </Breadcrumb>

          <h1 className="cds--type-productive-heading-05">System Overview</h1>

          <div className={styles.formWrapper}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched, handleChange, setFieldValue, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <div className={styles.formGroup}>
                    <Dropdown
                      id="department"
                      titleText="Department"
                      label="Select department"
                      items={departments}
                      selectedItem={values.department}
                      onChange={({ selectedItem }) => setFieldValue('department', selectedItem || '')}
                      disabled={isFormDisabled}
                      invalid={touched.department && !!errors.department}
                      invalidText={errors.department}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <Dropdown
                      id="location"
                      titleText="Location"
                      label="Select location"
                      items={locations}
                      selectedItem={values.location}
                      onChange={({ selectedItem }) => setFieldValue('location', selectedItem || '')}
                      disabled={isFormDisabled}
                      invalid={touched.location && !!errors.location}
                      invalidText={errors.location}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <TextInput
                      id="projectName"
                      labelText="Project Name"
                      value={values.projectName}
                      onChange={handleChange}
                      disabled={isFormDisabled}
                      invalid={touched.projectName && !!errors.projectName}
                      invalidText={errors.projectName}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <TextInput
                      id="description"
                      labelText="Description"
                      value={values.description}
                      onChange={handleChange}
                      disabled={isFormDisabled}
                      invalid={touched.description && !!errors.description}
                      invalidText={errors.description}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <TextInput
                      id="searchTerm"
                      labelText="Search"
                      value={values.searchTerm}
                      onChange={handleChange}
                      disabled={isFormDisabled}
                    />
                  </div>

                  <div className={styles.buttonContainer}>
                    <Button type="submit" disabled={isFormDisabled}>
                      Submit
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Column>
      </Grid>
    </div>
  );
}