import {
  getCurrentAccount,
  login,
  logout,
  updateAccount,
} from '@src/services/authenticationService';
import supabase from '@src/services/supabaseService';
import { Session, UserAttributes } from '@supabase/supabase-js';

// Mock Supabase module
jest.mock('@src/services/supabaseService', () => ({
  auth: {
    signInWithPassword: jest.fn(),
    getSession: jest.fn(),
    getUser: jest.fn(),
    signOut: jest.fn(),
    updateUser: jest.fn(),
  },
}));

const errorMessage = 'Error message';

describe('login', () => {
  const accountInput = { email: 'admin@nezumi.site', password: 'Password' };

  test('Should return data when login success', async () => {
    const mockData: UserAttributes = {
      // Add any necessary fields based on your actual response
      email: 'admin@nezumi.site',
      password: 'Password',
    };

    (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({
      data: mockData,
      error: null,
    });

    const result = await login(accountInput);

    // Assert
    expect(result).toEqual(mockData);
  });

  test('Should return error when login fail', async () => {
    (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({
      data: null,
      error: { message: errorMessage },
    });

    await expect(login(accountInput)).rejects.toThrow(errorMessage);
  });
});

describe('getCurrentAccount', () => {
  const mockSession: Session = {
    access_token: 'access_token',
    expires_in: 250,
    refresh_token: 'refresh_token',
    token_type: 'token_type',
    user: {
      app_metadata: jest.fn(),
      aud: '',
      created_at: '',
      id: '',
      user_metadata: jest.fn(),
    },
  };

  test('should return data user', async () => {
    (supabase.auth.getSession as jest.Mock).mockResolvedValue({
      data: { session: mockSession },
    });

    (supabase.auth.getUser as jest.Mock).mockResolvedValue({
      data: { user: 'mockUser' },
    });

    const result = await getCurrentAccount();

    expect(result).toEqual('mockUser');
  });

  test('should return null if not have session', async () => {
    (supabase.auth.getSession as jest.Mock).mockResolvedValue({
      data: {},
    });

    const result = await getCurrentAccount();

    expect(result).toBeNull();
  });

  test('should return error if can not get data of account', async () => {
    (supabase.auth.getSession as jest.Mock).mockResolvedValue({
      data: { session: mockSession },
    });

    (supabase.auth.getUser as jest.Mock).mockResolvedValue({
      data: null,
      error: { message: errorMessage },
    });

    await expect(getCurrentAccount()).rejects.toThrow(errorMessage);
  });
});

describe('logout', () => {
  test('Should logout successful without error', async () => {
    (supabase.auth.signOut as jest.Mock).mockResolvedValue({
      error: '',
    });

    const result = await logout();

    expect(result).toBeUndefined;
  });

  test('Should throw error if have problem', async () => {
    (supabase.auth.signOut as jest.Mock).mockResolvedValue({
      error: { message: errorMessage },
    });

    await expect(logout()).rejects.toThrow(errorMessage);
  });
});

describe('updateAccount', () => {
  const sampleData = {
    fullName: 'Nezumi',
    password: 'password',
  }

  test('Should update successful', async () => {
    (supabase.auth.updateUser as jest.Mock).mockResolvedValue({
      data: 'sample data',
      error: null,
    });

    const result = await updateAccount(sampleData);

    expect(result).toEqual('sample data');
  });

  test('Should throw error if has problem,', async () => {
    (supabase.auth.updateUser as jest.Mock).mockResolvedValue({
      data: 'sample data',
      error: { message: errorMessage },
    });

    await expect(updateAccount(sampleData)).rejects.toThrow(errorMessage)
  });
});
