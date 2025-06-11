import { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb } from "./Breadcrumb";
import { BrowserRouter } from "react-router-dom";

const meta: Meta = {
  title: "Components/Breadcrumb",
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  render: () => (
    <Breadcrumb maxItems={4}>
      <Breadcrumb.Item icon="home" href="/">
        首页
      </Breadcrumb.Item>
      <Breadcrumb.Item icon="folder" href="/category">
        分类
      </Breadcrumb.Item>
      <Breadcrumb.Item href="/category/detail">详情</Breadcrumb.Item>
      <Breadcrumb.Item>当前页面</Breadcrumb.Item>
    </Breadcrumb>
  ),
};

export const OverflowMax1: Story = {
  render: () => (
    <Breadcrumb maxItems={1}>
      <Breadcrumb.Item icon="home" href="/">
        首页
      </Breadcrumb.Item>
      <Breadcrumb.Item icon="folder" href="/分类">
        分类
      </Breadcrumb.Item>
      <Breadcrumb.Item href="/分类/详情">详情</Breadcrumb.Item>
      <Breadcrumb.Item>当前页面</Breadcrumb.Item>
    </Breadcrumb>
  ),
};

export const OverflowMax2: Story = {
  render: () => (
    <Breadcrumb maxItems={2}>
      <Breadcrumb.Item icon="home" href="/">
        首页
      </Breadcrumb.Item>
      <Breadcrumb.Item icon="folder" href="/分类">
        分类
      </Breadcrumb.Item>
      <Breadcrumb.Item href="/分类/详情">详情</Breadcrumb.Item>
      <Breadcrumb.Item>当前页面</Breadcrumb.Item>
    </Breadcrumb>
  ),
};

export const OverflowMax3: Story = {
  render: () => (
    <Breadcrumb maxItems={3}>
      <Breadcrumb.Item icon="home" href="/">
        首页
      </Breadcrumb.Item>
      <Breadcrumb.Item icon="folder" href="/分类">
        分类
      </Breadcrumb.Item>
      <Breadcrumb.Item href="/分类/详情">详情</Breadcrumb.Item>
      <Breadcrumb.Item>当前页面</Breadcrumb.Item>
    </Breadcrumb>
  ),
};
