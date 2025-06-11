import { Meta, StoryObj } from "@storybook/react";
import { Dropdown, DropdownItem } from "./Dropdown";

const meta: Meta<typeof Dropdown> = {
  title: "Components/Dropdown",
  component: Dropdown,
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Basic: Story = {
  render: () => (
    <div style={{ padding: 50 }}>
      <Dropdown trigger={<span>菜单</span>}>
        <DropdownItem icon="folder" onClick={() => alert("文件夹")}>
          文件夹
        </DropdownItem>
        <DropdownItem icon="file" onClick={() => alert("文档")}>
          文档
        </DropdownItem>
        <DropdownItem icon="settings" onClick={() => alert("设置")}>
          设置
        </DropdownItem>
      </Dropdown>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ padding: 50 }}>
      <Dropdown trigger={<span>禁用菜单</span>} disabled>
        <DropdownItem>无法点击</DropdownItem>
      </Dropdown>
    </div>
  ),
};

export const Positioned: Story = {
  render: () => (
    <div style={{ padding: 50, display: "flex", gap: 40 }}>
      <Dropdown trigger={<span>左下</span>} position="bottom-left">
        <DropdownItem>选项1</DropdownItem>
      </Dropdown>
      <Dropdown trigger={<span>右下</span>} position="bottom-right">
        <DropdownItem>选项2</DropdownItem>
      </Dropdown>
      <Dropdown trigger={<span>左上</span>} position="top-left">
        <DropdownItem>选项3</DropdownItem>
      </Dropdown>
      <Dropdown trigger={<span>右上</span>} position="top-right">
        <DropdownItem>选项4</DropdownItem>
      </Dropdown>
    </div>
  ),
};
