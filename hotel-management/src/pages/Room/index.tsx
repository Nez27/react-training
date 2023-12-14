// Components
import RoomForm from './RoomForm';
import Modal from '@src/components/Modal';
import ButtonIcon from '@src/components/ButtonIcon';
import Direction from '@src/commons/styles/Direction';
import { FiEdit } from 'react-icons/fi';
import { FaRegTrashAlt } from 'react-icons/fa';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import Table from '@src/components/Table';

// Styled
import { ActionTable, StyledRoom, Title } from './styled';
import Spinner from '@src/commons/styles/Spinner.ts';

// Types
import { ColumnProps } from '@src/types/common.ts';
import { IRoom } from '@src/types/room.ts';

// Hooks
import { useRooms } from '@src/hooks/rooms/useRooms.ts';
import { useEffect, useState } from 'react';
import {FORM, ROOM_PAGE} from '@src/constants/commons.ts';
import { findItemInListById } from '@src/helpers/helper.ts';
import ConfirmMessage from '@src/components/ConfirmMessage';
import { useSetIsDeleteRoom } from '@src/hooks/rooms/useSetIsDeleteRoom.ts';
import Message from "@src/components/Message";

interface IRoomTable extends Omit<IRoom, 'status'> {
  status: string;
}

const Room = () => {
  const { setIsDeleteRoom } = useSetIsDeleteRoom();
  const [itemSelected, setItemSelected] = useState<IRoomTable>();
  let roomSelected: IRoom | undefined;

  const columns: ColumnProps[] = [
    {
      key: 'id',
      title: 'Id',
      width: 10
    },
    {
      key: 'name',
      title: 'Name',
      width: 40
    },
    {
      key: 'price',
      title: 'Price',
      width: 20
    },
    {
      key: 'status',
      title: 'Status',
      width: 20
    }
  ];
  const { isLoading, rooms, count } = useRooms();

  // Reset value when rooms changed.
  useEffect(() => {
    setItemSelected(undefined);
  }, [rooms]);

  const tempRooms = rooms?.map((room) => ({
    ...room,
    status: room.status
      ? 'Unavailable'
      : 'Available'
  }));

  if (itemSelected && rooms) {
    roomSelected = findItemInListById<IRoom>(itemSelected.id, rooms);
  }

  return (
    <StyledRoom>
      <Direction type="horizontal">
        <Title>List Room</Title>

        <Modal>
          <ActionTable>
            <Modal.Open
              modalName={FORM.ROOM}
              renderChildren={(onCloseModal) => (
                <ButtonIcon
                  icon={<MdOutlineAddCircleOutline />}
                  text={'Add Room'}
                  iconSize={'18px'}
                  fontSize={'var(--fs-sm)'}
                  variations={'primary'}
                  iconColor={'white'}
                  onClick={onCloseModal}
                />
              )}
            />

            <Modal.Open
              modalName={FORM.EDIT}
              renderChildren={(onCloseModal) => (
                <ButtonIcon
                  icon={<FiEdit />}
                  text={'Edit'}
                  iconSize={'18px'}
                  fontSize={'var(--fs-sm)'}
                  variations={'success'}
                  iconColor={'white'}
                  disabled={!itemSelected}
                  onClick={onCloseModal}
                />
              )}
            />

            <Modal.Open
              modalName={FORM.DELETE}
              renderChildren={(onCloseModal) => (
                <ButtonIcon
                  icon={<FaRegTrashAlt />}
                  text={'Delete'}
                  iconSize={'18px'}
                  fontSize={'var(--fs-sm)'}
                  variations={'danger'}
                  iconColor={'white'}
                  disabled={!itemSelected || itemSelected?.status === 'Available'}
                  onClick={onCloseModal}
                />
              )}
            />

            <Modal.Window
              name={FORM.ROOM}
              title="Add form"
              renderChildren={(onCloseModal) => (
                <RoomForm onCloseModal={onCloseModal} />
              )}
            />

            <Modal.Window
              name={FORM.EDIT}
              title="Edit Room"
              renderChildren={(onCloseModal) =>
                <RoomForm room={roomSelected} onCloseModal={onCloseModal} />
              } />

            <Modal.Window
              name={FORM.DELETE}
              title="Delete Room"
              renderChildren={(onCloseModal) =>
                <ConfirmMessage
                  message={`Are you sure to delete ${roomSelected!.name}?`}
                  onConfirm={() => setIsDeleteRoom(roomSelected!.id)}
                  onCloseModal={onCloseModal}
                />
              } />

          </ActionTable>
        </Modal>
      </Direction>

      {isLoading && <Spinner />}

      {
        tempRooms &&
        Boolean(tempRooms.length) &&
        <Table<IRoomTable>
          columns={columns}
          rows={tempRooms}
          count={count}
          sortBy={ROOM_PAGE.SORTBY_OPTIONS}
          enabledOrder={true}
          searchPlaceHolder={'Search by name...'}
          stateSelected={{
            itemSelected,
            setItemSelected
          }}
          onRowClick={(data) => {
            setItemSelected(data);
          }} />
      }

      {tempRooms && Boolean(!tempRooms.length) && <Message>No data to show here!</Message>}
    </StyledRoom>
  );
};

export default Room;
