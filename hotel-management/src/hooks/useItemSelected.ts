import { useContext } from 'react';

// Contexts
import { ItemSelectContext } from '@src/contexts/ItemSelected';

/**
 * The hooks check the place call is in UserRoomAvailableProvider or not
 * @returns The context of UserRoomAvailableContext
 */
const useItemSelect = () => {
  const context = useContext(ItemSelectContext);

  if (context === undefined) {
    throw new Error(
      'ItemSelectContext was used outside of ItemSelectContextProvider'
    );
  }

  return context;
};

export { useItemSelect };
