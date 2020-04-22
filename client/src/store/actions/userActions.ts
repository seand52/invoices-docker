import {
  ILoginFields,
  IRegisterFields,
} from 'forms/formValidations/authentication';
import { IBusinessInfo } from 'forms/formValidations/business-info';
import { BusinessInfoAPI } from 'api/responses/businessInfo.type';

export const LOGIN = 'USER::LOGIN';
export const LOGIN_OK = 'USER::LOGIN_OK';
export const LOGIN_FAILED = 'USER::LOGIN_FAILED';

export const REGISTER = 'USER::REGISTER';
export const REGISTER_OK = 'USER::REGISTER_OK';
export const REGISTER_FAILED = 'USER::REGISTER_failed';

export const SUBMIT_BUSINESS_DETAILS = 'USER::SUBMIT_BUSINESS_DETAILS';
export const SUBMIT_BUSINESS_DETAILS_OK = 'USER::SUBMIT_BUSINESS_DETAILS_OK';
export const SUBMIT_BUSINESS_DETAILS_FAILED =
  'USER::SUBMIT_BUSINESS_DETAILS_FAILED';

export const UPDATE_BUSINESS_DETAILS = 'USER::UPDATE_BUSINESS_DETAILS';
export const UPDATE_BUSINESS_DETAILS_OK = 'USER::UPDATE_BUSINESS_DETAILS_OK';
export const UPDATE_BUSINESS_DETAILS_FAILED =
  'USER::UPDATE_BUSINESS_DETAILS_FAILED';

export const LOGOUT = 'USER::LOGOUT';
export const CLEAR_SUCCESS = 'USER::CLEAR_SUCCESS';

export interface LoginAction {
  type: typeof LOGIN;
  payload: ILoginFields;
}
export const login = (data: ILoginFields) => ({
  type: LOGIN,
  payload: data,
});

export interface LoginOkAction {
  type: typeof LOGIN_OK;
  payload: {
    token: string;
    businessInfo: BusinessInfoAPI;
  };
}
export const loginOk = (data: {
  token: string;
  businessInfo: BusinessInfoAPI;
}) => ({
  type: LOGIN_OK,
  payload: {
    token: data.token,
    businessInfo: data.businessInfo,
  },
});

export interface LoginFailedAction {
  type: typeof LOGIN_FAILED;
  payload: string;
}

export const loginFailed = (message?: string) => ({
  type: LOGIN_FAILED,
  payload: message || 'There was a problem logging in to your account',
});

export interface RegisterAction {
  type: typeof REGISTER;
  payload: IRegisterFields;
}

export const register = (data: IRegisterFields) => ({
  type: REGISTER,
  payload: data,
});

export interface RegisterOk {
  type: typeof REGISTER_OK;
  payload: string;
}

export const registerOk = (token: string) => ({
  type: REGISTER_OK,
  payload: token,
});

export interface RegisterFailedAction {
  type: typeof REGISTER_FAILED;
  payload: string;
}

export const registrationField = (message?: string) => ({
  type: REGISTER_FAILED,
  payload: message || 'There was a problem with the registration process',
});

export interface ClearSuccessAction {
  type: typeof CLEAR_SUCCESS;
}

export const clearSuccess = () => ({
  type: CLEAR_SUCCESS,
});

export interface SubmitBusinessDetailsAction {
  type: typeof SUBMIT_BUSINESS_DETAILS;
  payload: IBusinessInfo;
}

export const submitBusinessDetails = (data: IBusinessInfo) => ({
  type: SUBMIT_BUSINESS_DETAILS,
  payload: data,
});

export interface SubmitBusinessDetailsOkAction {
  type: typeof SUBMIT_BUSINESS_DETAILS_OK;
  payload: IBusinessInfo;
}

export const submitBusinessDetailsOk = data => ({
  type: SUBMIT_BUSINESS_DETAILS_OK,
  payload: data,
});

export interface SubmitBusinessDetailsFailedAction {
  type: typeof SUBMIT_BUSINESS_DETAILS_FAILED;
  payload: IBusinessInfo;
}

export const submitBusinessDetailsFailed = (message: string) => ({
  type: SUBMIT_BUSINESS_DETAILS_FAILED,
  payload: message,
});

//

export interface UpdateBusinessDetailsAction {
  type: typeof UPDATE_BUSINESS_DETAILS;
  payload: IBusinessInfo;
}

export const updateBusinessDetails = (data: IBusinessInfo) => ({
  type: UPDATE_BUSINESS_DETAILS,
  payload: data,
});

export interface UpdateBusinessDetailsOkAction {
  type: typeof UPDATE_BUSINESS_DETAILS_OK;
  payload: IBusinessInfo;
}

export const updateBusinessDetailsOk = data => ({
  type: UPDATE_BUSINESS_DETAILS_OK,
  payload: data,
});

export interface UpdateBusinessDetailsFailedAction {
  type: typeof UPDATE_BUSINESS_DETAILS_FAILED;
  payload: IBusinessInfo;
}

export const updateBusinessDetailsFailed = (message: string) => ({
  type: UPDATE_BUSINESS_DETAILS_FAILED,
  payload: message,
});

export interface ILogout {
  type: typeof LOGOUT;
}

export const logout = () => ({
  type: LOGOUT,
});
