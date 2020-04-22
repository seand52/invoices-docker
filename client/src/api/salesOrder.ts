import request from '../utils/axiosWrapper';
import {
  FullSalesOrderDetails,
  SalesOrdersPaginated,
} from './responses/sales-orders.type';
import { ICreateSalesOrder } from 'forms/formValidations/add-sales-oder';

export const searchSalesOrders = (url): Promise<SalesOrdersPaginated> => {
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

export const searchSalesOrderDetails = (id): Promise<FullSalesOrderDetails> => {
  return request(
    {
      method: 'GET',
      useBaseUrl: true,
      url: `/sales-orders/${id}`,
    },
    { auth: true },
  ).then(res => {
    return res;
  });
};

export const deleteSalesOrder = (id): Promise<SalesOrdersPaginated> => {
  return request(
    {
      method: 'DELETE',
      useBaseUrl: true,
      url: `/sales-orders/${id}`,
    },
    { auth: true },
  ).then(res => {
    return res;
  });
};

export const createSalesOrder = (data: ICreateSalesOrder): Promise<any> => {
  return request(
    {
      method: 'POST',
      useBaseUrl: true,
      data,
      url: '/sales-orders',
    },
    { auth: true },
  );
};

export const updateSalesOrder = (
  data: ICreateSalesOrder,
  id: string,
): Promise<any> => {
  return request(
    {
      method: 'PATCH',
      useBaseUrl: true,
      data,
      url: `/sales-orders/${id}`,
    },
    { auth: true },
  );
};

export const transformToInvoice = (id: string): Promise<any> => {
  return request(
    {
      method: 'PUT',
      useBaseUrl: true,
      url: `/invoices/transform-sales-order/${id}`,
    },
    { auth: true },
  );
};

export const generatePdf = id => {
  return request(
    {
      method: 'GET',
      useBaseUrl: true,
      url: `/sales-orders/pdf/${id}`,
    },
    { auth: true },
  );
};
