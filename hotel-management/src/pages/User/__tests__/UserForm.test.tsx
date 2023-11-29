import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
// Components
import UserForm from '../UserForm';
import {
  RenderResult,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react';

const createUser = jest.fn();

jest.mock('@hook/users/useCreateUser.ts', () => ({
  ...jest.requireActual('@hook/users/useCreateUser.ts'),
  useCreateUser: jest.fn(() => ({
    isCreating: false,
    createUser,
  })),
}));

jest.mock('@hook/users/useUpdateUser', () => ({
  ...jest.requireActual('@hook/users/useUpdateUser'),
  useUpdateUser: () => ({
    isUpdating: false,
    updateUser: jest.fn(),
  }),
}));

describe('UserForm', () => {
  const queryClient = new QueryClient();

  let wrapper: RenderResult | null = null;

  beforeEach(() => {
    wrapper = render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <UserForm />
        </BrowserRouter>
      </QueryClientProvider>
    );
  });

  test('Should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('Should submit correctly', async () => {
    const nameField = wrapper!.container.querySelector('#name');
    const phoneField = wrapper!.container.querySelector('#phone');
    const submitBtn = wrapper!.getByText('Add').closest('button');
    let result: {
      name: string;
      phone: string;
    };

    createUser.mockImplementationOnce((newUser, { onSuccess }) => {
      result = newUser;
      onSuccess();
    });

    fireEvent.input(nameField!, { target: { value: 'Nezumi' } });
    fireEvent.input(phoneField!, { target: { value: '0327764321' } });

    fireEvent.submit(submitBtn!);

    await waitFor(() => {
      expect(createUser).toHaveBeenCalled();
      expect(result).toEqual({ name: 'Nezumi', phone: '0327764321' });
    });
  });
});
