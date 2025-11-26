# AI 自动化测试系统

基于 **Spec-kit** 规则和 **MCP (Model Context Protocol)** 的智能测试系统。

## 🎯 核心特性

- ✅ **直接读取 Spec** - 不需要转换工具，AI 直接理解 Spec 规则
- ✅ **智能元素定位** - 不写 selector，用自然语言描述元素，AI 自动查找
- ✅ **自然语言执行** - 用人话告诉 AI 执行哪些测试
- ✅ **实时交互** - 测试过程中可以随时调整策略
- ✅ **零维护成本** - 页面改动不影响测试，AI 自动适配

## 📁 项目结构

```
ai-test/
├── web/                    # Web 应用（餐厅管理系统）
│   ├── src/               # React 源码
│   ├── public/            # 静态资源
│   └── package.json       # Web 依赖
│
├── specs/                  # Spec-kit 规则配置
│   └── restaurant.spec.ts # 餐厅系统测试规则（唯一真实来源）
│
└── package.json           # 项目脚本
```

## 🚀 快速开始

### 1. 安装依赖

```bash
# Web 应用安装
cd web && npm install
```

### 2. 启动 Web 应用

```bash
npm run web:dev
```

访问 http://localhost:3000

### 3. 直接对 AI 说测试需求

**不需要生成测试用例**，直接在 IDE 中对 AI 说：

```
"请测试菜单管理的添加菜品功能"
"请测试订单管理的所有功能"
"请测试一下能否成功添加一个名为'宫保鸡丁'的菜品"
```

AI 会：
1. 自动读取 `specs/restaurant.spec.ts`
2. 理解你要测试的功能
3. 调用 MCP 工具执行测试
4. 给出测试结果

## 🎓 使用示例

### 场景 1: 测试登录流程

**传统方式**（需要写死测试代码）：
```typescript
test('登录测试', async () => {
  await page.goto('/login');
  await page.fill('#username', 'admin');
  await page.fill('#password', '123456');
  await page.click('#submit');
  // ... 更多代码
});
```

**AI + MCP 方式**（只需自然语言）：
```
你: "帮我测试一下登录功能"

AI: 读取 login.spec.ts 规则
    → 生成测试用例
    → 自动调用 MCP 工具
    → 打开浏览器、填写表单、验证结果
    → 输出测试报告
```

### 场景 2: 大型功能测试

**你开发了一个复杂的订单管理模块**：
- 订单列表（分页、筛选、排序）
- 创建订单（表单验证、金额计算）
- 订单详情（状态流转、备注）

**传统方式**：需要写 50+ 个测试用例

**AI + MCP 方式**：
```bash
# 1. 定义 Spec 规则（一次性）
编辑 specs/order.spec.ts

# 2. 在 IDE 中发送
"请测试订单管理的所有功能"
```

AI 自动生成并执行覆盖所有场景的测试！

## 📖 Spec-kit 规则示例

**不用写 CSS Selector！用自然语言描述操作：**

```typescript
// specs/restaurant.spec.ts
export const restaurantSpec = [
  {
    name: '菜单管理',
    path: '/menu',
    features: [
      {
        name: '添加菜品',
        actions: [
          { name: '打开表单', target: '点击"添加菜品"按钮', expected: '弹出表单' },
          { name: '填写名称', target: '在菜品名称输入框中输入', input: '测试菜品', expected: '输入成功' },
          { name: '填写价格', target: '在价格输入框中输入', input: '99', expected: '输入成功' },
          { name: '提交', target: '点击确定按钮', expected: '添加成功' }
        ],
        validations: [
          { field: 'name', rules: ['required'], errorMessage: '请输入菜品名称' }
        ]
      }
    ]
  }
];
```

**对比传统方式**：
```typescript
// ❌ 传统：需要写复杂的 selector
{ selector: 'button.ant-btn-primary:contains("添加")' }
{ selector: 'input[id*="name"][placeholder*="请输入"]' }

// ✅ 智能：自然语言描述，AI 自动定位
{ target: '点击添加按钮' }
{ target: '在名称输入框中输入' }
```

## 🔧 工作流程

