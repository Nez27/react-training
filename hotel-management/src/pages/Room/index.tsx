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

interface IRoomTable extends Omit<IRoom, 'status'> {
  status: string;
}

const Room = () => {
  const [itemSelected, setItemSelected] = useState<IRoomTable>();

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

  return (
    <StyledRoom>
      <Direction type="horizontal">
        <Title>List Room</Title>

        <Modal>
          <ActionTable>
            <Modal.Open
              modalName="room-form"
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
            <Modal.Window
              name="room-form"
              title="Add form"
              renderChildren={(onCloseModal) => (
                <RoomForm onCloseModal={onCloseModal} />
              )}
            />

            <ButtonIcon
              icon={<FiEdit />}
              text={'Edit'}
              iconSize={'18px'}
              fontSize={'var(--fs-sm)'}
              variations={'success'}
              iconColor={'white'}
              disabled={Boolean(!itemSelected)}
            />
            <ButtonIcon
              icon={<FaRegTrashAlt />}
              text={'Delete'}
              iconSize={'18px'}
              fontSize={'var(--fs-sm)'}
              variations={'danger'}
              iconColor={'white'}
              disabled={Boolean(!itemSelected)}
            />
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
          enabledSort={true}
          enabledOrder={true}
          enabledSearch={true}
          stateSelected={{
            itemSelected,
            setItemSelected,
          }}
          onRowClick={(data) => {
            setItemSelected(data);
          }} />}
    </StyledRoom>
  );
};

export default Room;
