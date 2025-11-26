# 🏗️ AI 自动化测试系统 - 架构设计

## 系统概览

```
┌─────────────────────────────────────────────────────────────┐
│                   AI 自动化测试系统                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────┐        ┌────────────────┐              │
│  │  意大利餐厅     │   →   │  AI 页面分析器  │              │
│  │  管理系统       │        │  (ai-analyzer)  │              │
│  │  (React App)   │        └────────────────┘              │
│  └────────────────┘               ↓                         │
│                            ┌────────────────┐               │
│                            │  AI 测试生成器  │               │
│                            │(test-generator) │               │
│                            └────────────────┘               │
│                                   ↓                          │
│                            ┌────────────────┐               │
│                            │  测试执行引擎   │               │
│                            │  (test-runner)  │               │
│                            └────────────────┘               │
│                                   ↓                          │
│                            ┌────────────────┐               │
│                            │   测试报告      │               │
│                            │ (HTML/JSON)     │               │
│                            └────────────────┘               │
│                                                              │
└─────────────────────────────────────────────────────────────┘

         ┌──────────────────────┐    ┌──────────────────────┐
         │ Chrome DevTools MCP  │    │    Browser Use       │
         │   (已集成,主力)      │    │   (可选,辅助)        │
         └──────────────────────┘    └──────────────────────┘
```

## 核心组件

### 1. 前端应用层 (src/)

**意大利餐厅管理系统**

```
src/
├── pages/                      # 业务页面
│   ├── Dashboard.tsx           # 仪表盘 - 数据概览
│   ├── MenuManagement.tsx      # 菜单管理 - CRUD
│   ├── OrderManagement.tsx     # 订单管理 - 列表查看
│   ├── ReservationManagement.tsx # 预订管理 - 预订处理
│   └── InventoryManagement.tsx # 库存管理 - 库存监控
├── layouts/
│   └── MainLayout.tsx          # 主布局 - 侧边栏导航
├── App.tsx                     # 应用路由
└── index.tsx                   # 应用入口
```

**技术栈:**
- React 18 + TypeScript
- Ant Design 5.x (UI 组件)
- React Router 6 (路由)
- Rspack (超快打包)

---

### 2. AI 测试框架层 (tests/)

#### 2.1 AI 页面分析器 (ai-analyzer.ts)

**职责:** 自动分析页面结构和性能

```typescript
class AIPageAnalyzer {
  // 核心方法
  analyzePage(url)              // 分析页面
  getPageSnapshot()              // 获取页面快照
  analyzeNetwork()               // 分析网络请求
  analyzeConsole()               // 分析控制台
  extractInteractions()          // 提取交互元素
  generateAIInsights()           // 生成 AI 洞察
  generateReport()               // 生成分析报告
}
```

**数据流:**
```
URL → 页面访问 → 快照获取 → 网络分析 → 控制台分析 → AI 洞察 → 报告
```

**输出:**
```json
{
  "snapshot": {
    "url": "...",
    "elements": [...],
    "structure": "..."
  },
  "network": {
    "totalRequests": 45,
    "slowRequests": [...],
    "failedRequests": [...]
  },
  "console": {
    "errors": [...],
    "warnings": [...]
  },
  "aiInsights": [
    "发现 3 个慢请求",
    "发现 2 个控制台错误"
  ]
}
```

---

#### 2.2 AI 测试生成器 (test-generator.ts)

**职责:** 基于页面分析自动生成测试用例

```typescript
class AITestGenerator {
  // 核心方法
  generateTestCases(url, type)   // 生成测试用例
  generateDashboardTests()       // 仪表盘测试
  generateMenuTests()            // 菜单测试
  generateOrderTests()           // 订单测试
  generateReservationTests()     // 预订测试
  generateInventoryTests()       // 库存测试
  generateTestSuite()            // 生成完整测试套件
}
```

**测试用例结构:**
```typescript
interface TestCase {
  id: string;                    // 唯一标识
  name: string;                  // 测试名称
  description: string;           // 描述
  steps: TestStep[];             // 测试步骤
  assertions: Assertion[];       // 断言
  priority: 'high'|'medium'|'low'; // 优先级
  category: string;              // 分类
}
```

**生成策略:**
```
页面类型识别 → 业务逻辑分析 → 测试场景设计 → 测试步骤生成 → 断言设计
```

