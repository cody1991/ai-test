/**
 * AI 自动化测试完整演示
 * 展示如何使用 Chrome DevTools MCP 和 Browser Use 进行自动化测试
 */

import { AIPageAnalyzer } from './ai-analyzer';
import { AITestGenerator } from './test-generator';
import { AITestRunner } from './test-runner';

/**
 * 完整演示流程
 */
async function runCompleteDemo() {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║     🤖 AI 自动化测试系统 - 完整演示                        ║');
  console.log('║     意大利餐厅管理系统自动化测试                            ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  const baseUrl = 'http://localhost:3000';

  // ============================================================
  // 第一步: AI 页面分析
  // ============================================================
  console.log('\n📋 第一步: AI 页面分析');
  console.log('─'.repeat(60));
  
  const analyzer = new AIPageAnalyzer();
  const analysisResult = await analyzer.analyzePage(`${baseUrl}/menu`);
  
  console.log('\n分析结果:');
  console.log(analyzer.generateReport(analysisResult));

  // ============================================================
  // 第二步: AI 生成测试用例
  // ============================================================
  console.log('\n📋 第二步: AI 生成测试用例');
  console.log('─'.repeat(60));
  
  const generator = new AITestGenerator();
  const testSuite = generator.generateTestSuite(baseUrl);
  
  console.log(`✅ 成功生成 ${testSuite.length} 个测试用例\n`);
  
  // 按优先级分组
  const highPriority = testSuite.filter(t => t.priority === 'high');
  const mediumPriority = testSuite.filter(t => t.priority === 'medium');
  const lowPriority = testSuite.filter(t => t.priority === 'low');
  
  console.log(`高优先级: ${highPriority.length} 个`);
  console.log(`中优先级: ${mediumPriority.length} 个`);
  console.log(`低优先级: ${lowPriority.length} 个\n`);
  
  // 显示部分测试用例
  console.log('示例测试用例:');
  testSuite.slice(0, 3).forEach((tc, i) => {
    console.log(`\n${i + 1}. [${tc.priority}] ${tc.name}`);
    console.log(`   ${tc.description}`);
    console.log(`   步骤数: ${tc.steps.length} | 断言数: ${tc.assertions.length}`);
  });

  // ============================================================
  // 第三步: 执行测试
  // ============================================================
  console.log('\n\n📋 第三步: 执行自动化测试');
  console.log('─'.repeat(60));
  
  const runner = new AITestRunner();
  
  // 执行高优先级测试
  console.log('\n执行高优先级测试...\n');
  const report = await runner.runTestSuite(highPriority);
  
  // ============================================================
  // 第四步: 生成报告
  // ============================================================
  console.log('\n📋 第四步: 生成测试报告');
  console.log('─'.repeat(60));
  
  await runner.saveReport(report);

  // ============================================================
  // 总结
  // ============================================================
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║     ✅ 演示完成                                            ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');
  
  console.log('生成的文件:');
  console.log('  📄 tests/generated-tests.json  - 测试用例');
  console.log('  📄 tests/test-report.json      - JSON 报告');
  console.log('  📄 tests/test-report.html      - HTML 报告');
  
  console.log('\n后续步骤:');
  console.log('  1. 查看 HTML 报告了解详细结果');
  console.log('  2. 根据失败的测试修复问题');
  console.log('  3. 集成到 CI/CD 流程');
  console.log('  4. (可选) 安装 Browser Use 体验 AI 自然语言测试');
  
  console.log('\n安装 Browser Use:');
  console.log('  npm install browser-use');
  console.log('  然后运行: npm run test:browser-use\n');
}

/**
 * 使用 MCP 的实际测试示例
 * 这个函数展示了如何真正使用 Chrome DevTools MCP
 */
async function mcpRealWorldExample() {
  console.log('\n🔧 Chrome DevTools MCP 实战示例\n');
  
  console.log('以下是使用 MCP 的实际步骤:\n');
  
  console.log('1️⃣  创建新页面:');
  console.log('   mcp_call_tool("chrome-devtools", "new_page", {');
  console.log('     url: "http://localhost:3000/menu"');
  console.log('   })\n');
  
  console.log('2️⃣  获取页面快照:');
  console.log('   mcp_call_tool("chrome-devtools", "take_snapshot", {');
  console.log('     verbose: true');
  console.log('   })\n');
  
  console.log('3️⃣  点击元素 (需要先从快照获取 uid):');
  console.log('   mcp_call_tool("chrome-devtools", "click", {');
  console.log('     uid: "element-uid-from-snapshot"');
  console.log('   })\n');
  
  console.log('4️⃣  填充表单:');
  console.log('   mcp_call_tool("chrome-devtools", "fill", {');
  console.log('     uid: "input-uid",');
  console.log('     value: "测试数据"');
  console.log('   })\n');
  
  console.log('5️⃣  执行 JavaScript:');
  console.log('   mcp_call_tool("chrome-devtools", "evaluate_script", {');
  console.log('     function: "() => document.title"');
  console.log('   })\n');
  
  console.log('6️⃣  获取网络请求:');
  console.log('   mcp_call_tool("chrome-devtools", "list_network_requests", {})\n');
  
  console.log('7️⃣  获取控制台消息:');
  console.log('   mcp_call_tool("chrome-devtools", "list_console_messages", {');
  console.log('     types: ["error", "warn"]');
  console.log('   })\n');
  
  console.log('8️⃣  性能分析:');
  console.log('   // 开始追踪');
  console.log('   mcp_call_tool("chrome-devtools", "performance_start_trace", {');
  console.log('     reload: true,');
  console.log('     autoStop: true');
  console.log('   })');
  console.log('   // 停止追踪');
  console.log('   mcp_call_tool("chrome-devtools", "performance_stop_trace", {})\n');
}

/**
 * 快速开始指南
 */
function quickStartGuide() {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║     🚀 快速开始指南                                        ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');
  
  console.log('1. 安装依赖:');
  console.log('   npm install\n');
  
  console.log('2. 启动开发服务器:');
  console.log('   npm run dev');
  console.log('   访问: http://localhost:3000\n');
  
  console.log('3. 生成测试用例:');
  console.log('   npm run generate-tests\n');
  
  console.log('4. 执行测试:');
  console.log('   npm run test\n');
  
  console.log('5. 查看报告:');
  console.log('   打开 tests/test-report.html\n');
  
  console.log('6. (可选) 使用 Browser Use:');
  console.log('   npm install browser-use');
  console.log('   npm run test:browser-use\n');
}

// 主函数
if (require.main === module) {
  const command = process.argv[2];
  
  switch (command) {
    case 'demo':
      runCompleteDemo();
      break;
    case 'mcp':
      mcpRealWorldExample();
      break;
    case 'guide':
      quickStartGuide();
      break;
    default:
      console.log('\n使用方法:');
      console.log('  npm run demo          - 运行完整演示');
      console.log('  npm run demo:mcp      - 查看 MCP 使用示例');
      console.log('  npm run demo:guide    - 查看快速开始指南\n');
  }
}

export { runCompleteDemo, mcpRealWorldExample, quickStartGuide };
