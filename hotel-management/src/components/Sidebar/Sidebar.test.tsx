import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

// Components
import Sidebar from '.';

describe('Sidebar testing snapshot', () => {
  const wrapper = renderer.create(
    <BrowserRouter>
      <Sidebar heading="Hotel Management" />
    </BrowserRouter>
  );

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
