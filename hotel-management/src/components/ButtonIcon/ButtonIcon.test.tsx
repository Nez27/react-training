import { HiOutlineLogout } from 'react-icons/hi';

// Components
import { render } from '@testing-library/react';
import ButtonIcon from '.';

describe('ButtonIcon', () => {
  const wrapper = render(
    <ButtonIcon
      aria-label="Logout"
      icon={<HiOutlineLogout />}
    />
  );

  test('Should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
