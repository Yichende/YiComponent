import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ColorPicker, ColorPickerProps } from './ColorPicker';

const meta: Meta<typeof ColorPicker> = {
  title: 'Components/ColorPicker',
  component: ColorPicker,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    value: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    presets: {
      control: 'object',
    },
  },
};

export default meta;

type Story = StoryObj<typeof ColorPicker>;

// ---------- Default (Uncontrolled)
export const Default: Story = {
  args: {
    defaultValue: '#4a90e2',
    size: 'md',
  },
};

// ---------- Controlled
export const Controlled: Story = {
  render: (args: ColorPickerProps) => {
    const [color, setColor] = useState('#fa541c');

    return (
      <ColorPicker
        {...args}
        value={color}
        onChange={setColor}
      />
    );
  },
  args: {
    size: 'md',
  },
};

// ---------- Disabled
export const Disabled: Story = {
  args: {
    defaultValue: '#13c2c2',
    disabled: true,
    size: 'md',
  },
};

// ---------- Preset Colors
export const CustomPresets: Story = {
  args: {
    presets: ['#ff4d4f', '#52c41a', '#1890ff', '#fadb14', '#722ed1'],
    defaultValue: '#1890ff',
    size: 'md',
  },
};

// ---------- Sizes
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <ColorPicker defaultValue="#ff4d4f" size="sm" />
      <ColorPicker defaultValue="#1890ff" size="md" />
      <ColorPicker defaultValue="#52c41a" size="lg" />
    </div>
  ),
};
