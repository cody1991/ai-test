# AI 自动化测试系统

基于 **Spec-kit** 规则和 **MCP (Model Context Protocol)** 的智能测试系统。

## 🎯 核心特性

- ✅ **自然语言驱动** - 用人话描述测试需求，AI 自动生成测试用例
- ✅ **自然语言执行** - 用人话告诉 AI 执行哪些测试
- ✅ **实时交互** - 测试过程中可以随时调整策略
- ✅ **智能调试** - 遇到问题 AI 自动分析并给出解决方案

## 📁 项目结构

```
ai-test/
├── web/                    # Web 应用（餐厅管理系统）
│   ├── src/               # React 源码
│   ├── public/            # 静态资源
│   └── package.json       # Web 依赖
│
├── specs/                  # Spec-kit 规则配置
│   ├── restaurant.spec.ts # 餐厅系统测试规则
│   └── README.md          # Spec 使用说明
│
├── tests/                  # 测试系统
│   ├── spec-generator.ts  # 测试用例生成器
│   ├── runner.ts          # 测试执行器
│   └── generated/         # AI 生成的测试用例
│
└── package.json           # 项目脚本
```

## 🚀 快速开始

### 1. 安装依赖

```bash
# 根目录安装
npm install

# Web 应用安装
cd web && npm install
```

### 2. 启动 Web 应用

```bash
npm run web:dev
```

访问 http://localhost:3000

### 3. 生成测试用例

```bash
# 测试菜单管理
npm run spec "测试菜单管理"

# 测试所有页面
npm run spec "测试所有页面"

# 测试特定功能
npm run spec "测试订单的添加和编辑功能"
```

### 4. 执行测试

```bash
npm test
```

### 4. 使用 AI 执行测试

在 IDE 中发送消息给 AI：

```
"请使用 MCP 工具执行 tests/generated/ 中的所有测试用例"
```

或者更灵活的方式：

```
"请测试一下能否成功添加一个名为'宫保鸡丁'的菜品"
"请执行菜单管理-添加菜品的测试"
```

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

```typescript
// specs/restaurant.spec.ts
export const restaurantSpec = [
  {
    name: '菜单管理',
    path: '/menu',
    description: '菜品的增删改查',
    features: [
      {
        name: '添加菜品',
        type: 'form',
        actions: [
          { name: '打开表单', selector: 'button:contains("添加")', expected: '弹出表单' },
          { name: '填写名称', selector: 'input[id*="name"]', input: '测试菜品', expected: '输入成功' },
          { name: '提交表单', selector: 'button[type="submit"]', expected: '添加成功' }
        ],
        validations: [
          { field: 'name', rules: ['required'], errorMessage: '请输入菜品名称' },
          { field: 'price', rules: ['required', 'number'], errorMessage: '请输入有效价格' }
        ]
      }
    ]
  }
];
```

## 🔧 工作流程

```
┌─────────────────┐
│  你的自然语言   │  "测试菜单管理的添加功能"
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Spec 规则     │  读取 restaurant.spec.ts
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  AI 生成器      │  生成 MCP 命令文件
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  你对 AI 说     │  "请执行这些测试"
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  AI 调用 MCP    │  自动化浏览器操作
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

### Q2: 和 Playwright/Selenium 有什么区别？

| 特性 | MCP 模式 | Playwright/Selenium |
|------|----------|---------------------|
| 驱动方式 | 自然语言 | 写代码 |
| 测试编写 | AI 自动生成 | 手动编写 |
| 测试执行 | 对 AI 说一句话 | 运行命令 |
| 灵活性 | 随时调整策略 | 需要修改代码 |
| 学习成本 | 0（会说话就会用） | 需要学习 API |

### Q3: 如何添加新页面的测试？

```typescript
// 1. 在 specs/restaurant.spec.ts 添加配置
{
  name: '新页面',
  path: '/new-page',
  features: [...]
}

// 2. 对 AI 说
"请测试新页面的所有功能"
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

## 🎉 开始使用

```bash
# 1. 启动 Web 应用
npm run web:dev

# 2. 生成测试用例
npm run spec "测试所有页面"

# 3. 在 IDE 中对 AI 说
"请使用 MCP 工具执行 tests/generated/ 中的所有测试用例"
```

---

**用自然语言描述需求，让 AI 完成测试！** 🚀
