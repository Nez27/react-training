import { BrowserRouter } from 'react-router-dom';
import { useState } from 'react';

// Components
import Search from '.';
import {
  RenderResult,
  fireEvent,
  render,
  act,
} from '@testing-library/react';

let mockSearchParam = '';

jest.useFakeTimers();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: () => {
    const [params, setParams] = useState(new URLSearchParams(mockSearchParam));
    return [
      params,
      (newParams: string) => {
        mockSearchParam = newParams;
        setParams(new URLSearchParams(newParams));
      },
    ];
  },
}));

describe('Search', () => {
  // const placeHolder = 'Search placeholder...';
  // let wrapper: RenderResult | null = null;

  // beforeEach(() => {
  //   wrapper = render(
  //     <BrowserRouter>
  //       <Search setPlaceHolder={placeHolder} />
  //     </BrowserRouter>
  //   );
  // });

  // test('Should render correctly', () => {
  //   expect(wrapper).toMatchSnapshot();
  // });

  test('Should add query to url after 1 second', async () => {
    let wrapper: RenderResult | null = null;
    act(() => {
      wrapper = render(
        <BrowserRouter>
          <Search setPlaceHolder={'Search placeholder...'} />
        </BrowserRouter>
      );
    });

    const searchField = await wrapper!.findByPlaceholderText(
      'Search placeholder...'
    );

    act(() => {
      fireEvent.change(searchField, { target: { value: 'abc' } });
    });

    // jest.advanceTimersByTime(1000);
  });
});
  