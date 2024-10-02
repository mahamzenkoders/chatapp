import * as yup from 'yup';
import { object, string } from 'yup';

export const ForgotPassword = yup.object({
  forgotEmail: object({
    email: string()
      .email('incorrect email format')
      .required('email is required'),
  }),
});

export const OtpVerificationSchema = object({
  forgotOtp: object({
    otp: string()
      .min(4, 'otp code is of 4 digits')
      .required('otp code is required'),
  }),
});

export const ResetPasswordSchema = object({
  forgotPass: object({
    newPass: string()
      .min(6, 'password is of atleast 6 characters')
      .required('password is required'),
  }),
});
