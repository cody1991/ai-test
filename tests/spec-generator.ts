#!/usr/bin/env tsx
/**
 * Spec-kit 测试用例生成器
 * 
 * 功能：
 * 1. 读取 Spec 规则文件
 * 2. 根据用户需求，AI 自动生成测试用例
 * 3. 支持批量生成多个页面的测试
 */

import { restaurantSpec, PageSpec, FeatureSpec } from '../specs/restaurant.spec.js';

interface TestCase {
  id: string;
  name: string;
  page: string;
  feature: string;
  steps: TestStep[];
  validations: string[];
}

interface TestStep {
  action: string;
  selector?: string;
  input?: string;
  expected: string;
  mcpTool?: string;
}

/**
 * 根据 Spec 规则生成测试用例
 */
export async function generateTestCases(userRequest: string): Promise<TestCase[]> {
  console.log(`\n🤖 AI 分析需求: "${userRequest}"\n`);
  
  // 1. 分析用户需求，匹配相关页面
  const relevantPages = findRelevantPages(userRequest);
  
  if (relevantPages.length === 0) {
    console.log('❌ 未找到相关页面，请检查 Spec 配置');
    return [];
  }
  
  console.log(`📋 匹配到 ${relevantPages.length} 个相关页面:`);
  relevantPages.forEach(page => {
    console.log(`   - ${page.name} (${page.path})`);
  });
  
  // 2. 为每个页面生成测试用例
  const allTestCases: TestCase[] = [];
  
  for (const page of relevantPages) {
    const testCases = generatePageTestCases(page, userRequest);
    allTestCases.push(...testCases);
  }
  
  // 3. 输出生成结果
  console.log(`\n✅ 生成了 ${allTestCases.length} 个测试用例\n`);
  
  allTestCases.forEach((testCase, index) => {
    console.log(`${index + 1}. ${testCase.name}`);
    console.log(`   页面: ${testCase.page}`);
    console.log(`   功能: ${testCase.feature}`);
    console.log(`   步骤数: ${testCase.steps.length}`);
    console.log(`   验证项: ${testCase.validations.length}`);
    console.log('');
  });
  
  return allTestCases;
}

/**
 * 根据用户需求匹配相关页面
 */
function findRelevantPages(userRequest: string): PageSpec[] {
  const request = userRequest.toLowerCase();
  
  // 如果是"所有"或"全部"，返回所有页面
  if (request.includes('所有') || request.includes('全部') || request.includes('all')) {
    return restaurantSpec;
  }
  
  return restaurantSpec.filter(page => {
    // 匹配页面名称
    if (page.name.includes(userRequest)) return true;
    if (request.includes(page.name.toLowerCase())) return true;
    
    // 匹配页面描述
    if (page.description.includes(userRequest)) return true;
    
    // 匹配功能名称
    const hasMatchingFeature = page.features.some(feature => 
      feature.name.includes(userRequest) || 
      request.includes(feature.name.toLowerCase())
    );
    
    return hasMatchingFeature;
  });
}

/**
 * 为单个页面生成测试用例
 */
function generatePageTestCases(page: PageSpec, userRequest: string): TestCase[] {
  const testCases: TestCase[] = [];
  const request = userRequest.toLowerCase();
  
  // 筛选相关功能
  const relevantFeatures = page.features.filter(feature => {
    if (request.includes('全部') || request.includes('所有')) return true;
    
    const featureName = feature.name.toLowerCase();
    
    // 匹配功能名称的关键词
    if (featureName.includes('添加') && request.includes('添加')) return true;
    if (featureName.includes('编辑') && request.includes('编辑')) return true;
    if (featureName.includes('删除') && request.includes('删除')) return true;
    if (featureName.includes('列表') && request.includes('列表')) return true;
    
    // 匹配完整名称
    return feature.name.includes(userRequest) || request.includes(featureName);
  });
  
  // 如果没有匹配到特定功能，返回所有功能
  const features = relevantFeatures.length > 0 ? relevantFeatures : page.features;
  
  // 为每个功能生成测试用例
  for (const feature of features) {
    const testCase = createTestCase(page, feature);
    testCases.push(testCase);
  }
  
  return testCases;
}

/**
 * 创建测试用例
 */
