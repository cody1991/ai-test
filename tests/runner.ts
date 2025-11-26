#!/usr/bin/env tsx
/**
 * MCP 测试执行器
 * 
 * 引导用户使用 AI + MCP 工具执行自动化测试
 */

import { readFileSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';

/**
 * 执行测试
 */
async function runTests() {
  console.log('╔════════════════════════════════════════════╗');
  console.log('║   AI + MCP 自动化测试执行器               ║');
  console.log('╚════════════════════════════════════════════╝\n');
  
  // 检查是否有生成的测试用例
  const testCasesPath = join(process.cwd(), 'tests/generated/test-cases.json');
  const generatedDir = join(process.cwd(), 'tests/generated');
  
  if (!existsSync(testCasesPath)) {
    console.log('❌ 未找到测试用例文件');
    console.log('💡 请先生成测试用例: npm run spec "测试需求"\n');
    process.exit(1);
  }
  
  const testCases = JSON.parse(readFileSync(testCasesPath, 'utf-8'));
  
  // 检查是否有生成的 MCP 命令文件
  const mcpFiles = readdirSync(generatedDir).filter(f => f.endsWith('.mcp.txt'));
  
  if (mcpFiles.length === 0) {
    console.log('❌ 未找到 MCP 命令文件');
    console.log('💡 请重新生成测试用例: npm run spec "测试需求"\n');
    process.exit(1);
  }
  
  console.log(`📋 找到 ${testCases.length} 个测试用例`);
  console.log(`📝 生成了 ${mcpFiles.length} 个 MCP 命令文件\n`);
  
  console.log('📂 测试用例列表:');
  testCases.forEach((tc: any, index: number) => {
    console.log(`   ${index + 1}. ${tc.name}`);
    console.log(`      文件: ${mcpFiles[index]}`);
    console.log(`      步骤: ${tc.steps.length} 个`);
    console.log('');
  });
  
  console.log('╔════════════════════════════════════════════╗');
  console.log('║   🤖 如何使用 AI 执行测试？               ║');
  console.log('╚════════════════════════════════════════════╝\n');
  
  console.log('方式 1: 使用自然语言（推荐）');
  console.log('   在 IDE 中发送消息给 AI：');
  console.log('   "请使用 MCP 工具执行 tests/generated/ 中的所有测试用例"\n');
  
  console.log('方式 2: 执行单个测试');
  console.log('   "请执行菜单管理-添加菜品的测试"\n');
  
  console.log('方式 3: 自定义测试');
  console.log('   "请测试一下能否成功添加一个名为\'宫保鸡丁\'的菜品"\n');
  
  console.log('💡 优势:');
  console.log('   ✅ 使用自然语言描述测试需求');
  console.log('   ✅ AI 自动调用 MCP 工具操作浏览器');
  console.log('   ✅ 实时查看测试过程和结果');
  console.log('   ✅ 遇到问题可以随时调整策略\n');
  
  console.log('📖 可用的 MCP 命令文件:');
  mcpFiles.forEach(file => {
    const content = readFileSync(join(generatedDir, file), 'utf-8');
    const firstLine = content.split('\n')[0];
    console.log(`   - ${file}`);
    console.log(`     ${firstLine}\n`);
  });
  
  console.log('🚀 现在就在 IDE 中发送消息给 AI 开始测试吧！\n');
}

// 执行
runTests().catch(console.error);
