import "./App.css";
import { YiButton, Anchor, Icon, Breadcrumb } from "./components/index";

function App() {

  return (
    <>
      <YiButton
        variant="warning"
        size="md">
        中文TEST
        <Icon
          name="arrow-bar-down"
          size="sm"
          color="#fff"
        />
      </YiButton>
      <div>
        <Icon
          name="lock"
          animation
          size="sm"
          color="#fff"
        />
      </div>

      <div>
        <Breadcrumb
          pixelSize={2}
          maxItems={5}>
          <Breadcrumb.Item
            icon="home"
            href="/">
            首页
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/category">分类</Breadcrumb.Item>
          <Breadcrumb.Item href="/category/detail">详情</Breadcrumb.Item>
          <Breadcrumb.Item>当前页面</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="documentation">
        <Anchor
          offsetTop={80}
          pixelSize={2}>
          <Anchor.Link
            href="introduction"
            title="介绍"
          />
          <Anchor.Link
            href="installation"
            title="安装指南">
            <Anchor.Link
              href="npm"
              title="NPM 安装"
            />
            <Anchor.Link
              href="yarn"
              title="Yarn 安装"
            />
          </Anchor.Link>
          <Anchor.Link
            href="usage"
            title="使用示例"
          />
          <Anchor.Link
            href="components"
            title="组件列表">
            <Anchor.Link
              href="button"
              title="按钮"
            />
            <Anchor.Link
              href="anchor"
              title="锚点"
            />
            <Anchor.Link
              href="card"
              title="卡片"
            />
          </Anchor.Link>
          <Anchor.Link
            href="customization"
            title="自定义主题"
          />
          <Anchor.Link
            href="faq"
            title="常见问题"
          />
          <Anchor.Link
            href="1"
            title="1"
          />
          <Anchor.Link
            href="1"
            title="1"
          />
          <Anchor.Link
            href="1"
            title="1"
          />
          <Anchor.Link
            href="1"
            title="1"
          />
          <Anchor.Link
            href="1"
            title="1"
          />
          <Anchor.Link
            href="1"
            title="1"
          />
          <Anchor.Link
            href="1"
            title="1"
          />
          <Anchor.Link
            href="1"
            title="1"
          />
          <Anchor.Link
            href="1"
            title="1"
          />
          <Anchor.Link
            href="1"
            title="1"
          />
          <Anchor.Link
            href="1"
            title="1"
          />
          <Anchor.Link
            href="1"
            title="1"
          />
          <Anchor.Link
            href="1"
            title="1"
          />
          <Anchor.Link
            href="1"
            title="1"
          />
          <Anchor.Link
            href="1"
            title="1"
          />
          <Anchor.Link
            href="1"
            title="1"
          />
          <Anchor.Link
            href="1"
            title="1"
          />
          <Anchor.Link
            href="1"
            title="1"
          />
        </Anchor>

        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px", color: "black"}}>
          <section
            id="introduction"
            style={{
              height: "600px",
              marginBottom: "40px",
              backgroundColor: "#f0f0f0",
              padding: "20px",
            }}>
            <div style={{fontSize: "24px"}}>介绍</div>
            <p>欢迎使用像素风格组件库...</p>
          </section>

          <section
            id="installation"
            style={{
              height: "600px",
              marginBottom: "40px",
              backgroundColor: "#f0f0f0",
              padding: "20px",
            }}>
            <h2>安装指南</h2>
            <div
              id="npm"
              style={{ height: "250px", marginBottom: "20px" }}>
              <h3>NPM 安装</h3>
              <code>npm install pixel-components</code>
            </div>
            <div
              id="yarn"
              style={{ height: "250px" }}>
              <h3>Yarn 安装</h3>
              <code>yarn add pixel-components</code>
            </div>
          </section>
          <section
            id="useExample"
            style={{
              height: "600px",
              marginBottom: "40px",
              backgroundColor: "#f0f0f0",
              padding: "20px",
            }}>
            <h2>使用示例</h2>
            <div
              id="usage"
              style={{ height: "250px", marginBottom: "20px" }}>
              <h3>这里是使用示例</h3>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default App;
