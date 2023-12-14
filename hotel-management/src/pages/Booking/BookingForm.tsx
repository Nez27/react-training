import { useCallback, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

// Styled
import Input from '@src/commons/styles/Input';

// Constants
import { REQUIRED_FIELD_ERROR } from '@src/constants/formValidateMessage';

// Components
import Form from '@src/components/Form';
import Select, { ISelectOptions } from '@src/components/Select/index.tsx';

// Hooks
import { useCreateBooking } from '@src/hooks/bookings/useCreateBooking';
import { useUpdateBooking } from '@src/hooks/bookings/useUpdateBooking';
import { useUserRoomAvailable } from '@src/hooks/useUserRoomAvailable';

// Helpers
import { formatCurrency, getDayDiff } from '@src/helpers/helper';

// Services
import { getRoomById, updateRoomStatus } from '@src/services/roomServices';
import { updateUserBookedStatus } from '@src/services/userServices';

// Types
import { IBooking, TBookingResponse } from '@src/types/booking';

interface IBookingFormProp {
  onCloseModal?: () => void;
  booking?: TBookingResponse;
}

const BookingForm = ({ onCloseModal, booking }: IBookingFormProp) => {
  const {
    roomsAvailable,
    usersAvailable,
    dispatch
  } = useUserRoomAvailable();
  
  const { isCreating, createBooking } = useCreateBooking();
  const { isUpdating, updateBooking } = useUpdateBooking();
  const isLoading = isCreating || isUpdating;
  const { id: editId, ...editValues } = { ...booking };
  const [amountValue, setAmountValue] = useState(
    editValues.amount ? formatCurrency(editValues.amount) : '$0.00'
  );
  const formMethods = useForm<IBooking>({
    defaultValues: editId
      ? {
          startDate: editValues.startDate,
          endDate: editValues.endDate,
          roomId: editValues.rooms?.id,
          userId: editValues.users?.id,
          amount: editValues.amount!,
        }
      : {},
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
    trigger,
    getValues,
    setValue,
  } = formMethods;

  // Submit form
  const onSubmit = async (newBooking: IBooking) => {
    if (!editId) {
      // Add request
      createBooking(newBooking, {
        onSuccess: async () => {
          reset();
          onCloseModal?.();

          // Update room, user available in global state
          dispatch!({
            type: 'updateStatusUser',
            payload: [{ id: newBooking.userId, isBooked: true }],
          });
          dispatch!({
            type: 'updateStatusRoom',
            payload: [{ id: newBooking.roomId, status: true }],
          });
          
          // Update room, user available in server
          await updateRoomStatus(newBooking.roomId, true);
          await updateUserBookedStatus(newBooking.userId, true);
        },
      });
    } else {
      // Edit request
      newBooking.id = editId!;
      updateBooking(newBooking, {
        onSuccess: async () => {
          reset();
          onCloseModal?.();

          // Update room status in global state
          // Reset status old room
          dispatch!({
            type: 'updateStatusRoom',
            payload: [{ id: booking!.rooms!.id, status: false }],
          });

          // Change status new room
          dispatch!({
            type: 'updateStatusRoom',
            payload: [{ id: newBooking.roomId, status: true }],
          });

          // Update room status in server
          // Reset status old room
          await updateRoomStatus(booking!.rooms!.id, false);

          // Change status new room
          await updateRoomStatus(newBooking.roomId, true);
        },
      });
    }
  };

  // Init user, room available to options choice
  const userOptions = useMemo(() => {
    const options: ISelectOptions[] = [];

    usersAvailable?.forEach((item) => {
      if (booking?.users?.id === item.id || !item.isBooked) {
        options.push({
          label: item.name!,
          value: item.id.toString(),
        });
      }
    });

    return options;
  }, [usersAvailable, booking?.users?.id]);

  const roomOptions = useMemo(() => {
    const options: ISelectOptions[] = [];

    roomsAvailable?.forEach((item) => {
      if (booking?.rooms?.id === item.id || !item.status) {
        options.push({
          label: item.name!,
          value: item.id.toString(),
        });
      }
    });

    return options;
  }, [roomsAvailable, booking?.rooms?.id]);

  // Calculate the final price
  const computePrice = useCallback(async () => {
    const startDateValue = getValues('startDate');
    const endDateValue = getValues('endDate');
    const roomValue = getValues('roomId');

    if (startDateValue && endDateValue && roomValue) {
      setAmountValue('Loading...');

      const daysDiff = getDayDiff(
        new Date(startDateValue),
        new Date(endDateValue)
      );

      // Fetch room data
      const room = await getRoomById(roomValue.toString());
      const amount = daysDiff * room.price;

      setValue('amount', amount, { shouldValidate: true });
      setAmountValue(formatCurrency(amount));
    }
  }, [getValues, setValue]);

  const checkValidTwoDates = useCallback(() => {
    const startDate = new Date(getValues().startDate);
    const endDate = new Date(getValues().endDate);

    if (startDate >= endDate) {
      setValue('endDate', '');
    }
  }, [setValue, getValues]);

  const startDateValidate = new Date().toISOString().split('T')[0];

  const endDateValidate = () => {
    if (getValues('startDate')) {
      const date = new Date(getValues('startDate'));
      date.setDate(date.getDate() + 1);

      return date.toISOString().split('T')[0];
    }

    return;
  };

  return (
    <FormProvider {...formMethods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Row label="User:" error={errors?.userId?.message}>
          {userOptions.length ? (
            <Select
              ariaLabel="user-select"
              options={userOptions}
              id="userId"
              disable={Boolean(booking?.users)}
              optionsConfigForm={{
                valueAsNumber: true,
                onChange: () => trigger('userId'),
              }}
            />
          ) : (
            <p>No user available</p>
          )}
        </Form.Row>

        <Form.Row label="Room:" error={errors?.roomId?.message}>
          {roomOptions.length ? (
            <Select
              ariaLabel="user-select"
              options={roomOptions}
              id="roomId"
              optionsConfigForm={{
                valueAsNumber: true,
                onChange: () => trigger('roomId'),
              }}
            />
          ) : (
            <p>No room available</p>
          )}
        </Form.Row>

        <Form.Row label="Start Date:" error={errors?.startDate?.message}>
          <Input
            type="date"
            id="startDate"
            min={startDateValidate}
            {...register('startDate', {
              required: REQUIRED_FIELD_ERROR,
              onChange: () => {
                trigger('startDate');
                checkValidTwoDates();

                computePrice();
              },
            })}
          />
        </Form.Row>

        <Form.Row label="End Date:" error={errors?.endDate?.message}>
          <Input
            type="date"
            id="endDate"
            min={endDateValidate()}
            disabled={!getValues('startDate')}
            {...register('endDate', {
              required: REQUIRED_FIELD_ERROR,
              onChange: () => {
                trigger('endDate');
                computePrice();
              },
              validate: (endDateValue) =>
                endDateValue > getValues().startDate || 'Invalid date',
            })}
          />
        </Form.Row>

        <Form.Row label="Amount:">
          <Input
            type="hidden"
            id="amount"
            {...register('amount', {
              required: REQUIRED_FIELD_ERROR,
              onChange: () => trigger('amount'),
            })}
          />

          <span>{amountValue}</span>
        </Form.Row>

        <Form.Action>
          <Form.Button
            type="submit"
            name="submit"
            disabled={!isDirty || !isValid || isLoading}
          >
            {
              !editId
                ? 'Add'
                : 'Save'
            }
          </Form.Button>
          <Form.Button
            type="button"
            variations="secondary"
            onClick={onCloseModal}
          >
            Close
          </Form.Button>
        </Form.Action>
      </Form>
    </FormProvider>
  );
};

export default BookingForm;
