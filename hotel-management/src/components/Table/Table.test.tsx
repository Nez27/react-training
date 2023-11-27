import renderer from 'react-test-renderer';

// Components
import Table from '.';

// Types
import { IUser } from '@type/users';

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
    },
    {
      id: 2,
      name: 'Loi Phan',
      phone: '453',
      isBooked: false,
    },
  ];
  const TableRow = ({ user }: ITableRow) => {
    const { id, name, phone, isBooked } = user;

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

  const wrapper = renderer.create(
    <Table columns="10% 35% 30% 15% 10%">
      <Table.Header headerColumn={columnName} />
      <Table.Body<IUser> data={tempUser} render={renderRow} />
    </Table>
  );

  test('Should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
