import * as yup from 'yup';

export const loginValidationFields = {
  username: yup.string().required(),
  password: yup
    .string()
    .required()
    .min(6),
};

export type ILoginFields = {
  [key in keyof typeof loginValidationFields]: string;
};

export const registerValidationFields = {
  ...loginValidationFields,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
};

export type IRegisterFields = {
  [key in keyof typeof registerValidationFields]: string;
};
