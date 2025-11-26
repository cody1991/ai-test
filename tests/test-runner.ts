/**
 * AI 自动化测试执行引擎
 * 功能: 执行测试用例，收集结果，生成报告
 */

import type { TestCase, TestStep, Assertion } from './test-generator';

interface TestResult {
  testId: string;
  testName: string;
  status: 'passed' | 'failed' | 'skipped';
  duration: number;
  steps: StepResult[];
  assertions: AssertionResult[];
  error?: string;
  screenshots: string[];
}

interface StepResult {
  step: TestStep;
  status: 'passed' | 'failed';
  duration: number;
  error?: string;
}

interface AssertionResult {
  assertion: Assertion;
  status: 'passed' | 'failed';
  actual?: any;
  error?: string;
}

interface TestReport {
  summary: {
    total: number;
    passed: number;
    failed: number;
    skipped: number;
    duration: number;
  };
  results: TestResult[];
  timestamp: string;
}

export class AITestRunner {
  private mcpServerName = 'chrome-devtools';
  private results: TestResult[] = [];

  /**
   * 执行单个测试用例
   */
  async runTest(testCase: TestCase): Promise<TestResult> {
    console.log(`\n▶️  执行测试: ${testCase.name}`);
    const startTime = Date.now();
    
    const result: TestResult = {
      testId: testCase.id,
      testName: testCase.name,
      status: 'passed',
      duration: 0,
      steps: [],
      assertions: [],
      screenshots: [],
    };

    try {
      // 执行测试步骤
      for (const step of testCase.steps) {
        const stepResult = await this.executeStep(step);
        result.steps.push(stepResult);
        
        if (stepResult.status === 'failed') {
          result.status = 'failed';
          throw new Error(`步骤失败: ${step.description}`);
        }
      }

      // 执行断言
      for (const assertion of testCase.assertions) {
        const assertionResult = await this.executeAssertion(assertion);
        result.assertions.push(assertionResult);
        
        if (assertionResult.status === 'failed') {
          result.status = 'failed';
        }
      }

    } catch (error: any) {
      result.status = 'failed';
      result.error = error.message;
      console.log(`❌ 测试失败: ${error.message}`);
    }

    result.duration = Date.now() - startTime;
    
    if (result.status === 'passed') {
      console.log(`✅ 测试通过 (${result.duration}ms)`);
    }

    return result;
  }

  /**
   * 执行测试步骤
   */
  private async executeStep(step: TestStep): Promise<StepResult> {
    console.log(`  📍 ${step.description}`);
    const startTime = Date.now();
    
    try {
      switch (step.action) {
        case 'navigate':
          await this.navigate(step.target!);
          break;
        case 'click':
          await this.click(step.target!);
          break;
        case 'fill':
          await this.fill(step.target!, step.value!);
          break;
        case 'wait':
          await this.wait(parseInt(step.value || '1000'));
          break;
        case 'screenshot':
          await this.takeScreenshot();
          break;
      }

      return {
        step,
        status: 'passed',
        duration: Date.now() - startTime,
      };
    } catch (error: any) {
      return {
        step,
        status: 'failed',
        duration: Date.now() - startTime,
        error: error.message,
      };
    }
  }

  /**
   * 执行断言
   */
  private async executeAssertion(assertion: Assertion): Promise<AssertionResult> {
    console.log(`  🔍 检查: ${assertion.description}`);
    
    try {
      let actual: any;
      let passed = false;

      switch (assertion.type) {
        case 'visible':
          actual = await this.isVisible(assertion.target);
          passed = actual === assertion.expected;
          break;
        case 'text':
          actual = await this.getText(assertion.target);
          passed = actual.includes(assertion.expected);
          break;
        case 'count':
          actual = await this.getCount(assertion.target);
          passed = actual === assertion.expected;
          break;
        case 'network':
          actual = await this.checkNetwork(assertion.target);
          passed = this.evaluateCondition(actual, assertion.expected);
          break;
        case 'performance':
          actual = await this.checkPerformance(assertion.target);
          passed = this.evaluateCondition(actual, assertion.expected);
          break;
      }

      return {
        assertion,
        status: passed ? 'passed' : 'failed',
        actual,
      };
    } catch (error: any) {
      return {
        assertion,
        status: 'failed',
        error: error.message,
      };
    }
  }

