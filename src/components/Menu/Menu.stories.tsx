import { Meta, StoryObj } from "@storybook/react";
import { Menu } from "../Menu/Menu"; // 假设你导出的是 IconName 类型

const meta: Meta<typeof Menu> = {
  title: "Components/Menu",
  component: Menu,
  subcomponents: {
    Item: Menu.Item,
    SubMenu: Menu.SubMenu,
  },
  tags: ["autodocs"],
  argTypes: {
    mode: {
      options: ["horizontal", "vertical"],
      control: { type: "radio" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Menu>;


export const Horizontal: Story = {
  args: {
    mode: "horizontal",
    activeKey: "1",
  },
  render: (args) => (
    <Menu {...args}>
      <Menu.Item key="1" icon="home">首页</Menu.Item>
      <Menu.Item key="2" icon="settings">设置</Menu.Item>
      <Menu.SubMenu title="素材中心" icon="folder">
        <Menu.Item key="3" icon="image">图片素材</Menu.Item>
        <Menu.Item key="4" icon="video">视频素材</Menu.Item>
        <Menu.Item key="5" icon="music">音频素材</Menu.Item>
        <Menu.Item key="6" icon="text">文本素材</Menu.Item>
      </Menu.SubMenu>
      <Menu.Item key="7" disabled icon="lock">禁用项</Menu.Item>
    </Menu>
  ),
};


export const Vertical: Story = {
  args: {
    mode: "vertical",
    activeKey: "a",
  },
  render: (args) => (
    <Menu {...args}>
      <Menu.Item key="a" icon="dashboard">仪表盘</Menu.Item>
      <Menu.Item key="b">无图标项</Menu.Item>
      <Menu.SubMenu title="系统管理" icon="settings">
        <Menu.Item key="c" icon="user">用户管理</Menu.Item>
        <Menu.Item key="d" icon="lock">权限管理</Menu.Item>
        <Menu.Item key="e">日志管理</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  ),
};

export const WithOnSelect: Story = {
  args: {
    mode: "horizontal",
    activeKey: "alpha",
    onSelect: (key) => alert(`选中项: ${key}`),
  },
  render: (args) => (
    <Menu {...args}>
      <Menu.Item key="alpha" icon="flag">开始</Menu.Item>
      <Menu.Item key="beta" icon="clock">历史</Menu.Item>
      <Menu.SubMenu title="设置" icon="gear">
        <Menu.Item key="gamma">系统</Menu.Item>
        <Menu.Item key="delta">显示</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  ),
};

