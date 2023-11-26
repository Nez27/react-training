import renderer from 'react-test-renderer';

// Components
import ConfirmMessage from '.';

describe('ConfirmMessage', () => {
  const isDisable = true;
  const message = 'Hello World!';
  const handleOnConfirm = jest.fn();

  const wrapper = renderer.create(
    <ConfirmMessage
      disabled={isDisable}
      message={message}
      onConfirm={handleOnConfirm}
    />
  );

  test('Should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
