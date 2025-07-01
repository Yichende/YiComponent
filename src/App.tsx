import { useState } from "react";
import "./App.css";
import {
  YiButton,
  Anchor,
  Icon,
  Breadcrumb,
  Menu,
  Pagination,
  Steps,
  Tabs,
  Radio,
} from "./components/index";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const totalItems = 87;
  const [activeTab, setActiveTab] = useState("1");

  const handlePageChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
    console.log(`Page changed to: ${page}, Page size: ${size}`);
  };

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    console.log(`切换到标签页: ${key}`);
  };

  return (
    <>
      <Menu
        mode="horizontal"
        pixelSize={2}>
        <Menu.Item icon="home">首页</Menu.Item>
        <Menu.SubMenu
          title="项目"
          icon="folder">
          <Menu.Item icon="game">游戏开发</Menu.Item>
          <Menu.Item icon="web">网站设计</Menu.Item>
          <Menu.Item icon="mobile">移动应用</Menu.Item>
          <Menu.Item icon="game">游戏开发</Menu.Item>
          <Menu.Item icon="web">网站设计</Menu.Item>
          <Menu.Item icon="mobile">移动应用</Menu.Item>
          <Menu.Item icon="game">游戏开发</Menu.Item>
          <Menu.Item icon="web">网站设计</Menu.Item>
          <Menu.Item icon="mobile">移动应用</Menu.Item>
          <Menu.Item icon="game">游戏开发</Menu.Item>
          <Menu.Item icon="web">网站设计</Menu.Item>
          <Menu.Item icon="mobile">移动应用</Menu.Item>
          <Menu.Item icon="game">游戏开发</Menu.Item>
          <Menu.Item icon="web">网站设计</Menu.Item>
          <Menu.Item icon="mobile">移动应用</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu
          title="资源"
          icon="file">
          <Menu.Item icon="image">图片素材</Menu.Item>
          <Menu.Item icon="music">音频资源</Menu.Item>
          <Menu.Item icon="code">代码片段</Menu.Item>
        </Menu.SubMenu>
        <Menu.Item>设置</Menu.Item>
        <Menu.Item icon="user">个人中心</Menu.Item>
      </Menu>
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

      <Radio.Group direction="vertical">
        <Radio.Button value="apple">苹果</Radio.Button>
        <Radio.Button value="banana">香蕉</Radio.Button>
        <Radio.Button value="orange">橙子</Radio.Button>
        <Radio.Button
          value="grape"
          disabled>
          葡萄
          <Icon
            name="lock"
            size="sm"
          />
        </Radio.Button>
      </Radio.Group>

      <Steps current={2}>
        <Steps.Step
          title="第一步"
          description="完成基本信息填写"
        />
        <Steps.Step
          title="第二步"
          description="验证账户信息"
        />
        <Steps.Step
          title="第三步"
          description="设置偏好选项"
        />
        <Steps.Step
          title="完成"
          description="创建账户成功"
        />
      </Steps>

      <Pagination
        current={currentPage}
        total={totalItems}
        pageSize={pageSize}
        onChange={handlePageChange}
        showSizeChanger
        showQuickJumper
      />
      <div style={{ display: "inline", minWidth: "70vw", height: "40vh" }}>
        <Tabs
          activeKey={activeTab}
          onChange={handleTabChange}
          tabPosition="top"
          type="line">
          <Tabs.TabPane
            tab="标签一"
            key="1">
            <div className="tab-content">
              <h3>标签一内容</h3>
              <p>这是第一个标签页的内容，展示了基本的像素风格设计。</p>
              <div className="pixel-grid">
                {[...Array(16)].map((_, i) => (
                  <div
                    key={i}
                    className="pixel"
                  />
                ))}
              </div>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane
            tab="标签二"
            key="2">
            <div>
              <h3>标签二内容</h3>
              <p>这是第二个标签页的内容，包含一些像素艺术元素。</p>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane
            tab="禁用标签"
            key="3"
            disabled>
            <div className="tab-content">
              <h3>禁用标签内容</h3>
              <p>这个标签页被禁用了，无法点击。</p>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane
            tab="Test"
            key="4">
            <div>
              <h3>溢出测试</h3>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane
            tab="Test"
            key="5">
            <div>
              <h3>溢出测试</h3>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane
            tab="Test"
            key="6">
            <div>
              <h3>溢出测试</h3>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane
            tab="Test"
            key="7">
            <div>
              <h3>溢出测试</h3>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane
            tab="Test"
            key="8">
            <div>
              <h3>溢出测试</h3>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane
            tab="Test"
            key="9">
            <div>
              <h3>溢出测试</h3>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane
            tab="Test"
            key="10">
            <div>
              <h3>溢出测试</h3>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane
            tab="Test"
            key="11">
            <div>
              <h3>溢出测试</h3>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane
            tab="Test"
            key="12">
            <div>
              <h3>溢出测试</h3>
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>

      <div style={{ display: "inline" }}>
        <Breadcrumb
          pixelSize={2}
          maxItems={2}>
          <Breadcrumb.Item
            icon="home"
            href="/">
            首页
          </Breadcrumb.Item>
          <Breadcrumb.Item
            icon="home"
            href="/category">
            分类
          </Breadcrumb.Item>
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

        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "20px",
          }}>
          <section
            id="introduction"
            style={{
              height: "600px",
              marginBottom: "40px",
              backgroundColor: "#f0f0f0",
              padding: "20px",
            }}>
            <h1>介绍</h1>
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
              <div>TEST COLOR</div>
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
