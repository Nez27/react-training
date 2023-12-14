import {
  RenderResult,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Components
import AccountPasswordForm from '../AccountPasswordForm';

// Hooks
import { useUpdateAccount } from '@src/hooks/authentication/useUpdateAccount';

jest.mock('@src/hooks/authentication/useUpdateAccount');

describe('AccountPasswordForm', () => {
  let wrapper: RenderResult | null = null;
  const queryClient = new QueryClient();
  const mockUpdateAccount = jest.fn();

  beforeEach(() => {
    (useUpdateAccount as jest.Mock).mockReturnValue({
      updateAccount: mockUpdateAccount,
      isUpdating: false,
    });

    wrapper = render(
      <QueryClientProvider client={queryClient}>
        <AccountPasswordForm />
      </QueryClientProvider>
    );
  });

  test('Should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('Should submit form successful', async () => {
    const passwordField = wrapper!.container.querySelector('#password');
    const comfirmPasswordField =
      wrapper!.container.querySelector('#confirmPassword');
    const submitButton = wrapper!.getByText('Update password');

    fireEvent.change(passwordField!, { target: { value: 'Phanhuuloi2@@1' } });
    fireEvent.change(comfirmPasswordField!, {
      target: { value: 'Phanhuuloi2@@1' },
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockUpdateAccount).toHaveBeenCalled();
    });
  });

  test('Should display error message when input invalid field', async () => {
    const passwordField = wrapper!.container.querySelector('#password');
    const submitButton = wrapper!.getByText('Update password');

    fireEvent.change(passwordField!, { target: { value: '@' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(wrapper!.getByText('Password not match!')).toBeInTheDocument();
    });
  });
});