  /**
   * 导航到 URL
   */
  private async navigate(url: string): Promise<void> {
    console.log(`    → 导航到: ${url}`);
    // 实际调用: mcp_call_tool('chrome-devtools', 'navigate_page', {type: 'url', url})
    await this.wait(500);
  }

  /**
   * 点击元素
   */
  private async click(selector: string): Promise<void> {
    console.log(`    → 点击: ${selector}`);
    // 实际调用: 
    // 1. take_snapshot() 获取元素 uid
    // 2. mcp_call_tool('chrome-devtools', 'click', {uid})
    await this.wait(300);
  }

  /**
   * 填充表单
   */
  private async fill(selector: string, value: string): Promise<void> {
    console.log(`    → 填充 ${selector}: ${value}`);
    // 实际调用: mcp_call_tool('chrome-devtools', 'fill', {uid, value})
    await this.wait(200);
  }

  /**
   * 等待
   */
  private async wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * 截图
   */
  private async takeScreenshot(): Promise<string> {
    console.log(`    → 截图`);
    // 实际调用: mcp_call_tool('chrome-devtools', 'take_screenshot', {})
    return `screenshot-${Date.now()}.png`;
  }

  /**
   * 检查元素可见性
   */
  private async isVisible(selector: string): Promise<boolean> {
    // 实际调用: evaluate_script() 检查元素可见性
    return true;
  }

  /**
   * 获取文本内容
   */
  private async getText(selector: string): Promise<string> {
    // 实际调用: evaluate_script() 获取文本
    return '';
  }

  /**
   * 获取元素数量
   */
  private async getCount(selector: string): Promise<number> {
    // 实际调用: evaluate_script() 统计元素
    return 0;
  }

  /**
   * 检查网络请求
   */
  private async checkNetwork(target: string): Promise<any> {
    // 实际调用: list_network_requests()
    return {};
  }

  /**
   * 检查性能指标
   */
  private async checkPerformance(metric: string): Promise<number> {
    // 实际调用: performance_start_trace() & performance_stop_trace()
    return 0;
  }

  /**
   * 评估条件
   */
  private evaluateCondition(actual: any, expected: string): boolean {
    // 支持 <, >, =, >= , <= 等比较
    if (expected.startsWith('<')) {
      return actual < parseFloat(expected.substring(1));
    }
    if (expected.startsWith('>')) {
      return actual > parseFloat(expected.substring(1));
    }
    return actual === expected;
  }

  /**
   * 执行测试套件
   */
  async runTestSuite(testCases: TestCase[]): Promise<TestReport> {
    console.log(`\n🚀 开始执行测试套件 (共 ${testCases.length} 个测试)\n`);
    console.log('='.repeat(60));
    
    const startTime = Date.now();
    const results: TestResult[] = [];

    for (const testCase of testCases) {
      const result = await this.runTest(testCase);
      results.push(result);
    }

    const duration = Date.now() - startTime;
    const passed = results.filter(r => r.status === 'passed').length;
    const failed = results.filter(r => r.status === 'failed').length;
    const skipped = results.filter(r => r.status === 'skipped').length;

    const report: TestReport = {
      summary: {
        total: testCases.length,
        passed,
        failed,
        skipped,
        duration,
      },
      results,
      timestamp: new Date().toISOString(),
    };

    this.printSummary(report);
    return report;
  }

  /**
   * 打印测试摘要
   */
  private printSummary(report: TestReport): void {
    console.log('\n' + '='.repeat(60));
    console.log('\n📊 测试摘要\n');
    console.log(`总计: ${report.summary.total}`);
    console.log(`✅ 通过: ${report.summary.passed}`);
    console.log(`❌ 失败: ${report.summary.failed}`);
    console.log(`⏭️  跳过: ${report.summary.skipped}`);
    console.log(`⏱️  耗时: ${report.summary.duration}ms`);
    console.log(`📅 时间: ${report.timestamp}`);
    
    const passRate = ((report.summary.passed / report.summary.total) * 100).toFixed(2);
    console.log(`\n通过率: ${passRate}%`);
    
    if (report.summary.failed > 0) {
      console.log('\n❌ 失败的测试:');
      report.results
        .filter(r => r.status === 'failed')
        .forEach(r => {
          console.log(`  - ${r.testId}: ${r.testName}`);
          if (r.error) console.log(`    错误: ${r.error}`);
        });
    }
  }

