import { Meta, StoryObj } from "@storybook/react";
import { StarRating } from "./StarRating";

const meta: Meta<typeof StarRating> = {
  title: "Example/StarRating",
  component: StarRating,
  tags: ["autodocs"],
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 50,
    maxRating: 5,
  },
};

export const Secondary: Story = {
  args: {
    size: 50,
    maxRating: 5,
    color: "beach",
    defaultRating: 5,
    messages: ["Worst", "Worse", "Normal", "Good", "Best"],
  },
};
