import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

// Components
import Sidebar from '.';

describe('Sidebar', () => {
  const wrapper = renderer.create(
    <BrowserRouter>
      <Sidebar heading="Hotel Management" />
    </BrowserRouter>
  );

  test('Should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
