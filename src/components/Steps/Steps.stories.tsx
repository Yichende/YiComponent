import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Steps } from './Steps';
import { Icon } from '../index';

const meta: Meta<typeof Steps> = {
  title: 'Components/Steps',
  component: Steps,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#333333' },
      ],
    },
  },
  argTypes: {
    current: {
      control: { type: 'number', min: 0 },
      description: '当前步骤索引（从0开始）',
    },
    direction: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: '步骤条方向',
    },
    status: {
      control: 'select',
      options: ['wait', 'process', 'finish', 'error'],
      description: '当前步骤状态',
    },
    size: {
      control: 'radio',
      options: ['default', 'small'],
      description: '组件尺寸',
    },
    children: {
      table: {
        disable: true,
      },
    },
    className: {
      table: {
        disable: true,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Steps>;

// 基础步骤条 - 水平方向
export const Horizontal: Story = {
  render: (args) => (
    <div style={{ width: '600px' }}>
      <Steps {...args}>
        <Steps.Step title="第一步" description="创建账户" />
        <Steps.Step title="第二步" description="验证邮箱" />
        <Steps.Step title="第三步" description="设置密码" />
        <Steps.Step title="完成" description="账户创建成功" />
      </Steps>
    </div>
  ),
  args: {
    current: 1,
    direction: 'horizontal',
    status: 'process',
  },
};

// 垂直方向步骤条
export const Vertical: Story = {
  render: (args) => (
    <div style={{ height: '300px' }}>
      <Steps {...args}>
        <Steps.Step title="第一步" description="选择产品" />
        <Steps.Step title="第二步" description="填写收货信息" />
        <Steps.Step title="第三步" description="支付订单" />
        <Steps.Step title="完成" description="订单处理中" />
      </Steps>
    </div>
  ),
  args: {
    current: 0,
    direction: 'vertical',
  },
};

// 自定义图标步骤条
export const WithCustomIcons: Story = {
  render: (args) => (
    <div style={{ width: '600px' }}>
      <Steps {...args}>
        <Steps.Step 
          title="购物车"
          icon={<Icon name="cart" size="sm" color='#333'/>} 
        />
        <Steps.Step 
          title="付款" 
          icon={<Icon name="credit-card" size="sm" color='#333'/>} 
        />
        <Steps.Step 
          title="发货" 
          icon={<Icon name="truck" size="sm" color='#333'/>} 
        />
        <Steps.Step 
          title="完成" 
          icon={<Icon name="check" size="sm" color='#333'/>} 
        />
      </Steps>
    </div>
  ),
  args: {
    current: 1,
  },
};

// 错误状态步骤条
export const WithError: Story = {
  render: (args) => (
    <div style={{ width: '600px' }}>
      <Steps {...args}>
        <Steps.Step title="第一步" description="上传文件" />
        <Steps.Step title="第二步" description="处理数据" />
        <Steps.Step title="第三步" description="验证结果" status="error" />
        <Steps.Step title="完成" description="导出报告" />
      </Steps>
    </div>
  ),
  args: {
    current: 2,
    status: 'error',
  },
};

// 小尺寸步骤条
export const SmallSize: Story = {
  render: (args) => (
    <div style={{ width: '500px' }}>
      <Steps {...args}>
        <Steps.Step title="分析需求" />
        <Steps.Step title="设计原型" />
        <Steps.Step title="开发实现" />
        <Steps.Step title="测试验收" />
        <Steps.Step title="部署上线" />
      </Steps>
    </div>
  ),
  args: {
    current: 3,
    size: 'small',
  },
};

// 可交互步骤条
export const Interactive: Story = {
  render: (args) => {
    const [current, setCurrent] = useState(0);
    
    return (
      <div style={{ width: '600px' }}>
        <Steps {...args} current={current}>
          <Steps.Step title="选择计划" description="选择适合您的套餐" />
          <Steps.Step title="账户信息" description="填写基本信息" />
          <Steps.Step title="付款" description="完成支付" />
          <Steps.Step title="完成" description="开通服务" />
        </Steps>
        
        <div style={{ 
          marginTop: '30px', 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '15px' 
        }}>
          <button 
            onClick={() => setCurrent(Math.max(0, current - 1))}
            disabled={current === 0}
            style={{
              padding: '8px 16px',
              background: '#4a90e2',
              color: 'white',
              border: '2px solid #000',
              boxShadow: '3px 3px 0 #2c6cb0',
              fontFamily: '"Press Start 2P", "Ark Pixel", monospace',
              fontSize: '12px',
              cursor: 'pointer',
            }}
          >
            上一步
          </button>
          <button 
            onClick={() => setCurrent(Math.min(3, current + 1))}
            disabled={current === 3}
            style={{
              padding: '8px 16px',
              background: '#4a90e2',
              color: 'white',
              border: '2px solid #000',
              boxShadow: '3px 3px 0 #2c6cb0',
              fontFamily: '"Press Start 2P", "Ark Pixel", monospace',
              fontSize: '12px',
              cursor: 'pointer',
            }}
          >
            下一步
          </button>
          <button 
            onClick={() => setCurrent(0)}
            style={{
              padding: '8px 16px',
              background: '#f5f5f5',
              color: '#333',
              border: '2px solid #000',
              boxShadow: '3px 3px 0 #ccc',
              fontFamily: '"Press Start 2P", "Ark Pixel", monospace',
              fontSize: '12px',
              cursor: 'pointer',
            }}
          >
            重置
          </button>
        </div>
        
        <div style={{ 
          marginTop: '20px', 
          textAlign: 'center', 
          fontFamily: '"Press Start 2P", "Ark Pixel", monospace',
          fontSize: '12px',
        }}>
          当前步骤: {current + 1} / 4
        </div>
      </div>
    );
  },
  args: {
    direction: 'horizontal',
  },
};

// 不同状态组合
export const MixedStatus: Story = {
  render: (args) => (
    <div style={{ width: '600px' }}>
      <Steps {...args}>
        <Steps.Step 
          title="已完成" 
          description="任务已完成" 
          status="finish" 
        />
        <Steps.Step 
          title="进行中" 
          description="当前步骤" 
          status="process" 
        />
        <Steps.Step 
          title="等待中" 
          description="尚未开始" 
          status="wait" 
        />
        <Steps.Step 
          title="错误" 
          description="步骤出错" 
          status="error" 
        />
      </Steps>
    </div>
  ),
  args: {
    current: 1,
  },
};

// 长描述步骤条
export const WithLongDescriptions: Story = {
  render: (args) => (
    <div style={{ width: '600px' }}>
      <Steps {...args} direction="vertical">
        <Steps.Step 
          title="需求收集" 
          description="与客户沟通，收集项目需求，确定项目目标和范围，制定初步计划。" 
        />
        <Steps.Step 
          title="设计阶段" 
          description="创建系统架构图，设计用户界面原型，确定技术栈和开发工具。" 
        />
        <Steps.Step 
          title="开发实现" 
          description="编写代码实现功能模块，进行单元测试，集成各模块功能。" 
        />
        <Steps.Step 
          title="测试部署" 
          description="进行系统测试和用户验收测试，修复问题，部署到生产环境。" 
        />
      </Steps>
    </div>
  ),
  args: {
    current: 1,
  },
};

// 深色背景适配
export const OnDarkBackground: Story = {
  render: (args) => (
    <div style={{ 
      width: '600px', 
      backgroundColor: '#333', 
      padding: '20px',
      borderRadius: '4px'
    }}>
      <Steps {...args}>
        <Steps.Step title="第一步" description="开始项目" />
        <Steps.Step title="第二步" description="开发阶段" />
        <Steps.Step title="第三步" description="测试阶段" />
        <Steps.Step title="完成" description="项目交付" />
      </Steps>
    </div>
  ),
  args: {
    current: 1,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};