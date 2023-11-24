// Types
import { IBooking, TBookingResponse } from '@type/booking';

// Services
import supabase from './supabaseService';

// Constants
import { DEFAULT_PAGE_SIZE } from '@constant/config';

const BOOKINGS_TABLE = 'bookings';
const ERROR_FETCHING = "Can't fetch booking data!";
const ERROR_UPDATE_BOOKING = "Can't update booking!";
const ERROR_CREATE_BOOKING = "Can't create booking!";
const ERROR_DELETE_BOOKING = "Can't delete booking!";

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
    throw new Error(ERROR_FETCHING);
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
const createBooking = async (room: IBooking): Promise<IBooking> => {
  const { data, error } = await supabase
    .from(BOOKINGS_TABLE)
    .insert(room)
    .select()
    .single();

  if (error) {
    console.error(error.message);
    throw new Error(ERROR_CREATE_BOOKING);
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
