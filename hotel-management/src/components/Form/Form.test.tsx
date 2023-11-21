import renderer from 'react-test-renderer';

import Form from '.';
import Input from '@commonStyle/Input';
import { FormBtn } from '@page/User/styled';

describe('Form testing snapshot', () => {
  const isDisable = true;
  const errorMessage = 'This is error message';
  const handleOnSubmit = () => {
    console.log('Confirm');
  };
  const handleOnClick = () => {
    console.log('On Click');
  };

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

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
