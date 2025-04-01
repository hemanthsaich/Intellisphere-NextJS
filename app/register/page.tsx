'use client';

import {
  Theme,
  Form,
  TextInput,
  PasswordInput,
  Button,
  Link,
  Tile,
  Grid,
} from '@carbon/react';
import { UserFollow } from '@carbon/icons-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { useTheme } from '../ThemeContext';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '@/components/LanguageSelector';

export default function Register() {
  const router = useRouter();
  const { theme } = useTheme();
  const { t } = useTranslation();

  const registerSchema = Yup.object().shape({
    email: Yup.string()
      .email(t('auth.validation.emailInvalid'))
      .required(t('auth.validation.emailRequired')),
    password: Yup.string()
      .min(8, t('auth.validation.passwordMin'))
      .matches(/[a-z]/, t('auth.validation.passwordLowercase'))
      .matches(/[A-Z]/, t('auth.validation.passwordUppercase'))
      .matches(/[0-9]/, t('auth.validation.passwordNumber'))
      .required(t('auth.validation.passwordRequired')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], t('auth.validation.passwordMatch'))
      .required(t('auth.validation.confirmRequired')),
  });

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
      <Grid className="auth-container">
        <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
          <LanguageSelector />
        </div>
        <Tile className="auth-form">
          <div className="header">
            <h1>{t('auth.createAccount')}</h1>
          </div>
          <Form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <TextInput
                id="email"
                labelText={t('auth.email')}
                type="email"
                {...formik.getFieldProps('email')}
                invalid={formik.touched.email && !!formik.errors.email}
                invalidText={formik.touched.email && formik.errors.email}
              />
            </div>
            <div className="form-group">
              <PasswordInput
                id="password"
                labelText={t('auth.password')}
                {...formik.getFieldProps('password')}
                invalid={formik.touched.password && !!formik.errors.password}
                invalidText={formik.touched.password && formik.errors.password}
              />
            </div>
            <div className="form-group">
              <PasswordInput
                id="confirm-password"
                labelText={t('auth.confirmPassword')}
                {...formik.getFieldProps('confirmPassword')}
                invalid={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
                invalidText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              />
            </div>
            <div className="form-actions">
              <Button type="submit" renderIcon={UserFollow}>
                {t('auth.register')}
              </Button>
              <Link href="/login">{t('auth.haveAccount')}</Link>
            </div>
          </Form>
        </Tile>
      </Grid>
    </Theme>
  );
}