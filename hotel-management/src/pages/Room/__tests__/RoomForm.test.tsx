import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import {
  RenderResult,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react';

// Types
import { IRoom } from '@src/types/room';

// Components
import RoomForm from '../RoomForm';

const mockCreateRoom = jest.fn();
const mockUpdateRoom = jest.fn();

jest.mock('@src/hooks/rooms/useCreateRoom.ts', () => ({
  ...jest.requireActual('@src/hooks/rooms/useCreateRoom.ts'),
  useCreateRoom: jest.fn(() => ({
    isCreating: false,
    createRoom: mockCreateRoom,
  })),
}));

jest.mock('@src/hooks/rooms/useUpdateRoom', () => ({
  ...jest.requireActual('@src/hooks/rooms/useUpdateRoom'),
  useUpdateRoom: jest.fn(() => ({
    isUpdating: false,
    updateRoom: mockUpdateRoom,
  })),
}));

let result: {
  name: string;
  price: number;
};


describe('RoomForm', () => {
  const queryClient = new QueryClient();

  let wrapper: RenderResult | null = null;

  test('Should render correctly', () => {
    wrapper = render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <RoomForm />
        </BrowserRouter>
      </QueryClientProvider>
    );

    expect(wrapper).toMatchSnapshot();
  });

  test('Should add correctly', async () => {
    wrapper = render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <RoomForm />
        </BrowserRouter>
      </QueryClientProvider>
    );

    const nameField = wrapper!.container.querySelector('#name');
    const priceField = wrapper!.container.querySelector('#price');
    const submitBtn = wrapper!.getByText('Add').closest('button');

    mockCreateRoom.mockImplementationOnce((newRoom, { onSuccess }) => {
      result = newRoom;
      onSuccess();
    });

    fireEvent.input(nameField!, { target: { value: 'Room 1' } });
    fireEvent.input(priceField!, { target: { value: '120' } });

    fireEvent.submit(submitBtn!);

    await waitFor(() => {
      expect(mockCreateRoom).toHaveBeenCalled();
      expect(result).toEqual({ name: 'Room 1', price: 120 });
    });
  });

  test('Should edit correctly', async () => {
    const tempRoom: IRoom = {
      id: 1,
      name: 'Room 1',
      price: 2300,
      status: true,
      isDelete: true,
    }

    wrapper = render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <RoomForm room={tempRoom}/>
        </BrowserRouter>
      </QueryClientProvider>
    );

    const submitBtn = wrapper!.getByText('Save').closest('button');

    mockUpdateRoom.mockImplementationOnce((newRoom, { onSuccess }) => {
      result = newRoom;
      onSuccess();
    });

    fireEvent.submit(submitBtn!);

    await waitFor(() => {
      expect(mockUpdateRoom).toHaveBeenCalled();
      expect(result).toEqual(tempRoom);
    });
  });
});
