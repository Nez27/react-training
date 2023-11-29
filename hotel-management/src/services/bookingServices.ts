// Types
import { IBooking, TBookingResponse } from '@type/booking';

// Services
import supabase from './supabaseService';

// Constants
import { DEFAULT_PAGE_SIZE } from '@constant/config';
import {
  BOOKINGS_TABLE,
  ERROR_CHECKOUT,
  ERROR_CREATE_BOOKING,
  ERROR_DELETE_BOOKING,
  ERROR_FETCHING_BOOKING,
  ERROR_UPDATE_BOOKING,
} from '@constant/messages';
import { updateRoomStatus } from './roomServices';
import { updateUserBookedStatus } from './userServices';

interface ICheckOutBooking {
  idBooking: number;
  roomId: number;
  userId: number;
}

interface IGetAllBookings {
  userNameSearch: string;
  page: number;
}

/**
 * Get all bookings from database
 * @returns Return all bookings in database
 */
const getAllBookings = async ({
  userNameSearch,
  page,
}: IGetAllBookings): Promise<{
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
    .range(from, to);

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

const checkOutBooking = async ({
  idBooking,
  roomId,
  userId,
}: ICheckOutBooking) => {
  // Update status booking
  const { data, error } = await supabase
    .from(BOOKINGS_TABLE)
    .update({ status: false })
    .eq('id', idBooking)
    .select()
    .single();

  if (error) {
    console.error(error.message);
    throw new Error(ERROR_CHECKOUT);
  }

  // Update status room, user
  await updateRoomStatus(roomId, false);
  await updateUserBookedStatus(userId, false);

  return data;
};

export {
  createBooking,
  getAllBookings,
  updateBooking,
  deleteBooking,
  checkOutBooking,
};
