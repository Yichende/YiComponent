import type { Meta, StoryObj } from "@storybook/react";
import { Anchor } from "./Anchor";
import "./Anchor.module.css";

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
        <Section id="others1" title="others" />
        <Section id="others2" title="others" />
        <Section id="others3" title="others" />
        <Section id="others4" title="others" />
        <Section id="others5" title="others" />
        <Section id="others6" title="others" />
        <Section id="others7" title="others" />
        <Section id="others8" title="others" />
        <Section id="others9" title="others" />
        <Section id="others10" title="others" />
        <Section id="others11" title="others" />
        <Section id="others12" title="others" />
        <Section id="others13" title="others" />
      </div>

      {/* 像素风 Anchor 导航 */}
      <Anchor offsetTop={20} pixelSize={3}>
        <Anchor.Link href="intro" title="Intro" />
        <Anchor.Link href="features" title="Features">
          <Anchor.Link href="usage" title="Usage" />
        </Anchor.Link>
        <Anchor.Link href="faq" title="FAQ" />
        <Anchor.Link href="others1" title="others1" />
        <Anchor.Link href="others2" title="others2" />
        <Anchor.Link href="others3" title="others3" />
        <Anchor.Link href="others4" title="others4" />
        <Anchor.Link href="others5" title="others5" />
        <Anchor.Link href="others6" title="others6" />
        <Anchor.Link href="others7" title="others7" />
        <Anchor.Link href="others8" title="others8" />
        <Anchor.Link href="others9" title="others9" />
        <Anchor.Link href="others10" title="others10" />
        <Anchor.Link href="others11" title="others11" />
        <Anchor.Link href="others12" title="others12" />
        <Anchor.Link href="others13" title="others13" />
      </Anchor>


    </div>
  ),
};

function Section({ id, title }: { id: string; title: string }) {
  return (
    <div id={id} style={{ height: "120vh", borderBottom: "1px solid #ccc", paddingTop: "60px" }}>
      <h2>{title}</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae
        vestibulum vestibulum. Cras venenatis euismod malesuada.
      </p>
    </div>
  );
}
