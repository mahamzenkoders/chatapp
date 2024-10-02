'use client';
import {
  ForgotPassword,
  OtpVerificationSchema,
  ResetPasswordSchema,
} from '@/schema/otpschemas';
import axios from 'axios';
import { Field, Form, FormikProvider, useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { Fragment, useState } from 'react';
import toast from 'react-hot-toast';

const ForgotView = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const router = useRouter();

  const handleSchema = () => {
    if (step === 1) return ForgotPassword;
    if (step === 2) return OtpVerificationSchema;
    if (step === 3) return ResetPasswordSchema;
  };

  const formik = useFormik({
    initialValues: {
      forgotEmail: { email: '' },
      forgotOtp: { otp: '' },
      forgotPass: { newPass: '' },
    },
    validationSchema: handleSchema,
    onSubmit: () => {
      console.log('submitting');
    },
  });

  const sendOtp = async () => {
    setLoading(true);
    console.log('working');
    try {
      const user = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/forgetpassword`,
        {
          email: formik.values.forgotEmail.email,
        },
      );

      if (user.status !== 200) {
        return toast.error('User not found');
      }

      toast.success('OTP sent');
      setStep(prev => prev + 1);
    } catch (error) {
      console.log(error);
      toast.error('An error occurred while sending the OTP');
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/forgetpassword/otp-verification`,
        {
          email: formik.values.forgotEmail.email,
          otp: formik.values.forgotOtp.otp,
        },
      );

      if (res.status !== 200) {
        return toast.error(res.data.error);
      }

      toast.success('OTP verified');
      setStep(prev => prev + 1);
    } catch (error) {
      console.log(error);
      toast.error('An error occurred during OTP verification');
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async () => {
    setLoading(true);
    try {
      const updated = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/reset-password`,
        {
          email: formik.values.forgotEmail.email,
          newPass: formik.values.forgotPass.newPass,
        },
      );

      if (updated.status !== 200) {
        return toast.error(updated.data.error);
      }

      toast.success('Password updated successfully');
      router.push('/auth/login');
    } catch (error) {
      console.log(error);
      toast.error('An error occurred while updating the password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <FormikProvider value={formik}>
        <div className='flex justify-center items-center w-full h-full bg-white'>
          <Form className='max-w-sm mx-auto p-4 shadow-lg rounded-lg w-full'>
            <div className='mb-5'>
              <label
                htmlFor='email'
                className='block mb-2 text-sm font-medium dark:text-white'
              >
                Forgot Password
              </label>

              {step === 1 && (
                <Fragment>
                  <Field
                    type='email'
                    name='forgotEmail.email'
                    id='email'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
                    placeholder='Enter your email'
                  />
                  <p className='text-red-500 text-xs'>
                    {formik.errors?.forgotEmail?.email}
                  </p>
                </Fragment>
              )}

              {step === 2 && (
                <Fragment>
                  <Field
                    type='text'
                    name='forgotOtp.otp'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
                    placeholder='Enter OTP'
                  />
                  <p className='text-red-500 text-xs'>
                    {formik.errors?.forgotOtp?.otp}
                  </p>
                </Fragment>
              )}

              {step === 3 && (
                <Fragment>
                  <Field
                    type='password'
                    name='forgotPass.newPass'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
                    placeholder='Enter new password'
                  />
                  <Field
                    type='password'
                    name='forgotPass.newPass'
                    className='bg-gray-50 border mt-4 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
                    placeholder='Confirm new password'
                  />
                  <p className='text-red-500 text-xs'>
                    {formik.errors?.forgotPass?.newPass}
                  </p>
                </Fragment>
              )}
            </div>

            <div
              className={`flex items-center ${step > 1 ? 'justify-between' : 'justify-center'}`}
            >
              {step > 1 && (
                <button
                  type='button'
                  onClick={() => setStep(prev => prev - 1)}
                  className={`text-white ${loading ? 'bg-blue-400 cursor-not-allowed opacity-50' : 'bg-blue-700 hover:bg-blue-800'} font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5`}
                >
                  Back
                </button>
              )}

              <button
                type='button'
                disabled={loading}
                onClick={async () => {
                  const errors = await formik.validateForm();
                  console.log(errors);
                  if (Object.keys(errors).length === 0) {
                    step === 1 && (await sendOtp());
                    step === 2 && (await verifyOtp());
                    step === 3 && (await updateUser());
                  }
                }}
                className={`text-white ${loading ? 'bg-blue-400 cursor-not-allowed opacity-50' : 'bg-blue-700 hover:bg-blue-800'} font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5`}
              >
                {loading ? 'Sending...' : 'Send'}
              </button>
            </div>
          </Form>
        </div>
      </FormikProvider>
    </Fragment>
  );
};

export default ForgotView;
