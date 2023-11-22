// import { useCreateUser } from '@hook/users/useCreateUser';
// import { useUpdateUser } from '@hook/users/useUpdateUser';
// import { useUsers } from '@hook/users/useUsers';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { renderHook, waitFor } from '@testing-library/react';
// import { IUser } from '@type/users';
// import { ReactNode } from 'react';
// import { MemoryRouter } from 'react-router-dom';
// import { act } from 'react-test-renderer';

// interface IWrapper {
//   children: ReactNode;
// }

// const sampleData: IUser = {
//   id: 999,
//   name: 'User name test',
//   phone: '123456789',
//   isBooked: true,
// };
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       retry: false,
//     },
//   },
// });
// const wrapper = ({ children }: IWrapper) => {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <MemoryRouter>{children}</MemoryRouter>
//     </QueryClientProvider>
//   );
// };

// describe('CRUD User testing', () => {
//   test('Fetch user data', async () => {
//     const { result } = renderHook(() => useUsers(), { wrapper });

//     await waitFor(() =>
//       expect(result.current.users?.length).toBeGreaterThan(0)
//     );
//   });

//   test('Create user', async () => {
//     const { result } = renderHook(() => useCreateUser(), { wrapper });

//     act(() => {
//       const testMethod = async () => {
//         result.current.createUser(sampleData);
//         await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
//       };

//       testMethod();
//     });
//   });

//   test('Update user', async () => {
//     const { result } = renderHook(() => useUpdateUser(), { wrapper });

//     act(() => {
//       const testMethod = async () => {
//         result.current.updateUser(sampleData);
//         await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
//       };

//       testMethod();
//     });
//   });
// });
