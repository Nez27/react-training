import { act, fireEvent, render } from '@testing-library/react';
import { useState } from 'react';

// Hooks
import { useDebounce } from '@hook/useDebounce';

jest.useFakeTimers();

const TestComponent = ({ initialValue = 0 }: { initialValue?: number }) => {
  const [value, setValue] = useState(initialValue);
  const debouncedValue = useDebounce<number>(value, 1000);

  return (
    <div>
      <button onClick={() => setValue(value + 1)}>Increment</button>
      <span data-testid={'debouncedValue'}>{debouncedValue}</span>
      <span data-testid={'value'}>{value}</span>
    </div>
  );
};

describe('useDebouncedValue', function () {
  test('Debounce value should not change before 1 second', () => {
    const { getByTestId, getByText } = render(<TestComponent />);
    const incrementButton = getByText('Increment');
    const debouncedValue = getByTestId('debouncedValue');
    const value = getByTestId('value');

    const clickAndWaitTime = (passedTime: number) => {
      act(() => {
        fireEvent.click(incrementButton);
        jest.advanceTimersByTime(passedTime);
      });
    };

    clickAndWaitTime(100);

    expect(debouncedValue.textContent).toBe('0');
    expect(value.textContent).toBe('1');

    clickAndWaitTime(1000);

    expect(debouncedValue.textContent).toBe('1');
    expect(value.textContent).toBe('2');
  });
});
