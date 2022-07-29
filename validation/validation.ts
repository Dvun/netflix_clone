import * as yup from 'yup'

export const LoginValidation = yup.object({
  email: yup.string().required('Please enter a valid email.').email().trim().lowercase(),
  password: yup.string().required('Your password must contains between 4 and 25 characters.').min(4).max(25).trim(),
}).required();