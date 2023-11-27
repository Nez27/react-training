import renderer from 'react-test-renderer';

// Components
import Form from '.';
import Input from '@commonStyle/Input';

// Styled
import { FormBtn } from '@page/User/styled';

describe('Form ', () => {
  const isDisable = true;
  const errorMessage = 'This is error message';
  const handleOnSubmit = jest.fn();
  const handleOnClick = jest.fn();

  const wrapper = renderer.create(
    <Form onSubmit={handleOnSubmit}>
      <Form.Row label="Name" error={errorMessage}>
        <Input type="text" id="name" />
      </Form.Row>

      <Form.Row label="Price" error={errorMessage}>
        <Input type="text" id="price" />
      </Form.Row>

      <Form.Action>
        <FormBtn type="submit" name="submit" disabled={isDisable}>
          Confirm
        </FormBtn>
        <FormBtn type="button" variations="secondary" onClick={handleOnClick}>
          Close
        </FormBtn>
      </Form.Action>
    </Form>
  );

  test('Should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