---

#### 2.3 测试执行引擎 (test-runner.ts)

**职责:** 执行测试用例并收集结果

```typescript
class AITestRunner {
  // 核心方法
  runTest(testCase)              // 执行单个测试
  runTestSuite(testCases)        // 执行测试套件
  executeStep(step)              // 执行测试步骤
  executeAssertion(assertion)    // 执行断言
  generateHTMLReport(report)     // 生成 HTML 报告
  saveReport(report)             // 保存报告
}
```

**执行流程:**
```
读取测试用例 → 执行步骤 → 验证断言 → 收集结果 → 生成报告
```

**支持的操作:**
- navigate - 导航到 URL
- click - 点击元素
- fill - 填充表单
- wait - 等待
- screenshot - 截图

**支持的断言:**
- visible - 元素可见性
- text - 文本内容
- count - 元素数量
- network - 网络请求
- performance - 性能指标

---

#### 2.4 Browser Use 集成 (browser-use-integration.ts)

**职责:** AI 自然语言测试(可选)

```typescript
class BrowserUseRunner {
  // 核心方法
  runNaturalLanguageTest(steps)  // 自然语言测试
  analyzePageWithAI(url)         // AI 页面分析
  generateTestScenarios(url)     // 生成测试场景
  smartAssert(expectation)       // 智能断言
}
```

**自然语言示例:**
```typescript
await runner.runNaturalLanguageTest([
  "打开菜单管理页面",
  "点击添加菜品按钮",
  "输入菜品名称为'披萨'",
  "点击确定",
  "验证显示成功"
]);
```

---

### 3. 浏览器自动化层

#### 3.1 Chrome DevTools MCP (主力)

**已集成,开箱即用**

**核心能力:**
```
┌─────────────────────────────────┐
│    Chrome DevTools MCP          │
├─────────────────────────────────┤
│ ✓ 页面导航                      │
│ ✓ 元素交互(点击、填充)          │
│ ✓ JavaScript 执行               │
│ ✓ 页面快照(A11y 树)             │
│ ✓ 网络请求分析                  │
│ ✓ 控制台消息                    │
│ ✓ 性能追踪(Core Web Vitals)    │
│ ✓ 截图                          │
└─────────────────────────────────┘
```

**使用示例:**
```typescript
// 1. 创建页面
await mcp_call_tool('chrome-devtools', 'new_page', {
  url: 'http://localhost:3000'
});

// 2. 获取快照
const snapshot = await mcp_call_tool('chrome-devtools', 'take_snapshot', {
  verbose: true
});

// 3. 点击元素
await mcp_call_tool('chrome-devtools', 'click', {
  uid: 'element-uid'
});

// 4. 性能分析
await mcp_call_tool('chrome-devtools', 'performance_start_trace', {
  reload: true,
  autoStop: true
});
```

---

#### 3.2 Browser Use (可选辅助)

**需要安装: `npm install browser-use`**

**优势:**
```
┌─────────────────────────────────┐
│       Browser Use               │
├─────────────────────────────────┤
│ ✓ AI 自然语言控制               │
│ ✓ 自动理解页面结构              │
│ ✓ 智能错误恢复                  │
│ ✓ 无需写选择器                  │
│ ✓ 自适应页面变化                │
└─────────────────────────────────┘
```

---

## 数据流设计

### 完整测试流程

```
1. 页面开发
   └─> src/pages/*.tsx

2. AI 分析
   └─> ai-analyzer.ts
       ├─> 页面快照(A11y 树)
       ├─> 网络请求分析
       ├─> 控制台分析
       └─> AI 洞察生成

3. 测试生成
   └─> test-generator.ts
       ├─> 识别页面类型
       ├─> 分析业务逻辑
       ├─> 生成测试步骤
       └─> 设计断言
       └─> 输出: generated-tests.json

4. 测试执行
   └─> test-runner.ts
       ├─> 读取测试用例
       ├─> 调用 MCP 工具
       ├─> 执行测试步骤
       ├─> 验证断言
       └─> 收集结果

5. 报告生成
   └─> test-runner.ts
       ├─> 生成 JSON 报告
       └─> 生成 HTML 报告
```

---

## 技术决策

### 为什么选择 Chrome DevTools MCP?

