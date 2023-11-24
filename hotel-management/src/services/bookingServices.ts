// Types
import { IBooking, TBookingResponse } from '@type/booking';

// Services
import supabase from './supabaseService';

// Constants
import { DEFAULT_PAGE_SIZE } from '@constant/config';
import {
  BOOKINGS_TABLE,
  ERROR_CREATE_BOOKING,
  ERROR_DELETE_BOOKING,
  ERROR_FETCHING_BOOKING,
  ERROR_UPDATE_BOOKING,
} from '@constant/messages';
import { updateRoomStatus } from './roomServices';
import { updateUserBookedStatus } from './userServices';

/**
 * Get all bookings from database
 * @returns Return all bookings in database
 */
const getAllBookings = async (
  sortBy: string,
  orderBy: string,
  userNameSearch: string,
  page: number
): Promise<{
  data: TBookingResponse[];
  count: number | null;
}> => {
  const from = (page - 1) * DEFAULT_PAGE_SIZE;
  const to = from + DEFAULT_PAGE_SIZE - 1;

  const { data, error, count } = await supabase
    .from(BOOKINGS_TABLE)
    .select(
      'id, startDate, endDate, status, amount, rooms(id, name), users!inner(id, name)',
      {
        count: 'exact',
      }
    )
    .ilike('users.name', `%${userNameSearch}%`)
    .range(from, to)
    .order(sortBy, { ascending: orderBy === 'asc' });

  console.log(data);

  if (error) {
    console.error(error.message);
    throw new Error(ERROR_FETCHING_BOOKING);
  }

  return { data, count };
};

/**
 * Update booking into database
 * @param booking Booking object need to be updated
 */
const updateBooking = async (booking: IBooking): Promise<IBooking> => {
  const { data, error } = await supabase
    .from(BOOKINGS_TABLE)
    .update(booking)
    .eq('id', booking.id)
    .select()
    .single();

  if (error) {
    console.error(error.message);
    throw new Error(ERROR_UPDATE_BOOKING);
  }

  return data;
};

/**
 * Add room to database
 * @param room The room object need to be add
 */
const createBooking = async (booking: IBooking): Promise<IBooking> => {
  const { data, error: createBookingError } = await supabase
    .from(BOOKINGS_TABLE)
    .insert(booking)
    .select()
    .single();

  if (createBookingError) {
    console.error(createBookingError.message);
    throw new Error(ERROR_CREATE_BOOKING);
  }

  // Update status rooms and users
  const statusUpdateRoom = await updateRoomStatus(booking.roomId, true);
  const statusUpdateUser = await updateUserBookedStatus(booking.userId, true);

  if (statusUpdateRoom === 200 && statusUpdateUser === 200) {
    console.error('Error code room: ', statusUpdateRoom);
    console.error('Error code user: ', statusUpdateUser);
    throw new Error("Can't update status room or user.");
  }

  return data;
};

/**
 * Delete room in database
 * @param idRoom The id of room need to delete
 */
const deleteBooking = async (idBooking: number) => {
  const { error } = await supabase
    .from(BOOKINGS_TABLE)
    .delete()
    .eq('id', idBooking);

  if (error) {
    console.error(error.message);
    throw new Error(ERROR_DELETE_BOOKING);
  }
};

export { createBooking, getAllBookings, updateBooking, deleteBooking };
