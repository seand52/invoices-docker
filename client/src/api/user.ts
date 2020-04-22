import {
  ILoginFields,
  IRegisterFields,
} from 'forms/formValidations/authentication';
import request from '../utils/axiosWrapper';
import { IBusinessInfo } from 'forms/formValidations/business-info';
import { BusinessInfoAPI } from './responses/businessInfo.type';

interface AuthenticationResponse {
  token: string;
}
export const authenticateUser = (
  data: ILoginFields,
): Promise<AuthenticationResponse> => {
  return request(
    {
      method: 'POST',
      useBaseUrl: true,
      url: '/users/login',
      data,
    },
    { auth: false },
  ).then(res => {
    return { token: res.access_token, businessInfo: res.businessInfo };
  });
};

export const registerUser = (
  data: IRegisterFields,
): Promise<AuthenticationResponse> => {
  return request(
    {
      method: 'POST',
      useBaseUrl: true,
      url: '/users/register',
      data,
    },
    { auth: false },
  ).then(res => {
    return { token: res.access_token };
  });
};

export const saveBusinessInfo = (
  data: IBusinessInfo,
): Promise<BusinessInfoAPI> => {
  return request(
    {
      method: 'POST',
      useBaseUrl: true,
      url: '/business-info',
      data,
    },
    { auth: true },
  ).then(res => {
    return res;
  });
};

export const updateBusinessInfo = (
  data: IBusinessInfo,
): Promise<BusinessInfoAPI> => {
  return request(
    {
      method: 'PATCH',
      useBaseUrl: true,
      url: '/business-info',
      data,
    },
    { auth: true },
  ).then(res => {
    return res;
  });
};
