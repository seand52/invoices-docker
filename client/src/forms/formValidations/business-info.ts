import * as yup from 'yup';

export const businessInfoFields = {
  name: yup.string().required(),
  cif: yup.string().required(),
  address: yup.string().required(),
  postcode: yup.string().required(),
  city: yup.string().required(),
  country: yup.string().required(),
  telephone: yup.string().required(),
  email: yup
    .string()
    .email()
    .required(),
};

export type IBusinessInfo = typeof businessInfoFields;
