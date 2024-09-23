import * as yup from 'yup';

export const RegistrationSchema = yup.object().shape({
    firstname:yup.string().max(100).required("First Name is required"),
    lastname:yup.string().max(100).required("Last Name is required"),
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
});
