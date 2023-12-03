import { useLogin } from "@hook/authentication/useLogin";
import LoginForm from "@page/Login/LoginForm";
import { fireEvent, render, waitFor } from "@testing-library/react";


// Mock the useLogin hook
jest.mock('@hook/authentication/useLogin', () => ({
  useLogin: jest.fn(),
}));

describe('LoginForm Component', () => {
  const mockLogin = jest.fn();

  beforeEach(() => {
    (useLogin as jest.Mock).mockReturnValue({
      login: mockLogin,
      isPending: false,
    });
  })

  test('Should render correctly', () => {
    const wrapper = render(<LoginForm />);
    
    expect(wrapper).toMatchSnapshot();
  });

  test('submits the form with valid data', async () => {
    const wrapper = render(<LoginForm />);

    // Submit form with valid data
    fireEvent.input(wrapper.container.querySelector('#email')!, {
      target: { value: 'admin@nezumi.site' },
    });
    fireEvent.input(wrapper.container.querySelector('#password')!, {
      target: { value: '@Ccac71b36122cd' },
    });
    fireEvent.click(wrapper.getByText('Login'));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'admin@nezumi.site',
        password: '@Ccac71b36122cd',
      });
    });
  });

  test('displays error message for invalid email', async () => {
    const wrapper = render(<LoginForm />);

    // Submit form with invalid email
    fireEvent.input(wrapper.container.querySelector('#email')!, {
      target: { value: 'nezumi' },
    });
    fireEvent.click(wrapper.getByText('Login'));

    // Wait for validation error message
    await waitFor(() => {
      expect(wrapper.getByText('Invalid email address')).toBeInTheDocument();
    });
  });

  // Add more test cases as needed
});
