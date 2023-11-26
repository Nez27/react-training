import renderer from 'react-test-renderer';

// Components
import Menus from '.';
import { RiEditBoxFill, RiDeleteBin2Line } from 'react-icons/ri';

describe('Menus', () => {
  const id = '123';
  const handleOnClick = jest.fn();

  const wrapper = renderer.create(
    <Menus>
      <Menus.Menu>
        <Menus.Toggle id={id} />

        <Menus.List id={id.toString()}>
          <Menus.Button onClick={handleOnClick} icon={<RiEditBoxFill />}>
            Edit
          </Menus.Button>
          <Menus.Button onClick={handleOnClick} icon={<RiDeleteBin2Line />}>
            Delete
          </Menus.Button>
        </Menus.List>
      </Menus.Menu>
    </Menus>
  );

  test('Should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
