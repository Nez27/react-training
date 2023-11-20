import { UserRoomAvailableContext } from '@context/UserRoomAvailableContext';
import { useContext } from 'react';

const useUserRoomAvailable = () => {
  const context = useContext(UserRoomAvailableContext);

  if (context === undefined) {
    throw new Error(
      'UserRoomAvailableContext was used outside of UserRoomAvailableProvider'
    );
  }

  return context;
};

export { useUserRoomAvailable };
