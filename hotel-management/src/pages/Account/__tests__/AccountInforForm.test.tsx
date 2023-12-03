import { act, fireEvent, render, RenderResult, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

// Components
import AccountInforForm from '@page/Account/AccountInforForm';

// Hooks
import { useAccount } from '@hook/authentication/useAccount';
import { useUpdateAccount } from '@hook/authentication/useUpdateAccount';

jest.mock('@hook/authentication/useUpdateAccount');
jest.mock('@hook/authentication/useAccount');

const mockAccount = {
  email: 'admin@nezumi.site',
  user_metadata: {
    fullName: 'Loi Phan',
  },
};

(useAccount as jest.Mock).mockReturnValue({
  account: mockAccount,
});

(useUpdateAccount as jest.Mock).mockReturnValue({
  updateAccount: jest.fn(),
  isUpdating: false,
});

describe('AccountInforForm', () => {
  let wrapper: RenderResult | null = null;

  beforeEach(() => {
    wrapper = render(<AccountInforForm />);
  });

  test('Should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('Should init data correctly', async () => {
    const emailField = wrapper!.container.querySelector('#email');
    const fullNameField = wrapper!.container.querySelector('#fullName');

    expect(emailField!).toHaveValue(mockAccount.email);

    expect(fullNameField).toHaveValue(mockAccount.user_metadata.fullName);
  });

  test('Should update account correctly', async () => {
    const fullNameField = wrapper!.container.querySelector('#fullName');

    const newFullName = 'Nezumi';
    act(() => {
      fireEvent.change(fullNameField!, { target: { value: newFullName } });
    });

    act(() => {
      fireEvent.submit(wrapper!.getByText('Update account'));
    });

    await waitFor(() => {
      expect(useUpdateAccount().updateAccount).toHaveBeenCalledWith({
        fullName: newFullName,
      });
    });
  });
});
