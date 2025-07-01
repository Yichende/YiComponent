import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Radio } from "./Radio";
import { Icon } from "../index";
import "./Radio.module.css";

const meta: Meta<typeof Radio> = {
  title: "Components/Radio",
  component: Radio,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Radio>;

//
// 单个 Radio 示例
//
export const Basic: Story = {
  render: () => (
    <Radio.Group>
      <Radio value="apple">Apple</Radio>
      <Radio value="banana">Banana</Radio>
    </Radio.Group>
  ),
};

//
// RadioGroup 默认值（非受控）
//
export const GroupWithDefaultValue: Story = {
  render: () => (
    <Radio.Group defaultValue="b">
      <Radio value="a">Option A</Radio>
      <Radio value="b">Option B</Radio>
      <Radio value="c">Option C</Radio>
    </Radio.Group>
  ),
};

//
// RadioGroup 受控模式
//
export const ControlledGroup: Story = {
  render: () => {
    const [value, setValue] = useState("2");
    return (
      <Radio.Group
        value={value}
        onChange={setValue}>
        <Radio value="1">One</Radio>
        <Radio value="2">Two</Radio>
        <Radio value="3">Three</Radio>
      </Radio.Group>
    );
  },
};

//
// 禁用状态
//
export const Disabled: Story = {
  render: () => (
    <Radio.Group
      defaultValue="yes"
      disabled>
      <Radio value="yes">Yes</Radio>
      <Radio value="no">
        <Icon
          name="lock"
          size="sm"
        />
        No
      </Radio>
    </Radio.Group>
  ),
};

//
// 单独 Radio 被禁用
//
export const PartialDisabled: Story = {
  render: () => (
    <Radio.Group defaultValue="1">
      <Radio value="1">Active</Radio>
      <Radio
        value="2"
        disabled>
        Disabled
      </Radio>
    </Radio.Group>
  ),
};

//
// 按钮样式（RadioButton）
//
export const ButtonStyle: Story = {
  render: () => (
    <Radio.Group defaultValue="red">
      <Radio.Button value="red">Red</Radio.Button>
      <Radio.Button value="green">Green</Radio.Button>
      <Radio.Button value="blue">Blue</Radio.Button>
    </Radio.Group>
  ),
};

//
// 垂直排列
//
export const VerticalLayout: Story = {
  render: () => (
    <Radio.Group
      defaultValue="dog"
      direction="vertical">
      <Radio value="dog">Dog</Radio>
      <Radio value="cat">Cat</Radio>
      <Radio value="bird">Bird</Radio>
    </Radio.Group>
  ),
};

//
// 按钮风格 + 垂直排列
//
export const VerticalButtonStyle: Story = {
  render: () => (
    <Radio.Group
      defaultValue="small"
      direction="vertical">
      <Radio.Button value="small">Small</Radio.Button>
      <Radio.Button value="medium">Medium</Radio.Button>
      <Radio.Button value="large">Large</Radio.Button>
    </Radio.Group>
  ),
};
