import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import renderer from 'react-test-renderer';

// Types
import { IUser } from '@type/users';

// Components
import UserRow from '../UserRow';

describe('UserRow', () => {
  const tempUser: IUser = {
    id: 1,
    name: 'Temp Room',
    phone: '0324421232',
    isBooked: false,
  };
  const queryClient = new QueryClient();
  const wrapper = renderer.create(
    <QueryClientProvider client={queryClient}>
      <UserRow user={tempUser} />
    </QueryClientProvider>
  );

  test('Should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
