'use client';

import {
  Form,
  Theme,
  TextInput,
  Button,
  Link,
  PasswordInput,
  Tile,
} from '@carbon/react';
import { Login as LoginIcon } from '@carbon/icons-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { useTheme } from '../ThemeContext'; 

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

export default function Login() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme(); // Use global theme

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      console.log('Login attempt:', values);
      router.push('/dashboard');
    },
  });

  return (
    <Theme theme={theme}>
      <main className="auth-container">
        <Tile className="auth-form">
          <div className="header">
            <h1>Sign in</h1>
          </div>
          <Form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <TextInput
                id="email"
                labelText="Email"
                type="email"
                {...formik.getFieldProps('email')}
                invalid={formik.touched.email && !!formik.errors.email}
                invalidText={formik.touched.email && formik.errors.email}
              />
            </div>
            <div className="form-group">
              <PasswordInput
                id="password"
                labelText="Password"
                {...formik.getFieldProps('password')}
                invalid={formik.touched.password && !!formik.errors.password}
                invalidText={formik.touched.password && formik.errors.password}
              />
            </div>
            <div className="form-actions">
              <Button type="submit" renderIcon={LoginIcon}>
                Login
              </Button>
              <Link href="/register">Don't have an account? Register here</Link>
            </div>
          </Form>
        </Tile>
      </main>
    </Theme>
  );
}
