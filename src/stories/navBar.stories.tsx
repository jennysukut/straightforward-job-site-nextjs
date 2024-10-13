import type { Meta, StoryObj } from "@storybook/react";

import NavBar from "../components/navBar";

const meta = {
  component: NavBar,
} satisfies Meta<typeof NavBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
