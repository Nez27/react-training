import { BrowserRouter } from 'react-router-dom';

// Components
import Search from '.';
import { RenderResult, fireEvent, render } from '@testing-library/react';

jest.useFakeTimers();

describe('Search', () => {
  const placeHolder = 'Search placeholder...';
  let wrapper: RenderResult | null = null;

  beforeEach(() => {
    wrapper = render(
      <BrowserRouter>
        <Search setPlaceHolder={placeHolder} />
      </BrowserRouter>
    );
  })

  test('Should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('Should add query to url after 1 second', async () => {
    const searchField = await wrapper!.findByPlaceholderText('Search placeholder...');

    fireEvent.input(searchField, 'test');

    jest.advanceTimersByTime(500);
  });
});
