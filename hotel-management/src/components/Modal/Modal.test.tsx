import renderer from 'react-test-renderer';

// Components
import Modal from '.';
import Button from '@commonStyle/Button';

describe('Modal', () => {
  const wrapper = renderer.create(
    <Modal>
      <Modal.Open
        modalName="room-form"
        renderChildren={(onCloseModal) => (
          <Button onClick={onCloseModal}>Add room</Button>
        )}
      />
      <Modal.Window name="room-form" title="Add form">
        <p>This is a windows</p>
      </Modal.Window>
    </Modal>
  );

  test('Should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
