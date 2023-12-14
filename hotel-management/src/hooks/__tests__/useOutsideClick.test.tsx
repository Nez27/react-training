import { fireEvent, render, renderHook, screen } from '@testing-library/react';

// Hooks
import { useOutsideClick } from '../useOutsideClick';

describe('useOutsideClick', () => {
  test('Call handler when click outside element', () => {
    const handler = jest.fn();
    const ref = renderHook(() => useOutsideClick<HTMLDivElement>(handler))
      .result.current;
    render(<div ref={ref}></div>);

    fireEvent.click(document);

    expect(handler).toHaveBeenCalledTimes(1);
  });

  test('Not call handler when click outside element', () => {
    const handler = jest.fn();
    const ref = renderHook(() => useOutsideClick<HTMLDivElement>(handler))
      .result.current;
    render(<div ref={ref} data-testid="test-element"></div>);

    fireEvent.click(screen.getByTestId('test-element'));

    expect(handler).not.toHaveBeenCalled();
  });
});
