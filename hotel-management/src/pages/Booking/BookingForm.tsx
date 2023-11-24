// Styled
import Input from '@commonStyle/Input.ts';

// Constants
import { REQUIRED_FIELD_ERROR } from '@constant/formValidateMessage.ts';

// Helpers

// Components
import Form from '@component/Form/index.tsx';

// Hooks
import { FormProvider, useForm } from 'react-hook-form';
import { useCreateBooking } from '@hook/bookings/useCreateBooking.ts';
import { useUpdateBooking } from '@hook/bookings/useUpdateBooking.ts';
import { FormBtn } from './styled.ts';
import { useUserRoomAvailable } from '@hook/useUserRoomAvailable.ts';
import { IBooking, TBookingResponse } from '@type/booking.ts';
import Select, { ISelectOptions } from '@component/Select/index.tsx';
import { useCallback, useMemo } from 'react';
import { getRoomById } from '@service/roomServices.ts';
import {
  convertCurrencyToNumber,
  formatCurrency,
  getDayDiff,
} from '@helper/helper.ts';

interface IBookingFormProp {
  onCloseModal?: () => void;
  booking?: TBookingResponse;
}

interface IBookingForm extends Omit<IBooking, 'amount'> {
  amount: string;
}

const BookingForm = ({ onCloseModal, booking }: IBookingFormProp) => {
  const { roomsAvailable, usersAvailable } = useUserRoomAvailable();

  const { isCreating, createBooking } = useCreateBooking();
  const { isUpdating, updateBooking } = useUpdateBooking();
  const isLoading = isCreating || isUpdating;
  const { id: editId, ...editValues } = { ...booking };
  const formMethods = useForm<IBookingForm>({
    defaultValues: editId
      ? {
          startDate: editValues.startDate,
          endDate: editValues.endDate,
          roomId: editValues.rooms?.id,
          userId: editValues.users?.id,
          amount: formatCurrency(editValues.amount!),
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
  const onSubmit = async (newBooking: IBookingForm) => {
    if (!editId) {
      // Add request
      createBooking(
        { ...newBooking, amount: convertCurrencyToNumber(newBooking.amount) },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      // Edit request
      newBooking.id = editId!;
      updateBooking(
        { ...newBooking, amount: convertCurrencyToNumber(newBooking.amount) },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  };

  const userOptions = useMemo(() => {
    const options: ISelectOptions[] = [];

    usersAvailable?.forEach((item) => {
      if (booking?.users?.id === item.id || !item.status) {
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
      console.log(booking?.rooms?.id, item.id);
      if (booking?.rooms?.id === item.id || !item.status) {
        options.push({
          label: item.name!,
          value: item.id.toString(),
        });
      }
    });

    return options;
  }, [roomsAvailable, booking?.rooms?.id]);

  const computePrice = useCallback(async () => {
    const startDateValue = getValues('startDate');
    const endDateValue = getValues('endDate');
    const roomValue = getValues('roomId');

    if (startDateValue && endDateValue && roomValue) {
      const daysDiff = getDayDiff(
        new Date(startDateValue),
        new Date(endDateValue)
      );

      // Fetch room data
      const room = await getRoomById(roomValue.toString());
      const amount = daysDiff * room.price;

      setValue('amount', formatCurrency(amount), { shouldValidate: true });
    }
  }, [getValues, setValue]);

  return (
    <FormProvider {...formMethods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Row label="User" error={errors?.userId?.message}>
          {userOptions.length ? (
            <Select
              ariaLabel="user-select"
              options={userOptions}
              id="userId"
              optionsConfigForm={{
                valueAsNumber: true,
                onChange: () => trigger('userId'),
              }}
            />
          ) : (
            <p>No user available</p>
          )}
        </Form.Row>

        <Form.Row label="Room" error={errors?.roomId?.message}>
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

        <Form.Row label="Start Date" error={errors?.startDate?.message}>
          <Input
            type="date"
            id="startDate"
            min={Date.now()}
            {...register('startDate', {
              required: REQUIRED_FIELD_ERROR,
              onChange: () => {
                trigger('startDate');
                computePrice();
              },
            })}
          />
        </Form.Row>

        <Form.Row label="End Date" error={errors?.startDate?.message}>
          <Input
            type="date"
            id="endDate"
            min={Date.now()}
            {...register('endDate', {
              required: REQUIRED_FIELD_ERROR,
              onChange: () => {
                trigger('endDate');
                computePrice();
              },
            })}
          />
        </Form.Row>

        <Form.Row label="Amount">
          <Input
            type="text"
            id="amount"
            {...register('amount', {
              required: REQUIRED_FIELD_ERROR,
              onChange: () => trigger('amount'),
            })}
            readOnly
          />
        </Form.Row>

        <Form.Action>
          <FormBtn
            type="submit"
            name="submit"
            disabled={!isDirty || !isValid || isLoading}
          >
            {!editId ? 'Add' : 'Save'}
          </FormBtn>
          <FormBtn type="button" variations="secondary" onClick={onCloseModal}>
            Close
          </FormBtn>
        </Form.Action>
      </Form>
    </FormProvider>
  );
};

export default BookingForm;
