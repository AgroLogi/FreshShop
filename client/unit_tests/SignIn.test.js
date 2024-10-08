// Your test file (e.g., Header.test.js)
import { useRouter } from 'next/navigation';


jest.mock('next/navigation');

const mockRouter = {
  push: jest.fn(), // You can add other router methods as needed
};

useRouter.mockReturnValue(mockRouter);

import React from 'react';
import { render } from '@testing-library/react';
import SignIn from '../app/(auth)/sign-in/page'; // Replace with your actual path

test('renders sign-in form with email and password inputs', () => {
  const { getByPlaceholderText } = render(<SignIn />);

  expect(getByPlaceholderText('Email')).toBeInTheDocument();
  expect(getByPlaceholderText('password')).toBeInTheDocument();
});