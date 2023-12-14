import { useContext } from 'react';

// Contexts
import { UserRoomAvailableContext } from '@src/contexts/UserRoomAvailableContext';

/**
 * The hooks check the place call is in UserRoomAvailableProvider or not
 * @returns The context of UserRoomAvailableContext
 */
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
