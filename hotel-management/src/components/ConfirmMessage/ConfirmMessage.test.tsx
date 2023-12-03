import { RenderResult, fireEvent, render } from '@testing-library/react';

// Components
import ConfirmMessage from '.';

describe('ConfirmMessage testing snapshot', () => {
  const message = 'Hello World!';
  const handleOnConfirm = jest.fn();
  const handleOnCloseModal = jest.fn();
  let wrapper: RenderResult | null = null;

  beforeEach(() => {
    wrapper = render(
      <ConfirmMessage
        message={message}
        onConfirm={handleOnConfirm}
        onCloseModal={handleOnCloseModal}
      />
    );
  });

  test('Should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('handleOnConfirm should be call', () => {
    const confirmBtn = wrapper!.getByText('Yes');

    fireEvent.click(confirmBtn);

    expect(handleOnConfirm).toHaveBeenCalled();
    expect(handleOnCloseModal).toHaveBeenCalled();
  });
});
