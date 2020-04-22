import React from 'react';
import {
  render,
  getByTestId,
  queryAllByText,
  fireEvent,
  act,
  wait,
} from '@testing-library/react';
import { Simulate } from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect';
import LoginForm, { LoginFormProps } from './LoginForm';

const setup = props => {
  return render(<LoginForm {...props} />);
};

test('should call onSubmit with correct data', async () => {
  const onSubmit = jest.fn();
  const handleSubmit = jest.fn();
  const { getByText, getByTestId, container } = setup({
    apiError: null,
    errors: {},
    user: {},
    register: jest.fn(),
    onSubmit,
    handleSubmit,
  });
  const username = container.querySelector('input[name="username"]');
  const password = container.querySelector('input[name="password"]');
  const form = container.querySelector('form');
  const submitBtn = container.querySelector('button');
  console.log(submitBtn);
  if (username && password) {
    username.value = 'newguy';
    password.value = 'aaaaaa';
    // fireEvent.change(username, { target: { value: 'newguy' } });
    // fireEvent.change(password, { target: { value: 'aaaaaa' } });
    await wait(() => Simulate.click(submitBtn));

    // console.log(username);
    // await act(async () => {
    //   fireEvent.submit(getByTestId('login-form'));
    // });
    expect(handleSubmit).toBeCalledTimes(1);
  }
});

// test('should call onSubmit with correct data', async () => {
//   const onSubmit = jest.fn();
//   const handleSubmit = jest.fn();
//   const { getByLabelText, getByTestId, container } = setup({
//     apiError: null,
//     errors: {},
//     user: {},
//     register: jest.fn(),
//     onSubmit,
//     handleSubmit,
//   });
//   const username = container.querySelector('input[name="username"]');
//   const password = container.querySelector('input[name="password"]');
//   if (username && password) {
//     await act(async () => {
//       await fireEvent.change(username, { target: { value: 'newguy' } });
//     });
//     await act(async () => {
//       await fireEvent.change(password, { target: { value: 'aa' } });
//     });
//     await act(async () => {
//       fireEvent.submit(getByTestId('login-form'));
//     });
//     expect(handleSubmit).not.toBeCalled();
//   }
// });
