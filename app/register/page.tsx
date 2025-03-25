'use client';

import {
  Theme,
  Form,
  TextInput,
  PasswordInput,
  Button,
  Link,
  Tile,
  IconButton,
} from '@carbon/react';
import { UserFollow, Moon, Sun } from '@carbon/icons-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { useTheme } from '../ThemeContext'; // Theme context for toggling dark/light mode

const registerSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Must contain at least one number')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

export default function Register() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme(); // Get theme state & toggle function

  const formik = useFormik({
    initialValues: { email: '', password: '', confirmPassword: '' },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      console.log('Registration attempt:', values);
      router.push('/login');
    },
  });

  return (
    <Theme theme={theme}>
      <main className="auth-container">
        <Tile className="auth-form">
          <div className="header">
            <h1>Create Account</h1>
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
            <div className="form-group">
              <PasswordInput
                id="confirm-password"
                labelText="Confirm Password"
                {...formik.getFieldProps('confirmPassword')}
                invalid={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
                invalidText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              />
            </div>
            <div className="form-actions">
              <Button type="submit" renderIcon={UserFollow}>
                Register
              </Button>
              <Link href="/login">Already have an account? Sign in here</Link>
            </div>
          </Form>
        </Tile>
      </main>
    </Theme>
  );
}
