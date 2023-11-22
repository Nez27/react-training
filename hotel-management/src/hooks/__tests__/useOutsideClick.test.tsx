import { useOutsideClick } from '@hook/useOutsideClick';
import { fireEvent, render, renderHook, screen } from '@testing-library/react';

describe('useOutsideClick testing', () => {
  test('Call handler when click outside element', () => {
    // Arrange
    const handler = jest.fn();
    const ref = renderHook(() => useOutsideClick<HTMLDivElement>(handler))
      .result.current;
    render(<div ref={ref}></div>);

    fireEvent.click(document);

    // Assert
    expect(handler).toHaveBeenCalledTimes(1);
  });

  test('Not call handler when click outside element', () => {
    // Arrange
    const handler = jest.fn();
    const ref = renderHook(() => useOutsideClick<HTMLDivElement>(handler))
      .result.current;
    render(<div ref={ref} data-testid="test-element"></div>);

    // Act
    fireEvent.click(screen.getByTestId('test-element'));

    // Assert
    expect(handler).not.toHaveBeenCalled();
  });
});
