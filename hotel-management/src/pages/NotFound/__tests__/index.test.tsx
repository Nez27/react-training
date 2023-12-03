import { fireEvent, render, screen } from "@testing-library/react";
import NotFound from "..";
import { useNavigate } from "react-router-dom";

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('NotFound', () => {
  test('Should render correctly', () => {
    render(<NotFound />);

    expect(screen.getByText('The page not found!')).toBeInTheDocument();
    expect(screen.getByText('Go back!')).toBeInTheDocument();
  });

  test('Should call navigate correctly when click button', () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    render(<NotFound />);

    fireEvent.click(screen.getByText('Go back!'));

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
