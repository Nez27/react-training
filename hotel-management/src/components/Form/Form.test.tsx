import { render } from '@testing-library/react';

// Components
import Form from '.';

// Styled
import Input from '@src/commons/styles/Input';

describe('Form ', () => {
  const isDisable = true;
  const errorMessage = 'This is error message';
  const handleOnSubmit = jest.fn();
  const handleOnClick = jest.fn();

  const wrapper = render(
    <Form onSubmit={handleOnSubmit}>
      <Form.Row label="Name" error={errorMessage}>
        <Input type="text" id="name" />
      </Form.Row>

      <Form.Row label="Price" error={errorMessage}>
        <Input type="text" id="price" />
      </Form.Row>

      <Form.Action>
        <Form.Button type="submit" name="submit" disabled={isDisable}>
          Confirm
        </Form.Button>
        <Form.Button
          type="button"
          variations="secondary"
          onClick={handleOnClick}
        >
          Close
        </Form.Button>
      </Form.Action>
    </Form>
  );

  test('Should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
