import { InitialState } from 'store';

export const getUserState = (state: InitialState) => state.userInfo;

export const isLoggedIn = () => !!window.sessionStorage.getItem('token');

export const getToken = () => window.sessionStorage.getItem('token');
