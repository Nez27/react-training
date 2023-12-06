import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Types
import { IUser } from '@src/types/user';

// Components
import UserRow from '../UserRow';

describe('UserRow', () => {
  const tempUser: IUser = {
    id: 1,
    name: 'Temp Room',
    phone: '0324421232',
    isBooked: false,
    isDelete: true,
  };
  const queryClient = new QueryClient();
  const wrapper = render(
    <QueryClientProvider client={queryClient}>
      <UserRow user={tempUser} />
    </QueryClientProvider>
  );

  test('Should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
