
import { useQuery } from '@tanstack/react-query';
import * as authenticationService from '@service/authenticationService';
import { renderHook } from '@testing-library/react';
import { User } from '@supabase/supabase-js';
import { useAccount } from '../useAccount';

jest.mock('@tanstack/react-query');

describe('useAccount', () => {
  it('Should return the value correctly', async () => {
    const mockAccount: User = {
      role: 'authenticated',
      app_metadata: jest.fn(),
      id: '1',
      user_metadata: jest.fn(),
      aud: '',
      created_at: ''
    };

    (useQuery as jest.Mock).mockReturnValue({
      data: mockAccount,
      isPending: false,
    });

    jest.spyOn(authenticationService, 'getCurrentAccount').mockResolvedValue(mockAccount);

    const { result } = renderHook(() => useAccount());

    expect(result.current.isPending).toBe(false);
    expect(result.current.account).toBe(mockAccount);
    expect(result.current.isAuthenticated).toBe(true);
  });

});