✅ **优势:**
1. 官方 Chrome DevTools Protocol
2. 性能分析能力强大(Core Web Vitals)
3. 网络请求分析详细
4. A11y 树对 AI 友好
5. 稳定可靠

❌ **劣势:**
1. API 相对底层
2. 需要编程知识
3. 只支持 Chrome

### 为什么集成 Browser Use?

✅ **优势:**
1. 自然语言,学习成本低
2. AI 自动理解页面
3. 智能错误恢复
4. 适合快速验证

❌ **劣势:**
1. 较新,生态较小
2. 消耗 AI Token
3. 精细控制不如 DevTools

### 推荐组合

```
主力: Chrome DevTools MCP
├─> 详细分析
├─> 性能测试
├─> 网络监控
└─> 稳定回归测试

辅助: Browser Use
├─> 快速探索
├─> 智能验证
└─> 自然语言测试
```

---

## 扩展性设计

### 添加新的测试类型

```typescript
// test-generator.ts
private generateCustomTests(url: string): TestCase[] {
  return [
    {
      id: 'custom-001',
      name: '自定义测试',
      // ... 测试配置
    }
  ];
}
```

### 添加新的断言类型

```typescript
// test-runner.ts
private async executeAssertion(assertion: Assertion) {
  switch (assertion.type) {
    case 'custom':
      // 自定义断言逻辑
      break;
  }
}
```

### 集成其他工具

```typescript
// 例如: Playwright
class PlaywrightRunner extends TestRunner {
  async executeStep(step: TestStep) {
    // Playwright 实现
  }
}
```

---

## 性能优化

### 1. 并行测试执行

```typescript
async runTestSuiteParallel(testCases: TestCase[]) {
  const results = await Promise.all(
    testCases.map(tc => this.runTest(tc))
  );
  return results;
}
```

### 2. 智能快照缓存

```typescript
private snapshotCache = new Map();

async getPageSnapshot() {
  if (this.snapshotCache.has(url)) {
    return this.snapshotCache.get(url);
  }
  // ... 获取快照并缓存
}
```

### 3. 增量测试

```typescript
// 只运行变更相关的测试
async runIncrementalTests(changedFiles: string[]) {
  const relatedTests = this.findRelatedTests(changedFiles);
  return this.runTestSuite(relatedTests);
}
```

---

## 安全性考虑

### 1. 输入验证

```typescript
// 验证测试用例格式
validateTestCase(testCase: TestCase) {
  if (!testCase.id || !testCase.name) {
    throw new Error('Invalid test case');
  }
}
```

### 2. 沙箱执行

```typescript
// JavaScript 执行限制
evaluate_script({
  function: sanitize(userScript),
  timeout: 5000
});
```

### 3. 敏感数据处理

```typescript
// 报告中屏蔽敏感信息
generateReport(data) {
  return maskSensitiveData(data);
}
```

---

## CI/CD 集成

### GitHub Actions

```yaml
name: AI Auto Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm install
      - run: npm run generate-tests
      - run: npm run test
      - uses: actions/upload-artifact@v3
        with:
          name: test-report
          path: tests/test-report.html
```

### 失败通知

```typescript
async notifyOnFailure(report: TestReport) {
  if (report.summary.failed > 0) {
    await sendSlackNotification({
      message: `测试失败 ${report.summary.failed} 个`,
      report: report
    });
  }
}
```

---

## 监控和度量

### 关键指标

```typescript
interface TestMetrics {
  totalTests: number;        // 总测试数
  passRate: number;          // 通过率
  avgDuration: number;       // 平均耗时
  flakiness: number;         // 不稳定测试数
  coverage: number;          // 覆盖率
}
```

### 趋势分析

```typescript
// 跟踪测试趋势
trackTestTrend(report: TestReport) {
  const trend = {
    date: new Date(),
    passRate: report.summary.passed / report.summary.total,
    avgDuration: report.summary.duration / report.summary.total
  };
  
  saveTrendData(trend);
}
```

---

## 总结

这个 AI 自动化测试系统是一个:

✅ **智能化** - AI 驱动的分析和生成  
✅ **自动化** - 一键执行完整流程  
✅ **可扩展** - 易于添加新功能  
✅ **实用性** - 真实项目验证  
✅ **现代化** - 使用最新技术栈

通过组合使用 Chrome DevTools MCP 和 Browser Use,我们实现了一个既强大又灵活的测试框架。
