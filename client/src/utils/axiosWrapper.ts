import axios from 'axios';
import { getToken } from 'selectors/userSelectors';

const clientWithBaseUrl = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const clientWithoutBaseUrl = axios.create({
  baseURL: '',
});

interface Options<T> {
  url: string;
  useBaseUrl?: boolean;
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';
  data?: T;
  headers?: { Authorization: string };
}

const request = function(options: Options<any>, headers: { auth: boolean }) {
  const onSuccess = function(response) {
    return response.data;
  };

  const onError = function(error) {
    console.error('Request Failed:', error.config);
    if (error.response) {
      // Request was made but server responded with something
      // other than 2xx
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
      console.error('Headers:', error.response.headers);
      if (error.response.status && error.response.status === 400) {
        return Promise.reject(
          'You have made a bad request. Check that all the data is correct',
        );
      }
      if (error.response.status && error.response.status !== 500) {
        return Promise.reject(error.response.data.message);
      }
    } else {
      // Something else happened while setting up the request
      // triggered the error
      console.error('Error Message:', error.message);
    }

    return Promise.reject(
      'Sorry, there was an unexpected error. Please try again later',
    );
  };
  options = headers.auth
    ? {
        ...options,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    : options;
  return options.useBaseUrl
    ? clientWithBaseUrl(options)
        .then(onSuccess)
        .catch(onError)
    : clientWithoutBaseUrl(options)
        .then(onSuccess)
        .catch(onError);
};

export default request;
