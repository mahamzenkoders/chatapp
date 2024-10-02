import ForgotView from '@/components/forgotview';
import React from 'react';

const ForgetPasswordPage = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-yellow-200'>
      <div className='w-full max-w-md bg-white p-8 rounded-lg shadow-lg'>
        <h1 className='text-2xl font-bold text-center mb-6'>Forgot Password</h1>
        <ForgotView />
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
