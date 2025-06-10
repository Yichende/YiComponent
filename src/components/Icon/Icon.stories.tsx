import { Meta, StoryObj } from '@storybook/react'
import { Icon } from './Icon'

// 读取所有图标名称（通过 import.meta.glob 同步导入 SVG 原始内容）
const iconModules = import.meta.glob('@icons/*.svg', {
  as: 'raw',
  eager: true,
})

const iconNames = Object.keys(iconModules).map((path) => {
  const match = path.match(/\/([^/]+)\.svg$/)
  return match ? match[1] : ''
}).filter(Boolean)

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  argTypes: {
    name: {
      control: {
        type: 'select',
      },
      options: iconNames,
    },
    size: {
      control: {
        type: 'radio',
      },
      options: ['sm', 'md', 'lg', 'xl'],
    },
    color: { control: 'color' },
    pixelSize: {
      control: { type: 'number', min: 1, max: 5, step: 1 },
    },
  },
  args: {
    name: iconNames[0],
    size: 'md',
    color: '#000000',
    pixelSize: 1,
  },
}
export default meta

type Story = StoryObj<typeof Icon>

export const Playground: Story = {
  render: (args) => <Icon {...args} />,
}

export const AllIcons: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, 80px)', gap: '16px' }}>
      {iconNames.map((name) => (
        <div key={name} style={{ textAlign: 'center' }}>
          <Icon {...args} name={name} color="#fff" />
          <div style={{ fontSize: 12 }}>{name}</div>
        </div>
      ))}
    </div>
  ),
  args: {
    size: 'md',
    color: '#000000',
    pixelSize: 1,
  },
}
