import { BrowserRouter, useNavigate } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';

// Components
import Sidebar from '.';

// Mock useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Sidebar', () => {
  const wrapper = render(
    <BrowserRouter>
      <Sidebar heading="Hotel Management" />
    </BrowserRouter>
  );

  test('Should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('On click to heading should be navigate', () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    const wrapper = render(
      <BrowserRouter>
        <Sidebar heading="Hotel Management" />
      </BrowserRouter>
    );

    const headingElement = wrapper.getByText('Hotel Management');
    fireEvent.click(headingElement);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
