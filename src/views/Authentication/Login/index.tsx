'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { loginSchema } from '@/schema/login.schema';

interface Values {
  email: string;
  password: string;
}

const LoginPage = () => {
  const router = useRouter();

  const handleSubmit = async (values: Values) => {
    const { email, password } = values;
    if (email && password) {
      console.log(values);
      router.push('/');
    } else {
      console.log('error');
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div>
        <h2 className='text-2xl font-bold text-center mt-4'>Login</h2>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={handleSubmit}
          validationSchema={loginSchema}
        >
          <Form className='flex flex-col gap-4'>
            <div>
              <Label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'
              >
                Email
              </Label>
              <Field
                id='email'
                type='text'
                name='email'
                required
                className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500'
              />
              <ErrorMessage
                name='email'
                className='text-red-'
              />
            </div>
            <div>
              <Label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700'
              >
                Password
              </Label>
              <Field
                id='password'
                type='password'
                name='password'
                required
                className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500'
              />
              <ErrorMessage
                name='password'
                className='text-red-500 mt-4'
              />
            </div>
            <div>
              <Button
                type='submit'
                className='w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition'
              >
                Log In
              </Button>
            </div>
          </Form>
        </Formik>
        <div className='mt-4'>
          <Link href={'/auth/register'}>
            <span className='text-blue-600'>New Here? Click To Register</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
