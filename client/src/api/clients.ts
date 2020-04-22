import request from '../utils/axiosWrapper';
import { ClientsPaginated, Client } from './responses/clients.type';
import { ICreateClient } from 'forms/formValidations/add-client';

export const searchClients = (url): Promise<ClientsPaginated> => {
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

export const deleteClient = (id): Promise<ClientsPaginated> => {
  return request(
    {
      method: 'DELETE',
      useBaseUrl: true,
      url: `/clients/${id}`,
    },
    { auth: true },
  ).then(res => {
    return res;
  });
};

export const createClient = (data: ICreateClient): Promise<any> => {
  return request(
    {
      method: 'POST',
      useBaseUrl: true,
      data,
      url: '/clients',
    },
    { auth: true },
  );
};

export const updateClient = (data: ICreateClient, id: string): Promise<any> => {
  return request(
    {
      method: 'PATCH',
      useBaseUrl: true,
      data,
      url: `/clients/${id}`,
    },
    { auth: true },
  );
};

export const searchClientsByName = (name: string): Promise<Client[]> => {
  return request(
    {
      method: 'GET',
      useBaseUrl: true,
      url: `/clients/search?name=${name}`,
    },
    { auth: true },
  );
};
