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
    <div style={{ padding: 50, display: "flex", gap: 20 }}>
      <Dropdown trigger={"左下"} position="bottom-left">
        <DropdownItem>选项A</DropdownItem>
      </Dropdown>
      <Dropdown trigger={"右下"} position="bottom-right">
        <DropdownItem>选项B</DropdownItem>
      </Dropdown>
      <Dropdown trigger={"左上"} position="top-left">
        <DropdownItem>选项C</DropdownItem>
      </Dropdown>
      <Dropdown trigger={"右上"} position="top-right">
        <DropdownItem>选项D</DropdownItem>
      </Dropdown>
      <Dropdown trigger={"下方"} position="bottom-center">
        <DropdownItem>选项E</DropdownItem>
      </Dropdown>
      <Dropdown trigger={"上方"} position="top-center">
        <DropdownItem>选项F</DropdownItem>
      </Dropdown>
    </div>
  ),
};
