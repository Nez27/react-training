import { Outlet } from 'react-router-dom';

// Components
import Header from '../Header';
import Sidebar from '../Sidebar';

// Styled
import { Main, StyledAppLayout } from './styled';

// Hooks
import { useAccount } from '@src/hooks/authentication/useAccount';

// Contexts
import { initialState, reducer, UserRoomAvailableContext } from '@src/contexts/UserRoomAvailableContext.ts';
import { useEffect, useReducer } from 'react';

// Services
import { getAllUsers } from '@src/services/userServices.ts';
import { getAllRooms } from '@src/services/roomServices.ts';

const AppLayout = () => {
  const { account } = useAccount();

  const [{ usersAvailable, roomsAvailable }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // Init list user and room available
  // Init list user and room available
  useEffect(() => {
    const load = async () => {
      const tempUser = await getAllUsers({
        sortBy: 'id',
        orderBy: 'asc',
        phoneSearch: '',
        page: 0,
      });

      if (tempUser) {
        dispatch({ type: 'initUser', payload: tempUser.data });
      }

      const tempRoom = await getAllRooms({
        sortBy: 'id',
        orderBy: 'asc',
        roomSearch: '',
        page: 0,
      });

      if (tempRoom) {
        dispatch({ type: 'initRoom', payload: tempRoom.data });
      }
    };

    load();
  }, []);

  return (
    <UserRoomAvailableContext.Provider value={{usersAvailable, roomsAvailable}}>
      <StyledAppLayout>
        <Header accountName={account?.user_metadata.fullName} />
        <Sidebar heading="Hotel Management" />
        <Main>
          <Outlet />
        </Main>
      </StyledAppLayout>
    </UserRoomAvailableContext.Provider>
  );
};

export default AppLayout;
