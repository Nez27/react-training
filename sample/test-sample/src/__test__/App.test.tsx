import { render, screen } from "@testing-library/react";
import user from '@testing-library/user-event';

import App from "../App";

test("Sample 1", async () => {
  // Setup
  render(<App />);

  const buttonCount = await screen.findByRole("button");

  expect(buttonCount.innerHTML).toBe("count is 0");
});

test("Sample 2", async () => {
  // Setup
  render(<App />);

  const buttonCount = await screen.findByRole("button");

  // Interaction
  await user.click(buttonCount);
  await user.click(buttonCount);

  // Post expectations
  expect(buttonCount.innerHTML).toBe("count is 2");
});

test("Sample 3", async () => {
  // Setup
  render(<App />);

  const buttonCount = await screen.findByRole("button");
  const codeCount = screen.queryByText(/The count is now:/);

  expect(codeCount).not.toBeInTheDocument();

  // Interaction
  await user.click(buttonCount);
  await user.click(buttonCount);

  // Post expectations
  expect(screen.queryByText(/The count is now:/)).toBeInTheDocument();
});
