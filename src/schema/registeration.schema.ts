import * as yup from 'yup';

export const RegistrationSchema = yup.object().shape({
  firstName: yup
    .string()
    .max(80, 'Too Long')
    .required('First Name is required'),
  lastName: yup.string().max(80, 'Too Long').required('Last Name is required'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
});
