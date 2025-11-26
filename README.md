# 🤖 AI 自动化测试系统

> 基于 Chrome DevTools MCP 和 Browser Use 的智能化测试框架

## 项目简介

这是一个完整的 AI 驱动的自动化测试系统，用于测试**意大利餐厅管理系统**。项目展示了如何使用现代 AI 技术和浏览器自动化工具来实现智能化测试。

### 核心特性

- ✅ **AI 页面分析** - 自动分析页面结构、网络请求、控制台日志
- ✅ **智能测试生成** - AI 自动生成测试用例
- ✅ **自动化执行** - 基于 Chrome DevTools MCP 执行测试
- ✅ **性能监控** - Core Web Vitals、网络性能分析
- ✅ **可视化报告** - 精美的 HTML 测试报告
- ✅ **Browser Use 集成** - 支持自然语言测试(可选)

## 技术栈

### 前端项目
- **React 18** - UI 框架
- **Rspack** - 超快的打包工具
- **Ant Design** - UI 组件库
- **TypeScript** - 类型安全

### 测试框架
- **Chrome DevTools MCP** - 浏览器自动化(已集成)
- **Browser Use** - AI 自然语言测试(可选)
- **自定义 AI 测试引擎** - 智能分析和生成

## 项目结构

```
ai-test/
├── src/                        # 前端源码
│   ├── pages/                  # 页面组件
│   │   ├── Dashboard.tsx       # 仪表盘
│   │   ├── MenuManagement.tsx  # 菜单管理
│   │   ├── OrderManagement.tsx # 订单管理
│   │   ├── ReservationManagement.tsx # 预订管理
│   │   └── InventoryManagement.tsx   # 库存管理
│   ├── layouts/                # 布局组件
│   ├── App.tsx                 # 应用入口
│   └── index.tsx               # 渲染入口
├── tests/                      # 测试框架
│   ├── ai-analyzer.ts          # AI 页面分析器
│   ├── test-generator.ts       # 测试用例生成器
│   ├── test-runner.ts          # 测试执行引擎
│   ├── browser-use-integration.ts # Browser Use 集成
│   └── demo.ts                 # 演示脚本
├── package.json
├── rspack.config.ts
└── README.md
```

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 查看应用。

### 3. 生成测试用例

```bash
npm run generate-tests
```

这会自动分析所有页面并生成测试用例，保存到 `tests/generated-tests.json`。

### 4. 执行测试

```bash
npm run test
```

执行所有测试用例，生成报告到 `tests/test-report.html`。

### 5. 查看测试报告

在浏览器中打开 `tests/test-report.html` 查看详细的测试报告。

## 使用指南

### AI 页面分析

```bash
npm run analyze
```

AI 会自动分析页面并生成报告，包括:
- 页面结构(基于可访问性树)
- 网络请求分析
- 控制台错误和警告
- 可交互元素提取
- AI 洞察和建议

### 测试用例生成

系统会根据页面类型自动生成不同的测试用例:

- **仪表盘** - 数据显示、性能测试
- **菜单管理** - CRUD 操作、表单验证
- **订单管理** - 列表展示、详情查看
- **预订管理** - 预订流程、状态管理
- **库存管理** - 库存监控、预警测试

### Chrome DevTools MCP 使用

Chrome DevTools MCP 已集成，主要功能:

```typescript
// 1. 创建新页面
mcp_call_tool('chrome-devtools', 'new_page', {
  url: 'http://localhost:3000'
});

// 2. 获取页面快照
mcp_call_tool('chrome-devtools', 'take_snapshot', {
  verbose: true
});

// 3. 点击元素
mcp_call_tool('chrome-devtools', 'click', {
  uid: 'element-uid'
});

// 4. 填充表单
mcp_call_tool('chrome-devtools', 'fill', {
  uid: 'input-uid',
  value: '测试数据'
});

// 5. 执行 JavaScript
mcp_call_tool('chrome-devtools', 'evaluate_script', {
  function: '() => document.title'
});

// 6. 获取网络请求
mcp_call_tool('chrome-devtools', 'list_network_requests', {});

// 7. 性能追踪
mcp_call_tool('chrome-devtools', 'performance_start_trace', {
  reload: true,
  autoStop: true
});
```

