'use client';
import { FC } from 'react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface IRegistrationViewProps {}

const RegistrationView: FC<IRegistrationViewProps> = () => {
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (firstname && lastname) {
      console.log(firstname);
      console.log(lastname);
      router.push('/');
    } else {
      console.log('error');
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div>
        <h2 className='text-2xl font-bold text-center mt-4'>
          Registration Form
        </h2>
        <form
          onSubmit={handleSubmit}
          className='mt-6'
        >
          <div className='mb-4'>
            <Label
              htmlFor='username'
              className='block text-sm font-medium text-gray-700'
            >
              First Name
            </Label>
            <Input
              id='username'
              type='text'
              value={firstname}
              onChange={e => setfirstname(e.target.value)}
              required
              className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500'
            />
          </div>
          <div className='mb-6'>
            <Label
              htmlFor='password'
              className='block text-sm font-medium text-gray-700'
            >
              Last Name
            </Label>
            <Input
              id='password'
              type='password'
              value={lastname}
              onChange={e => setlastname(e.target.value)}
              required
              className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500'
            />
          </div>
          <div className='mt-6'>
            <Button
              type='submit'
              className='w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition'
            >
              SignUp
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationView;
