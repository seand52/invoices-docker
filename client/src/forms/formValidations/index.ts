import {
  loginValidationFields,
  registerValidationFields,
} from './authentication';
import { businessInfoFields } from './business-info';
import { createClientFields } from './add-client';
import { createProductsFields } from './add-product';

interface Schemas<T> {
  loginValidationFields: T;
  registerValidationFields: T;
  businessInfoFields: T;
  createClientFields: T;
  createProductsFields: T;
}
export const schemas: Schemas<any> = {
  loginValidationFields,
  registerValidationFields,
  businessInfoFields,
  createClientFields,
  createProductsFields,
};
