# Spec-kit 规则系统

## 什么是 Spec-kit？

Spec-kit 是**测试规则配置系统**，用于定义页面的测试规范。它不是固定的测试用例，而是**规则模板**。

### 核心概念

```
Spec 规则 → AI 分析 → 生成测试用例 → MCP 执行
```

## 文件结构

```
specs/
├── restaurant.spec.ts    # 餐厅系统规则
└── your-project.spec.ts  # 你的项目规则
```

## 规则定义示例

```typescript
{
  name: '菜单管理',
  path: '/menu',
  features: [
    {
      name: '添加菜品',
      type: 'form',
      actions: [
        { name: '打开表单', selector: 'button:contains("添加")', expected: '弹出表单' },
        { name: '填写名称', selector: 'input[id*="name"]', input: '测试菜品', expected: '输入成功' }
      ],
      validations: [
        { field: 'name', rules: ['required'], errorMessage: '请输入菜品名称' }
      ]
    }
  ]
}
```

## 如何使用？

### 1️⃣ 定义 Spec 规则
```bash
# 编辑 specs/restaurant.spec.ts
# 定义你的页面、功能、操作流程
```

### 2️⃣ AI 生成测试用例
```bash
npm run spec
# 输入：测试菜单管理的添加功能
# AI 会读取 Spec 规则，生成具体测试代码
```

### 3️⃣ 执行测试
```bash
npm test
# 使用 MCP 工具自动化测试
```

## Spec vs 测试用例

| 对比项 | Spec 规则 | 测试用例 |
|--------|-----------|----------|
| 性质 | 配置模板 | 可执行代码 |
| 编写方式 | 手工定义一次 | AI 自动生成 |
| 灵活性 | 规则固定 | 根据需求变化 |
| 作用 | 定义测试范围 | 执行具体测试 |

## 优势

✅ **不用写死测试用例** - 只定义规则，AI 自动生成  
✅ **大规模测试** - 一个 Spec 可生成 N 个测试用例  
✅ **易于维护** - 页面改动只需更新 Spec  
✅ **智能化** - AI 理解业务逻辑，生成更准确的测试

## 示例：从一句话到测试

**你说**：测试登录流程

**AI 做**：
1. 读取 `login.spec.ts` 规则
2. 发现需要测试：用户名、密码、提交按钮
3. 生成测试用例：
   - 空用户名提示
   - 空密码提示
   - 错误凭证提示
   - 正确登录跳转
4. 使用 MCP 自动执行测试

**你获得**：完整的测试报告，包括截图、网络请求、控制台日志