```
┌─────────────────┐
│  你的自然语言   │  "测试菜单管理的添加功能"
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  AI 读取 Spec   │  直接读取 restaurant.spec.ts
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  AI 理解规则    │  解析 PageSpec、FeatureSpec、ActionSpec
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  AI 调用 MCP    │  自动化浏览器操作（实时定位元素）
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   测试报告      │  截图 + 日志 + 结果
└─────────────────┘
```

## 🛠️ 技术栈

- **前端**: React 18 + Rspack + Ant Design
- **测试协议**: MCP (Model Context Protocol)
- **浏览器控制**: Chrome DevTools Protocol
- **AI**: Cursor/Windsurf 等 AI 编程助手

## ❓ 常见问题

### Q1: 什么是 MCP？

MCP (Model Context Protocol) 是一个开放协议，让 AI 能够与浏览器交互。你无需写任何自动化代码，AI 会自动调用 MCP 工具操作浏览器。

### Q2: 不写 selector 怎么定位元素？

**传统方式**（脆弱）：
```typescript
selector: 'button.ant-btn-primary:nth-child(2)'  // 页面一改就失效
```

**智能方式**（稳定）：
```typescript
target: '点击确定按钮'  // AI 实时分析页面，智能查找
```

AI 执行时会：
1. 获取页面快照（所有元素）
2. 理解"确定按钮"的语义
3. 找到匹配的元素并操作

**优势**：
- ✅ 不需要学习 CSS Selector
- ✅ 动态元素自动适配
- ✅ 页面改动测试依然可用

### Q3: 和 Playwright/Selenium 有什么区别？

| 特性 | MCP 智能模式 | Playwright/Selenium |
|------|--------------|---------------------|
| 驱动方式 | 自然语言 | 写代码 |
| 元素定位 | AI 智能查找 | 手写 selector |
| 测试编写 | AI 自动生成 | 手动编写 |
| 测试执行 | 对 AI 说一句话 | 运行命令 |
| 维护成本 | 几乎为零 | 页面改动需更新 |
| 学习成本 | 0（会说话就行） | 需要学习 API |

### Q3: 如何添加新页面的测试？

```typescript
// 1. 在 specs/restaurant.spec.ts 添加配置（用自然语言）
{
  name: '新页面',
  path: '/new-page',
  features: [
    {
      name: '新功能',
      actions: [
        { target: '点击新按钮', expected: '...' },  // 不用写 selector！
        { target: '在输入框中输入', input: '...', expected: '...' }
      ]
    }
  ]
}

// 2. 直接对 AI 说
"请测试新页面的所有功能"

// AI 会自动读取 Spec 并执行！
```

### Q4: 测试失败了怎么办？

直接问 AI：
```
"刚才的测试失败了，帮我看看是什么问题"
```

AI 会：
- 分析失败截图
- 检查网络请求
- 查看控制台错误
- 给出解决方案

## 💡 智能化核心优势

### 1. 告别 Selector 地狱

**传统痛点**：
```typescript
// 😫 难写、难维护、容易失效
selector: 'div.ant-modal-wrap div.ant-modal-content div.ant-modal-footer button.ant-btn-primary:nth-child(2)'
```

**智能方案**：
```typescript
// 😊 简单、稳定、易维护
target: '在弹窗中点击确定按钮'
```

### 2. 动态元素自动适配

**场景**：后端返回的动态 ID/Class

**传统方式**：
```typescript
// ❌ 失效：ID 每次都变
selector: '#item-12345'

// ❌ 失效：Class 变了
selector: '.dynamic-class-abc123'
```

**智能方式**：
```typescript
// ✅ AI 理解语义，自动找到元素
target: '点击第一行的编辑按钮'
```

### 3. 零维护成本

**场景**：UI 重构（按钮位置、样式改变）

**传统方式**：
```typescript
// 需要更新所有测试的 selector 😫
```

**智能方式**：
```typescript
// 完全不用改！AI 自动适配 😊
```

## 🎉 开始使用

```bash
# 1. 启动 Web 应用
npm run web:dev

# 2. 在 IDE 中直接对 AI 说
"请测试菜单管理的所有功能"
"请测试能否成功添加菜品"
```

---

**只需写 Spec + 对 AI 说需求，自动完成测试！** 🚀
