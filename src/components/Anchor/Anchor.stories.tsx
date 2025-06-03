import type { Meta, StoryObj } from "@storybook/react";
import { Anchor } from "./Anchor";
import "./Anchor.module.css"; // 确保 Storybook 能读取样式

const meta: Meta<typeof Anchor> = {
  title: "Components/Anchor",
  component: Anchor,
};

export default meta;
type Story = StoryObj<typeof Anchor>;

export const PixelStyleAnchor: Story = {
  render: () => (
    <div style={{ padding: "40px", fontFamily: "'Ark Pixel', 'Press Start 2P', monospace" }}>
      {/* 模拟页面内容 */}
      <div style={{ width: "60%", margin: "0 auto" }}>
        <Section id="intro" title="Intro" />
        <Section id="features" title="Features" />
        <Section id="usage" title="Usage" />
        <Section id="faq" title="FAQ" />
        <Section id="contact" title="Contact" />
      </div>

      {/* 像素风 Anchor 导航 */}
      <Anchor offsetTop={20} pixelSize={3}>
        <Anchor.Link href="intro" title="Intro" />
        <Anchor.Link href="features" title="Features">
          <Anchor.Link href="usage" title="Usage" />
        </Anchor.Link>
        <Anchor.Link href="faq" title="FAQ" />
        <Anchor.Link href="contact" title="Contact" />
      </Anchor>
    </div>
  ),
};

function Section({ id, title }: { id: string; title: string }) {
  return (
    <div id={id} style={{ height: "100vh", borderBottom: "1px solid #ccc", paddingTop: "60px" }}>
      <h2>{title}</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae
        vestibulum vestibulum. Cras venenatis euismod malesuada.
      </p>
    </div>
  );
}
