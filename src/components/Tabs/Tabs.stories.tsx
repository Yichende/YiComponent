import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "./Tabs";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
};
export default meta;

type Story = StoryObj<typeof Tabs>;

const Content = (text: string) => (
  <div style={{ padding: 16 }}>
    <h3>{text}</h3>
    <p>这是一个标签页的内容展示。</p>
  </div>
);

// ===== 1. 基础用法 =====
export const Basic: Story = {
  render: () => (
    <Tabs defaultActiveKey="1">
      <Tabs.TabPane
        tab="标签一"
        key="1">
        {Content("标签一")}
      </Tabs.TabPane>
      <Tabs.TabPane
        tab="标签二"
        key="2">
        {Content("标签二")}
      </Tabs.TabPane>
    </Tabs>
  ),
};

// ===== 2. 带图标 =====
export const WithIcon: Story = {
  render: () => (
    <Tabs defaultActiveKey="1">
      <Tabs.TabPane
        tab="主页"
        key="1"
        icon="home">
        {Content("主页")}
      </Tabs.TabPane>
      <Tabs.TabPane
        tab="设置"
        key="2">
        {Content("设置")}
      </Tabs.TabPane>
    </Tabs>
  ),
};

// ===== 3. 禁用某项 =====
export const Disabled: Story = {
  render: () => (
    <Tabs defaultActiveKey="1">
      <Tabs.TabPane
        tab="启用标签"
        key="1">
        {Content("启用标签")}
      </Tabs.TabPane>
      <Tabs.TabPane
        tab="禁用标签"
        key="2"
        disabled>
        {Content("禁用标签")}
      </Tabs.TabPane>
    </Tabs>
  ),
};

// ===== 4. 卡片样式 =====
export const CardType: Story = {
  render: () => (
    <Tabs
      defaultActiveKey="1"
      type="card">
      <Tabs.TabPane
        tab="卡片一"
        key="1">
        {Content("卡片一")}
      </Tabs.TabPane>
      <Tabs.TabPane
        tab="卡片二"
        key="2">
        {Content("卡片二")}
      </Tabs.TabPane>
    </Tabs>
  ),
};

// ===== 5. 小尺寸 =====
export const SmallSize: Story = {
  render: () => (
    <Tabs
      defaultActiveKey="1"
      size="small">
      <Tabs.TabPane
        tab="小标签一"
        key="1">
        {Content("小标签一")}
      </Tabs.TabPane>
      <Tabs.TabPane
        tab="小标签二"
        key="2">
        {Content("小标签二")}
      </Tabs.TabPane>
    </Tabs>
  ),
};

// ===== 6. 四个方向 =====
export const Positions: Story = {
  render: () => (
    <div
      style={{ display: "grid",gridTemplateColumns: '80vw', gap: "24px" }}>
      <Tabs
        defaultActiveKey="1"
        tabPosition="top">
        <Tabs.TabPane
          tab="顶部1"
          key="1">
          {Content("顶部")}
        </Tabs.TabPane>
        <Tabs.TabPane
          tab="顶部2"
          key="2">
          {Content("顶部")}
        </Tabs.TabPane>
      </Tabs>

      <Tabs
        defaultActiveKey="1"
        tabPosition="bottom">
        <Tabs.TabPane
          tab="底部1"
          key="1">
          {Content("底部")}
        </Tabs.TabPane>
        <Tabs.TabPane
          tab="底部2"
          key="2">
          {Content("底部")}
        </Tabs.TabPane>
      </Tabs>

      <Tabs
        defaultActiveKey="1"
        tabPosition="left">
        <Tabs.TabPane
          tab="左侧1"
          key="1">
          {Content("左侧")}
        </Tabs.TabPane>
        <Tabs.TabPane
          tab="左侧2"
          key="2">
          {Content("左侧")}
        </Tabs.TabPane>
      </Tabs>

      <Tabs
        defaultActiveKey="1"
        tabPosition="right">
        <Tabs.TabPane
          tab="右侧1"
          key="1">
          {Content("右侧")}
        </Tabs.TabPane>
        <Tabs.TabPane
          tab="右侧2"
          key="2">
          {Content("右侧")}
        </Tabs.TabPane>
      </Tabs>
    </div>
  ),
};

// ===== 7. 超长标签滚动 + hover 溢出提示 =====
export const ScrollableOverflow: Story = {
  render: () => (
    <div style={{width: "80vw"}}>
      <Tabs
        defaultActiveKey="1"
        type="line"
        tabPosition="top">
        {Array.from({ length: 12 }).map((_, i) => (
          <Tabs.TabPane
            key={String(i + 1)}
            tab={`这是一个非常非常长的标签 ${i + 1}`}>
            {Content(`标签 ${i + 1}`)}
          </Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  ),
};

// ===== 8. 居中模式 =====
export const Centered: Story = {
  render: () => (
    <Tabs
      defaultActiveKey="1"
      centered>
      <Tabs.TabPane
        tab="中心一"
        key="1">
        {Content("中心一")}
      </Tabs.TabPane>
      <Tabs.TabPane
        tab="中心二"
        key="2">
        {Content("中心二")}
      </Tabs.TabPane>
    </Tabs>
  ),
};
