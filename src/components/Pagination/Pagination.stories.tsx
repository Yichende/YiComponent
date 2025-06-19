import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['default', 'small'],
    },
    onChange: { action: 'pageChanged' },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: {
    current: 1,
    total: 100,
    pageSize: 10,
    showSizeChanger: true,
    showQuickJumper: true,
    disabled: false,
  },
};

export const SmallSize: Story = {
  args: {
    current: 2,
    total: 50,
    pageSize: 5,
    size: 'small',
  },
};

export const Disabled: Story = {
  args: {
    current: 1,
    total: 100,
    pageSize: 10,
    disabled: true,
    showSizeChanger: true,
    showQuickJumper: true,
  },
};