function createTestCase(page: PageSpec, feature: FeatureSpec): TestCase {
  const steps: TestStep[] = [];
  
  // 添加导航步骤
  steps.push({
    action: '导航到页面',
    expected: `成功打开 ${page.name}`,
    mcpTool: 'navigate_page'
  });
  
  // 添加功能操作步骤
  for (const action of feature.actions) {
    steps.push({
      action: action.name,
      selector: action.selector,
      input: action.input,
      expected: action.expected,
      mcpTool: mapActionToMCP(action.name)
    });
  }
  
  // 收集验证规则
  const validations = feature.validations.map(v => 
    `${v.field}: ${v.rules.join(', ')} - ${v.errorMessage}`
  );
  
  return {
    id: `${page.path.replace('/', '')}_${feature.name}`,
    name: `${page.name} - ${feature.name}`,
    page: page.name,
    feature: feature.name,
    steps,
    validations
  };
}

/**
 * 将操作映射到 MCP 工具
 */
function mapActionToMCP(actionName: string): string {
  const name = actionName.toLowerCase();
  
  if (name.includes('点击') || name.includes('打开')) return 'click';
  if (name.includes('填写') || name.includes('输入') || name.includes('修改')) return 'fill';
  if (name.includes('选择')) return 'click';
  if (name.includes('搜索')) return 'fill';
  if (name.includes('提交') || name.includes('保存') || name.includes('确认')) return 'click';
  if (name.includes('查看')) return 'take_snapshot';
  
  return 'take_snapshot';
}

/**
 * 将测试用例转换为可执行的 MCP 命令
 */
export function generateMCPCommands(testCase: TestCase): string[] {
  const commands: string[] = [];
  
  commands.push(`# 测试用例: ${testCase.name}`);
  commands.push(`# 页面路径: ${getPagePath(testCase.page)}`);
  commands.push('');
  
  for (const step of testCase.steps) {
    if (step.mcpTool === 'navigate_page') {
      commands.push(`mcp.navigate_page("http://localhost:3000${getPagePath(testCase.page)}")`);
    } else if (step.mcpTool === 'click' && step.selector) {
      commands.push(`mcp.click("${step.selector}")`);
    } else if (step.mcpTool === 'fill' && step.selector && step.input) {
      commands.push(`mcp.fill("${step.selector}", "${step.input}")`);
    } else {
      commands.push(`mcp.take_snapshot()`);
    }
    commands.push(`# 预期: ${step.expected}`);
    commands.push('');
  }
  
  if (testCase.validations.length > 0) {
    commands.push('# 验证规则:');
    testCase.validations.forEach(v => commands.push(`# - ${v}`));
  }
  
  return commands;
}

/**
 * 获取页面路径
 */
function getPagePath(pageName: string): string {
  const page = restaurantSpec.find(p => p.name === pageName);
  return page?.path || '/';
}

/**
 * 保存测试用例到文件
 */
export async function saveTestCases(testCases: TestCase[]): Promise<void> {
  const fs = await import('fs/promises');
  const path = await import('path');
  
  const outputDir = path.join(process.cwd(), 'tests/generated');
  await fs.mkdir(outputDir, { recursive: true });
  
  // 保存 JSON 格式
  const jsonPath = path.join(outputDir, 'test-cases.json');
  await fs.writeFile(jsonPath, JSON.stringify(testCases, null, 2));
  
  // 保存可执行脚本
  for (const testCase of testCases) {
    const commands = generateMCPCommands(testCase);
    const scriptPath = path.join(outputDir, `${testCase.id}.mcp.txt`);
    await fs.writeFile(scriptPath, commands.join('\n'));
  }
  
  console.log(`\n💾 测试用例已保存到: ${outputDir}`);
}

/**
 * 命令行交互模式
 */
async function main() {
  console.log('╔════════════════════════════════════════════╗');
  console.log('║   Spec-kit 测试用例生成器                 ║');
  console.log('╚════════════════════════════════════════════╝\n');
  
  // 从命令行参数获取需求
  const userRequest = process.argv[2];
  
  if (!userRequest) {
    console.log('📖 使用方法:');
    console.log('   npm run spec "测试菜单管理"');
    console.log('   npm run spec "测试所有页面"');
    console.log('   npm run spec "测试订单的添加和编辑功能"\n');
    
    console.log('📋 可用页面:');
    restaurantSpec.forEach(page => {
      console.log(`   - ${page.name}: ${page.description}`);
      console.log(`     功能: ${page.features.map(f => f.name).join(', ')}\n`);
    });
    
    process.exit(0);
  }
  
  // 生成测试用例
  const testCases = await generateTestCases(userRequest);
  
  if (testCases.length > 0) {
    await saveTestCases(testCases);
    
    console.log('\n📝 下一步:');
    console.log('   1. 查看生成的测试用例: cat tests/generated/test-cases.json');
    console.log('   2. 运行测试: npm test');
    console.log('   3. 或使用 MCP 工具手动执行: tests/generated/*.mcp.txt\n');
  }
}

// 执行
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}
