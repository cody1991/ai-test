# ⚡ 快速开始指南

## 🎯 5分钟上手 AI 自动化测试

### 步骤 1️⃣: 查看应用 (已完成 ✅)

应用已经在运行: **http://localhost:3000**

浏览一下这5个页面:
- 📊 仪表盘 - 查看营业数据
- 📋 菜单管理 - 尝试添加/编辑菜品
- 🛒 订单管理 - 查看订单列表
- 📅 预订管理 - 管理预订
- 📦 库存管理 - 查看库存状态

---

### 步骤 2️⃣: 生成测试用例

```bash
npm run generate-tests
```

**你会看到:**
```
✅ 生成了 12 个测试用例

测试用例列表:
- [high] dashboard-001: 仪表盘数据显示测试
- [high] menu-001: 添加菜品功能测试
- [high] menu-002: 编辑菜品功能测试
...

📝 测试用例已保存到 tests/generated-tests.json
```

---

### 步骤 3️⃣: 查看生成的测试用例

```bash
cat tests/generated-tests.json
```

你会看到详细的测试用例,包括:
- 测试步骤(navigate, click, fill...)
- 断言(visible, text, count...)
- 优先级(high, medium, low)

---

### 步骤 4️⃣: 运行完整演示

```bash
npm run demo
```

**这会自动执行:**
1. ✅ AI 页面分析
2. ✅ 测试用例生成
3. ✅ 测试执行
4. ✅ 报告生成

---

### 步骤 5️⃣: 查看测试报告

打开 `tests/test-report.html` 查看精美的可视化报告!

报告包含:
- 📊 测试摘要(通过/失败/通过率)
- 📈 可视化进度条
- 📋 详细测试结果
- ❌ 失败原因分析

---

## 🤖 使用 Chrome DevTools MCP (实战)

当前环境已集成 **Chrome DevTools MCP**,你可以在 AI 对话中直接使用:

### 示例 1: 打开页面并分析

```
"请使用 Chrome DevTools MCP 打开 http://localhost:3000/menu 
并分析页面结构"
```

AI 会调用:
```typescript
mcp_call_tool('chrome-devtools', 'new_page', {
  url: 'http://localhost:3000/menu'
});

mcp_call_tool('chrome-devtools', 'take_snapshot', {
  verbose: true
});
```

### 示例 2: 测试添加菜品功能

```
"请使用 MCP 测试菜单管理页面的添加菜品功能"
```

AI 会自动:
1. 打开页面
2. 获取页面快照
3. 点击"添加菜品"按钮
4. 填充表单
5. 提交并验证

### 示例 3: 性能分析

```
"请分析仪表盘页面的性能,包括 Core Web Vitals"
```

AI 会调用:
```typescript
mcp_call_tool('chrome-devtools', 'performance_start_trace', {
  reload: true,
  autoStop: true
});
```

### 示例 4: 网络请求分析

```
"请分析菜单页面的网络请求,找出慢请求"
```

AI 会调用:
```typescript
mcp_call_tool('chrome-devtools', 'list_network_requests', {});
```

---

## 🧠 (可选) 体验 Browser Use

### 安装

```bash
npm install browser-use
```

### 使用自然语言测试

```bash
npm run test:browser-use
```

然后你可以用自然语言描述测试:

```
"打开菜单管理页面,
点击添加菜品按钮,
输入名称'烟熏三文鱼披萨',
输入价格'138',
点击确定,
验证显示成功提示"
```

---

## 📚 更多信息

- 📖 **完整文档**: 查看 `README.md`
- 🎯 **演示指南**: 查看 `DEMO.md`
- 🏗️ **架构设计**: 查看 `ARCHITECTURE.md`
- 📊 **项目总结**: 查看 `PROJECT_SUMMARY.md`

---

## 🎯 常用命令

```bash
# 启动应用
npm run dev

# 生成测试用例
npm run generate-tests

# 执行测试
npm run test

# 页面分析
npm run analyze

# 完整演示
npm run demo

# 查看 MCP 使用示例
npm run demo:mcp

# 查看快速指南
npm run demo:guide
```

---

## 💡 提示

### 如何手动测试页面?

在 AI 对话中直接说:

```
"请使用 Chrome DevTools MCP 测试菜单管理的添加功能"
```

AI 会自动:
1. 调用 MCP 工具
2. 执行测试步骤
3. 验证结果
4. 给你反馈

### 如何分析网络性能?

```
"请分析订单页面的网络请求,看看有没有慢请求"
```

### 如何获取控制台错误?

```
"请检查当前页面的控制台错误和警告"
```

---

## 🎉 现在开始吧!

1. ✅ 应用已启动 - http://localhost:3000
2. ✅ 测试框架已就绪
3. ✅ MCP 工具已集成
4. ✅ 文档已完善

**你可以:**
- 浏览应用,体验5个管理模块
- 运行 `npm run demo` 查看完整演示
- 在对话中让 AI 使用 MCP 测试任何功能
- 生成测试用例并执行
- 查看精美的测试报告

---

**祝测试愉快! 🚀**
