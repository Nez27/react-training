import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import {
  RenderResult,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react';

// Components
import UserForm from '../UserForm';

// Types
import { IUser } from '@type/user';

const mockCreateUser = jest.fn();
const mockUpdateUser = jest.fn();

jest.mock('@hook/users/useCreateUser.ts', () => ({
  ...jest.requireActual('@hook/users/useCreateUser.ts'),
  useCreateUser: jest.fn(() => ({
    isCreating: false,
    createUser: mockCreateUser,
  })),
}));

jest.mock('@hook/users/useUpdateUser', () => ({
  ...jest.requireActual('@hook/users/useUpdateUser'),
  useUpdateUser: jest.fn(() => ({
    isUpdating: false,
    updateUser: mockUpdateUser,
  })),
}));

describe('UserForm', () => {
  const queryClient = new QueryClient();

  let wrapper: RenderResult | null = null;

  test('Should render correctly', () => {
    wrapper = render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <UserForm />
        </BrowserRouter>
      </QueryClientProvider>
    );

    expect(wrapper).toMatchSnapshot();
  });

  test('Should add correctly', async () => {
    wrapper = render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <UserForm />
        </BrowserRouter>
      </QueryClientProvider>
    );

    const nameField = wrapper!.container.querySelector('#name');
    const phoneField = wrapper!.container.querySelector('#phone');
    const submitBtn = wrapper!.getByText('Add').closest('button');
    let result: {
      name: string;
      phone: string;
    };

    mockCreateUser.mockImplementationOnce((newUser, { onSuccess }) => {
      result = newUser;
      onSuccess();
    });

    fireEvent.input(nameField!, { target: { value: 'Nezumi' } });
    fireEvent.input(phoneField!, { target: { value: '0327764321' } });

    fireEvent.submit(submitBtn!);

    await waitFor(() => {
      expect(mockCreateUser).toHaveBeenCalled();
      expect(result).toEqual({ name: 'Nezumi', phone: '0327764321' });
    });
  });

  test('Should edit correctly', async () => {
    const tempUser: IUser = {
      id: 1,
      name: 'Nezumi',
      phone: '0324454432',
      isBooked: true,
      isDelete: true,
    }

    wrapper = render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <UserForm user={tempUser}/>
        </BrowserRouter>
      </QueryClientProvider>
    );

    const submitBtn = wrapper!.getByText('Save').closest('button');
    
    let result: {
      name: string;
      phone: string;
    };

    mockUpdateUser.mockImplementationOnce((newUser, { onSuccess }) => {
      result = newUser;
      onSuccess();
    });

    fireEvent.submit(submitBtn!);

    await waitFor(() => {
      expect(mockUpdateUser).toHaveBeenCalled();
      expect(result).toEqual(tempUser);
    });
  });
});
