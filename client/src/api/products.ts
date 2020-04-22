import request from '../utils/axiosWrapper';
import { ProductsPaginated } from './responses/products.type';
import { ICreateProduct } from 'forms/formValidations/add-product';

export const searchProducts = (url): Promise<ProductsPaginated> => {
  return request(
    {
      method: 'GET',
      useBaseUrl: false,
      url,
    },
    { auth: true },
  ).then(res => {
    return res;
  });
};

export const deleteProduct = (id): Promise<ProductsPaginated> => {
  return request(
    {
      method: 'DELETE',
      useBaseUrl: true,
      url: `/products/${id}`,
    },
    { auth: true },
  ).then(res => {
    return res;
  });
};

export const createProduct = (data: ICreateProduct): Promise<any> => {
  return request(
    {
      method: 'POST',
      useBaseUrl: true,
      data,
      url: '/products',
    },
    { auth: true },
  );
};

export const updateProduct = (
  data: ICreateProduct,
  id: string,
): Promise<any> => {
  return request(
    {
      method: 'PATCH',
      useBaseUrl: true,
      data,
      url: `/products/${id}`,
    },
    { auth: true },
  );
};
