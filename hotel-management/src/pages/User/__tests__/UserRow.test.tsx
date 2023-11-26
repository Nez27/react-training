import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { IUser } from '@type/users';
import renderer from 'react-test-renderer';
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
