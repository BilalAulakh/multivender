'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { reset } from '../../redux/features/authSlice';
import { AppDispatch, RootState } from '../../redux/store';
import styles from './login.module.scss';
import { loginUser } from '@/redux/features/service';

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { user, isLoading, isSuccess, error } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isSuccess || user) {
      router.push('/'); // Redirect to dashboard or home
    }

    return () => {
      dispatch(reset());
    };
  }, [user, isSuccess, dispatch, router]);

  const validationSchema = Yup.object({
    phone: Yup.string()
      .matches(/^[0-9]+$/, 'Must be only digits')
      .min(10, 'Must be exactly 10 digits')
      .max(10, 'Must be exactly 10 digits')
      .required('Phone Number is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      phone: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values));
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Welcome Back</h1>
        <p className={styles.subtitle}>Sign in to continue your journey</p>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="phone" className={styles.label}>
              Phone Number
            </label>
            <input
              type="tel"
              className={styles.input}
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className={styles.errorText}>
                {formik.errors.phone}
              </div>
            ) : null}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              type="password"
              className={styles.input}
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className={styles.errorText}>
                {formik.errors.password}
              </div>
            ) : null}
          </div>

          <button type="submit" className={styles.button} disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className={styles.registerLink}>
          Don't have an account?
          <Link href="/register" className={styles.link}>
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
