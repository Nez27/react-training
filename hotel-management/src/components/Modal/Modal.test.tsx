import { render } from '@testing-library/react';

// Components
import Modal from '.';
import Button from '@src/commons/styles/Button';

describe('Modal', () => {
  const wrapper = render(
    <Modal>
      <Modal.Open
        modalName="room-form"
        renderChildren={(onCloseModal) => (
          <Button onClick={onCloseModal}>Add room</Button>
        )}
      />
      <Modal.Window
        name="room-form"
        title="Add form"
        renderChildren={(fn) => <p onClick={fn}>This is a windows</p>}
      />
    </Modal>
  );

  test('Should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
