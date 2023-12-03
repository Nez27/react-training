import { render } from '@testing-library/react';

// Components
import Table from '.';

// Types
import { IUser } from '@type/user';

interface ITableRow {
  user: IUser;
}

describe('Table', () => {
  const columnName = ['Column 1', 'Column 2'];
  const tempUser: IUser[] = [
    {
      id: 1,
      name: 'Nezumi',
      phone: '123',
      isBooked: true,
      isDelete: true,
    },
    {
      id: 2,
      name: 'Loi Phan',
      phone: '453',
      isBooked: false,
      isDelete: true,
    },
  ];
  const TableRow = ({ user }: ITableRow) => {
    const {
      id,
      name,
      phone,
      isBooked
    } = user;

    return (
      <Table.Row>
        <div>{id}</div>
        <div>{name}</div>
        <div>{phone}</div>
        <div>{isBooked}</div>
      </Table.Row>
    );
  };
  const renderRow = (user: IUser) => <TableRow user={user} key={user.id} />;

  const wrapper = render(
    <Table columns="10% 35% 30% 15% 10%">
      <Table.Header headerColumn={columnName} />
      <Table.Body<IUser> data={tempUser} render={renderRow} />
    </Table>
  );

  test('Should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
