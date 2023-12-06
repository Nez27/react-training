import { fireEvent, render } from "@testing-library/react";
import NotFound from "..";
import { useNavigate } from "react-router-dom";

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('NotFound', () => {
  test('Should render correctly', () => {
    const wrapper = render(<NotFound />);

    expect(wrapper.getByText('The page not found!')).toBeInTheDocument();
    expect(wrapper.getByText('Go back!')).toBeInTheDocument();
  });

  test('Should call navigate correctly when click button', () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    const wrapper = render(<NotFound />);

    fireEvent.click(wrapper.getByText('Go back!'));

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