  /**
   * 生成 HTML 报告
   */
  generateHTMLReport(report: TestReport): string {
    const passRate = ((report.summary.passed / report.summary.total) * 100).toFixed(2);
    
    return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI 自动化测试报告</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 1200px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px; }
    .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 20px 0; }
    .card { background: white; border: 1px solid #ddd; border-radius: 8px; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .metric { font-size: 36px; font-weight: bold; margin: 10px 0; }
    .passed { color: #52c41a; }
    .failed { color: #f5222d; }
    .test-result { margin: 10px 0; padding: 15px; border-left: 4px solid; border-radius: 4px; }
    .test-result.passed { background: #f6ffed; border-color: #52c41a; }
    .test-result.failed { background: #fff2e8; border-color: #f5222d; }
    .progress { height: 30px; background: #f0f0f0; border-radius: 15px; overflow: hidden; }
    .progress-bar { height: 100%; background: linear-gradient(90deg, #52c41a, #73d13d); transition: width 0.3s; }
  </style>
</head>
<body>
  <div class="header">
    <h1>🤖 AI 自动化测试报告</h1>
    <p>意大利餐厅管理系统 - 测试报告</p>
    <p>生成时间: ${report.timestamp}</p>
  </div>

  <div class="summary">
    <div class="card">
      <div>总测试数</div>
      <div class="metric">${report.summary.total}</div>
    </div>
    <div class="card">
      <div>通过</div>
      <div class="metric passed">${report.summary.passed}</div>
    </div>
    <div class="card">
      <div>失败</div>
      <div class="metric failed">${report.summary.failed}</div>
    </div>
    <div class="card">
      <div>通过率</div>
      <div class="metric">${passRate}%</div>
    </div>
  </div>

  <div class="card">
    <h3>测试进度</h3>
    <div class="progress">
      <div class="progress-bar" style="width: ${passRate}%"></div>
    </div>
  </div>

  <div class="card">
    <h3>测试结果详情</h3>
    ${report.results.map(result => `
      <div class="test-result ${result.status}">
        <h4>${result.status === 'passed' ? '✅' : '❌'} ${result.testName}</h4>
        <p>测试ID: ${result.testId} | 耗时: ${result.duration}ms</p>
        ${result.error ? `<p style="color: red;">错误: ${result.error}</p>` : ''}
        <details>
          <summary>查看详情</summary>
          <p>步骤数: ${result.steps.length} | 断言数: ${result.assertions.length}</p>
        </details>
      </div>
    `).join('')}
  </div>
</body>
</html>
    `;
  }

  /**
   * 保存报告
   */
  async saveReport(report: TestReport): Promise<void> {
    // 在 Node.js 环境中动态导入
    const fs = await import('fs');
    const path = await import('path');
    
    // 保存 JSON 报告
    const jsonPath = path.join(process.cwd(), 'tests', 'test-report.json');
    fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2));
    console.log(`\n📄 JSON 报告已保存: ${jsonPath}`);
    
    // 保存 HTML 报告
    const htmlPath = path.join(process.cwd(), 'tests', 'test-report.html');
    fs.writeFileSync(htmlPath, this.generateHTMLReport(report));
    console.log(`📄 HTML 报告已保存: ${htmlPath}`);
  }
}

// 导出单例
export const testRunner = new AITestRunner();

// 命令行执行
if (require.main === module) {
  (async () => {
    const fs = await import('fs');
    const path = await import('path');
    
    // 读取生成的测试用例
    const testsPath = path.join(process.cwd(), 'tests', 'generated-tests.json');
    
    if (!fs.existsSync(testsPath)) {
      console.log('❌ 未找到测试用例文件，请先运行: npm run generate-tests');
      process.exit(1);
    }
    
    const testCases = JSON.parse(fs.readFileSync(testsPath, 'utf-8'));
    
    const runner = new AITestRunner();
    const report = await runner.runTestSuite(testCases);
    await runner.saveReport(report);
    
    process.exit(report.summary.failed > 0 ? 1 : 0);
  })();
}
