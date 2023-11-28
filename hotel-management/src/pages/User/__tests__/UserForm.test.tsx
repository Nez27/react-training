import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

jest.mock('@hook/users/useCreateUser.ts', () => ({
  ...jest.requireActual('@hook/users/useCreateUser.ts'),
  useCreateUser: () => ({
    isCreating: true,
    createUser: jest.fn(),
  }),
}));

// Components
import UserForm from '../UserForm';
import { RenderResult, fireEvent, render } from '@testing-library/react';
import { act } from 'react-test-renderer';

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
    const submitBtn = wrapper!.getByText('Add');

    await act(async () => {
      fireEvent.input(nameField!, { target: { value: 'Phan Huu Loi' } });
      fireEvent.input(phoneField!, { target: { value: '0324432321' } });
      fireEvent.click(submitBtn);
    });

    wrapper?.debug();
  });
});
