import { useDebounce } from '@hook/useDebounce';
import { fireEvent, render } from '@testing-library/react';
import { useState } from 'react';
import { act } from 'react-test-renderer';

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
  afterEach(() => {
    jest.useRealTimers();
  });

  test('Debounce value should not change before 1 second', () => {
    jest.useFakeTimers();
    const { getByTestId, getByText } = render(<TestComponent />);
    const incrementButton = getByText('Increment');
    const debouncedValue = getByTestId('debouncedValue');
    const value = getByTestId('value');

    const incrementAndPassTime = (passedTime: number) => {
      act(() => {
        fireEvent.click(incrementButton);
        jest.advanceTimersByTime(passedTime);
      });
    };
    incrementAndPassTime(999);

    expect(debouncedValue.textContent).toBe('0');
    expect(value.textContent).toBe('1');

    incrementAndPassTime(1000);

    expect(debouncedValue.textContent).toBe('1');
    expect(value.textContent).toBe('2');
  });
});