### Browser Use 集成(可选)

如果想使用 AI 自然语言测试，可以安装 Browser Use:

```bash
npm install browser-use
```

然后使用自然语言编写测试:

```typescript
await browser.use("打开菜单管理页面");
await browser.use("点击添加菜品按钮");
await browser.use("在名称输入框输入'烟熏三文鱼披萨'");
await browser.use("点击确定按钮");
await browser.use("验证页面显示成功提示");
```

## 测试报告

测试完成后会生成两种格式的报告:

1. **JSON 报告** (`test-report.json`) - 机器可读，用于 CI/CD
2. **HTML 报告** (`test-report.html`) - 人类可读，包含:
   - 测试摘要(总数、通过、失败、通过率)
   - 可视化进度条
   - 详细的测试结果
   - 失败原因分析

## 项目演示

### 意大利餐厅管理系统功能

1. **仪表盘** - 实时查看营业数据
   - 今日营业额
   - 订单统计
   - 预订数量
   - 库存预警

2. **菜单管理** - 管理餐厅菜品
   - 添加/编辑/删除菜品
   - 分类管理(披萨、意面、甜点、饮品)
   - 价格和状态管理

3. **订单管理** - 处理客户订单
   - 订单列表查看
   - 订单详情
   - 状态跟踪

4. **预订管理** - 处理客户预订
   - 预订列表
   - 确认/取消预订

5. **库存管理** - 监控原料库存
   - 库存查看
   - 库存预警
   - 库存率可视化

## 技术亮点

### 1. AI 驱动的测试生成
系统会分析页面业务逻辑，自动生成针对性的测试用例，无需手动编写。

### 2. 基于可访问性树的分析
使用 Chrome 的 A11y 树进行页面分析，比传统 DOM 分析更适合 AI 理解。

### 3. 智能断言
测试用例包含多种类型的智能断言:
- 可见性断言
- 文本内容断言
- 元素数量断言
- 网络请求断言
- 性能指标断言

### 4. 性能监控
集成 Core Web Vitals 监控:
- LCP (Largest Contentful Paint)
- FID (First Input Delay)
- CLS (Cumulative Layout Shift)

### 5. 网络分析
自动分析所有网络请求:
- 慢请求检测
- 失败请求追踪
- 资源类型分析

## 最佳实践

### 测试策略

1. **优先级管理**
   - 高优先级: 核心业务流程
   - 中优先级: 常用功能
   - 低优先级: 边界场景

2. **分层测试**
   - UI 层: 页面渲染、交互
   - 功能层: 业务逻辑
   - 性能层: 加载速度、响应时间

3. **持续集成**
   - 在 CI/CD 中自动运行测试
   - 失败时发送通知
   - 生成趋势报告

## 框架对比

### Chrome DevTools MCP vs Browser Use

| 特性 | Chrome DevTools MCP | Browser Use |
|------|-------------------|-------------|
| 学习曲线 | 中等(需要编程) | 低(自然语言) |
| 控制精度 | 高 | 中 |
| 性能分析 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| 网络分析 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| AI 智能 | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 稳定性 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| 适用场景 | 性能测试、详细分析 | 快速验证、探索测试 |

### 推荐方案

**组合使用效果最佳**:
- Chrome DevTools MCP - 主力测试执行和分析
- Browser Use - 辅助快速验证和探索

## 常见问题

### Q: 如何在 CI/CD 中运行?
A: 在 CI 配置中添加:
```yaml
- npm install
- npm run build
- npm run test
```

### Q: 测试失败怎么办?
A: 查看 HTML 报告中的失败原因，包含详细的错误信息和步骤。

### Q: 如何添加自定义测试?
A: 编辑 `tests/test-generator.ts`，添加新的测试用例生成逻辑。

### Q: Browser Use 是必须的吗?
A: 不是，Chrome DevTools MCP 已经足够强大。Browser Use 是可选的增强。

## 贡献指南

欢迎贡献代码和想法！

## 许可证

MIT

## 联系方式

有问题或建议？欢迎提 Issue！

---

**Happy Testing! 🎉**
