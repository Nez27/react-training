interface IBooking {
  id: number;
  startDate: string;
  endDate: string;
  status: boolean;
  amount: number;
  roomId: number;
  userId: number;
}

interface TBookingResponse {
  id: number;
  startDate: string;
  endDate: string;
  status: boolean;
  amount: number;
  rooms: {
    id: number
    name: string;
  } | null;
  users: {
    id: number;
    name: string;
  } | null;
}

export type { IBooking, TBookingResponse };
