import { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
    disabled: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Pixel Button',
    variant: 'primary'
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};

export const Warning: Story = {
  args: {
    children: 'Warning Button',
    variant: "warning",
    size: 'sm',
  },
};

export const Loading: Story = {
  args: {
    children: 'Loading Button',
    isLoading: true,
    loadingText: 'Loading',
  }
}