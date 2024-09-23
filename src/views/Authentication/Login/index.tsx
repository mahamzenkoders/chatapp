'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username && password) {
      console.log(username);
      console.log(password);
      router.push('/');
    } else {
      console.log('error');
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div>
        <h2 className='text-2xl font-bold text-center mt-4'>Login</h2>
        <form
          onSubmit={handleSubmit}
          className='mt-6'
        >
          <div className='mb-4'>
            <Label
              htmlFor='username'
              className='block text-sm font-medium text-gray-700'
            >
              Email
            </Label>

            <Input
              id='username'
              type='text'
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500'
            />
          </div>
          <div className='mb-6'>
            <Label
              htmlFor='password'
              className='block text-sm font-medium text-gray-700'
            >
              Password
            </Label>
            <Input
              id='password'
              type='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500'
            />
          </div>
          <div className='mt-6'>
            <Button
              type='submit'
              className='w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition'
            >
              Log In
            </Button>
          </div>
          <div className='mt-5'>
            <Link
              className='text-blue-600'
              href={'/auth/register'}
            >
              new here? Click to Register.
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
