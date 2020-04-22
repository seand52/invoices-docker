import React from 'react';
import { render, getByTestId, queryAllByText } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ButtonWithSpinner, { ButtonWithSpinnerProps } from './ButtonWithSpinner';

const setup = (props: ButtonWithSpinnerProps) => {
  return render(<ButtonWithSpinner {...props} />);
};
test('should render the correct text when not loading', () => {
  const { getByText } = setup({
    loading: false,
    text: 'test text',
    success: true,
    type: 'submit',
  });
  expect(getByText('test text')).toBeInTheDocument();
});

test('should not render text when loading', () => {
  const { container } = setup({
    loading: true,
    text: 'test text',
    success: false,
    type: 'submit',
  });
  const button = getByTestId(container, 'button-component_btn');
  expect(queryAllByText(button, 'test text')).toHaveLength(0);
});

test('should render spinner when loading', () => {
  const { queryAllByTestId } = setup({
    loading: true,
    text: 'test text',
    success: false,
    type: 'submit',
  });
  const spinner = queryAllByTestId('button-component_spinner');
  expect(spinner).toHaveLength(1);
});

test('should not render spinner when not loading', () => {
  const { queryAllByTestId } = setup({
    loading: false,
    text: 'test text',
    success: false,
    type: 'submit',
  });
  const spinner = queryAllByTestId('button-component_spinner');
  expect(spinner).toHaveLength(0);
});
