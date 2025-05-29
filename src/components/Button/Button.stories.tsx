import { Meta, StoryObj } from '@storybook/react';
import { YiButton } from './Button';

const meta: Meta<typeof YiButton> = {
  title: 'Components/YiButton',
  component: YiButton,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
    disabled: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof YiButton>;

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