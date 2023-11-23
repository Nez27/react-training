import renderer from 'react-test-renderer';

// Components
import Menus from '.';
import { RiEditBoxFill, RiDeleteBin2Line } from 'react-icons/ri';

describe('Menus snapshot testing', () => {
  const id = '123';
  const handleOnClick = () => {
    console.log('Click');
  };

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

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
