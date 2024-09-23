'use client';
import { FC } from 'react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { RegistrationSchema } from '@/schema/registeration.schema';

interface IRegistrationViewProps {}

const RegistrationView: FC<IRegistrationViewProps> = () => {
  const router = useRouter();

  interface Values {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
  }

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
    <div className='flex justify-center items-center h-screen bg-amber-200'>
      <div>
        <h2 className='text-2xl font-bold text-center mt-4'>
          Registration Form
        </h2>
        <Formik
          initialValues={{
            firstname: '',
            lastname: '',
            email: '',
            password: '',
          }}
          onSubmit={handleSubmit}
          validationSchema={RegistrationSchema}
        >
          <Form className='flex flex-col gap-4'>
            <div>
              <Label
                htmlFor='firstname'
                className='block text-sm font-medium text-gray-700'
              >
                FirstName
              </Label>
              <Field
                id='firstname'
                type='text'
                name='firstname'
                required
                className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500'
              />
              <ErrorMessage
                name='firstname'
                className='text-red-500'
              />
            </div>
            <div>
              <Label
                htmlFor='lastname'
                className='block text-sm font-medium text-gray-700'
              >
                Email
              </Label>
              <Field
                id='lastname'
                type='text'
                name='lastname'
                required
                className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500'
              />
              <ErrorMessage
                name='lastname'
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
