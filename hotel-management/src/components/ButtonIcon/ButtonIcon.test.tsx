import renderer from 'react-test-renderer';

// Components
import ButtonIcon from '.';
import { HiOutlineLogout } from 'react-icons/hi';

describe('ButtonIcon testing snapshot', () => {
  const wrapper = renderer.create(
    <ButtonIcon
      aria-label="Logout"
      icon={<HiOutlineLogout />}
      iconStyle={{ size: '23px' }}
    />
  );

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
