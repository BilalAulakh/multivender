'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { reset } from '../../redux/features/authSlice';
import { AppDispatch, RootState } from '../../redux/store';
import styles from './register.module.scss';
import { registerUser } from '@/redux/features/service';

export default function Register() {
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
    name: Yup.string().required('Full Name is required'),
    phone: Yup.string()
      .matches(/^[0-9]+$/, 'Must be only digits')
      .min(10, 'Must be exactly 10 digits')
      .max(10, 'Must be exactly 10 digits')
      .required('Phone Number is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
      .required('Confirm Password is required'),
    isAdmin: Yup.boolean(),
    adminSecret: Yup.string().when('isAdmin', {
      is: true,
      then: (schema) => schema.required('Admin Secret is required'),
      otherwise: (schema) => schema.notRequired(),
    }),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
      isAdmin: false,
      adminSecret: '',
    },
    validationSchema,
    onSubmit: (values) => {
      const userData = {
        name: values.name,
        phone: values.phone,
        email: values.email,
        password: values.password,
        role: values.isAdmin ? 'ADMIN' : 'CUSTOMER',
        adminSecret: values.isAdmin ? values.adminSecret : undefined,
      };
      dispatch(registerUser(userData));
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Create Account</h1>
        <p className={styles.subtitle}>Join us and start your journey</p>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="name" className={styles.label}>
              Full Name
            </label>
            <input
              type="text"
              className={styles.input}
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name ? (
              <div style={{ color: '#fca5a5', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                {formik.errors.name}
              </div>
            ) : null}
          </div>

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
              <div style={{ color: '#fca5a5', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                {formik.errors.phone}
              </div>
            ) : null}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Email Address
            </label>
            <input
              type="email"
              className={styles.input}
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <div style={{ color: '#fca5a5', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                {formik.errors.email}
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
              placeholder="Create a password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <div style={{ color: '#fca5a5', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                {formik.errors.password}
              </div>
            ) : null}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>
              Confirm Password
            </label>
            <input
              type="password"
              className={styles.input}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div style={{ color: '#fca5a5', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                {formik.errors.confirmPassword}
              </div>
            ) : null}
          </div>

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="isAdmin"
              name="isAdmin"
              checked={formik.values.isAdmin}
              onChange={formik.handleChange}
              className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="isAdmin" className="text-sm text-gray-700">
              Register as Admin
            </label>
          </div>

          {formik.values.isAdmin && (
            <div className={styles.inputGroup}>
              <label htmlFor="adminSecret" className={styles.label}>
                Admin Secret Key
              </label>
              <input
                type="password"
                className={styles.input}
                id="adminSecret"
                name="adminSecret"
                placeholder="Enter Admin Secret Key"
                value={formik.values.adminSecret}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.adminSecret && formik.errors.adminSecret ? (
                <div style={{ color: '#fca5a5', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                  {formik.errors.adminSecret}
                </div>
              ) : null}
            </div>
          )}

          <button type="submit" className={styles.button} disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className={styles.loginLink}>
          Already have an account?
          <Link href="/login" className={styles.link}>
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
