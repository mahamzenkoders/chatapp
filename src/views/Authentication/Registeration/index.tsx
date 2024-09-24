'use client';
import { FC } from 'react';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { RegistrationSchema } from '@/schema/registeration.schema';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { setCookieClientSideFn } from '@/utils/storage.util';

interface IRegistrationViewProps {}

const RegistrationView: FC<IRegistrationViewProps> = () => {
  const router = useRouter();

  interface Values {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }

  const handleSubmit = async (values: Values) => {
    console.log(values);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        values,
      );
      console.log(res.data);
      setCookieClientSideFn('accessToken', res.data.accessToken);
      router.push('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen bg-amber-200'>
      <div className='bg-slate-300 p-32 rounded'>
        <h2 className='text-2xl font-bold text-center mt-4'>
          Registration Form
        </h2>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
          }}
          onSubmit={handleSubmit}
          validationSchema={RegistrationSchema}
        >
          <Form className='flex flex-col gap-4'>
            <div>
              <Label
                htmlFor='firstName'
                className='block text-sm font-medium text-gray-700'
              >
                First Name
              </Label>
              <Field
                id='firstName'
                type='text'
                name='firstName'
                required
                className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500'
              />
              <ErrorMessage
                name='firstName'
                component='div'
                className='text-red-500'
              />
            </div>
            <div>
              <Label
                htmlFor='lastName'
                className='block text-sm font-medium text-gray-700'
              >
                Last Name
              </Label>
              <Field
                id='lastName'
                type='text'
                name='lastName'
                required
                className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500'
              />
              <ErrorMessage
                name='lastName'
                component='div'
                className='text-red-500'
              />
            </div>
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
                component='div'
                className='text-red-500'
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
                component='div'
                className='text-red-500 mt-4'
              />
            </div>
            <div>
              <Button
                type='submit'
                className='w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition'
              >
                Sign Up
              </Button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default RegistrationView;
