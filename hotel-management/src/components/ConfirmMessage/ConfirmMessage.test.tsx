import renderer from 'react-test-renderer';

// Components
import ConfirmMessage from '.';

describe('ConfirmMessage testing snapshot', () => {
  const message = 'Hello World!';
  const handleOnConfirm = () => {
    console.log('Confirm');
  };

  const wrapper = renderer.create(
    <ConfirmMessage
      message={message}
      onConfirm={handleOnConfirm}
    />
  );

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
