/**
 * AI 测试用例生成器
 * 功能: 基于页面分析自动生成测试用例
 */

interface TestCase {
  id: string;
  name: string;
  description: string;
  steps: TestStep[];
  assertions: Assertion[];
  priority: 'high' | 'medium' | 'low';
  category: string;
}

interface TestStep {
  action: 'navigate' | 'click' | 'fill' | 'wait' | 'screenshot';
  target?: string;
  value?: string;
  description: string;
}

interface Assertion {
  type: 'visible' | 'text' | 'count' | 'network' | 'performance';
  target: string;
  expected: any;
  description: string;
}

export class AITestGenerator {
  /**
   * 根据页面类型生成测试用例
   */
  generateTestCases(pageUrl: string, pageType: string): TestCase[] {
    console.log(`🧪 为 ${pageType} 页面生成测试用例...`);
    
    const testCases: TestCase[] = [];
    
    // 根据不同页面类型生成不同测试
    switch (pageType) {
      case 'dashboard':
        testCases.push(...this.generateDashboardTests(pageUrl));
        break;
      case 'menu':
        testCases.push(...this.generateMenuTests(pageUrl));
        break;
      case 'orders':
        testCases.push(...this.generateOrderTests(pageUrl));
        break;
      case 'reservations':
        testCases.push(...this.generateReservationTests(pageUrl));
        break;
      case 'inventory':
        testCases.push(...this.generateInventoryTests(pageUrl));
        break;
      default:
        testCases.push(...this.generateGenericTests(pageUrl));
    }
    
    return testCases;
  }

  /**
   * 生成仪表盘测试用例
   */
  private generateDashboardTests(url: string): TestCase[] {
    return [
      {
        id: 'dashboard-001',
        name: '仪表盘数据显示测试',
        description: '验证仪表盘是否正确显示关键业务数据',
        priority: 'high',
        category: 'UI',
        steps: [
          { action: 'navigate', target: url, description: '打开仪表盘页面' },
          { action: 'wait', value: '2000', description: '等待数据加载' },
          { action: 'screenshot', description: '截图记录页面状态' },
        ],
        assertions: [
          { type: 'visible', target: '[data-testid="dashboard-page"]', expected: true, description: '页面正常渲染' },
          { type: 'count', target: '.ant-statistic', expected: 4, description: '显示4个统计卡片' },
          { type: 'visible', target: 'table', expected: true, description: '订单列表可见' },
        ],
      },
      {
        id: 'dashboard-002',
        name: '仪表盘性能测试',
        description: '验证仪表盘加载性能',
        priority: 'medium',
        category: 'Performance',
        steps: [
          { action: 'navigate', target: url, description: '打开仪表盘' },
        ],
        assertions: [
          { type: 'performance', target: 'LCP', expected: '<2500', description: 'LCP 小于 2.5s' },
          { type: 'performance', target: 'FID', expected: '<100', description: 'FID 小于 100ms' },
        ],
      },
    ];
  }

  /**
   * 生成菜单管理测试用例
   */
  private generateMenuTests(url: string): TestCase[] {
    return [
      {
        id: 'menu-001',
        name: '添加菜品功能测试',
        description: '验证添加新菜品的完整流程',
        priority: 'high',
        category: 'Functional',
        steps: [
          { action: 'navigate', target: url, description: '打开菜单管理页面' },
          { action: 'click', target: 'button:contains("添加菜品")', description: '点击添加按钮' },
          { action: 'fill', target: 'input[id*="name"]', value: '测试菜品', description: '输入菜品名称' },
          { action: 'fill', target: 'input[id*="price"]', value: '99', description: '输入价格' },
          { action: 'click', target: 'button:contains("确定")', description: '提交表单' },
        ],
        assertions: [
          { type: 'visible', target: '.ant-message-success', expected: true, description: '显示成功提示' },
          { type: 'text', target: 'table', expected: '测试菜品', description: '表格中显示新菜品' },
        ],
      },
      {
        id: 'menu-002',
        name: '编辑菜品功能测试',
        description: '验证编辑现有菜品功能',
        priority: 'high',
        category: 'Functional',
        steps: [
          { action: 'navigate', target: url, description: '打开菜单管理页面' },
          { action: 'click', target: 'button:contains("编辑"):first', description: '点击第一个编辑按钮' },
          { action: 'fill', target: 'input[id*="price"]', value: '199', description: '修改价格' },
          { action: 'click', target: 'button:contains("确定")', description: '提交修改' },
        ],
        assertions: [
          { type: 'visible', target: '.ant-message-success', expected: true, description: '显示更新成功' },
        ],
      },
      {
        id: 'menu-003',
        name: '删除菜品功能测试',
        description: '验证删除菜品功能',
        priority: 'medium',
        category: 'Functional',
        steps: [
          { action: 'navigate', target: url, description: '打开菜单管理页面' },
          { action: 'click', target: 'button:contains("删除"):first', description: '点击删除按钮' },
        ],
        assertions: [
          { type: 'visible', target: '.ant-message-success', expected: true, description: '显示删除成功' },
        ],
      },
    ];
  }

  /**
   * 生成订单管理测试用例
   */
  private generateOrderTests(url: string): TestCase[] {
    return [
      {
        id: 'order-001',
        name: '订单列表显示测试',
        description: '验证订单列表正确显示',
        priority: 'high',
        category: 'UI',
        steps: [
          { action: 'navigate', target: url, description: '打开订单管理页面' },
        ],
        assertions: [
          { type: 'visible', target: '[data-testid="orders-page"]', expected: true, description: '页面正常加载' },
          { type: 'visible', target: 'table', expected: true, description: '订单表格可见' },
        ],
      },
      {
        id: 'order-002',
        name: '查看订单详情测试',
        description: '验证订单详情弹窗功能',
        priority: 'medium',
        category: 'Functional',
        steps: [
          { action: 'navigate', target: url, description: '打开订单管理页面' },
          { action: 'click', target: 'button:contains("查看详情"):first', description: '点击查看详情' },
        ],
        assertions: [
          { type: 'visible', target: '.ant-modal', expected: true, description: '弹窗显示' },
          { type: 'visible', target: '.ant-descriptions', expected: true, description: '订单详情可见' },
        ],
      },
    ];
  }

  /**
   * 生成预订管理测试用例
   */
  private generateReservationTests(url: string): TestCase[] {
    return [
      {
        id: 'reservation-001',
        name: '预订列表显示测试',
        description: '验证预订列表正确显示',
        priority: 'high',
        category: 'UI',
        steps: [
          { action: 'navigate', target: url, description: '打开预订管理页面' },
        ],
        assertions: [
          { type: 'visible', target: '[data-testid="reservations-page"]', expected: true, description: '页面正常加载' },
          { type: 'visible', target: 'table', expected: true, description: '预订表格可见' },
        ],
      },
    ];
  }

  /**
   * 生成库存管理测试用例
   */
  private generateInventoryTests(url: string): TestCase[] {
    return [
      {
        id: 'inventory-001',
        name: '库存列表显示测试',
        description: '验证库存列表正确显示',
        priority: 'high',
        category: 'UI',
        steps: [
          { action: 'navigate', target: url, description: '打开库存管理页面' },
        ],
        assertions: [
          { type: 'visible', target: '[data-testid="inventory-page"]', expected: true, description: '页面正常加载' },
          { type: 'visible', target: 'table', expected: true, description: '库存表格可见' },
          { type: 'visible', target: '.ant-progress', expected: true, description: '库存率显示' },
        ],
      },
    ];
  }

  /**
   * 生成通用测试用例
   */
  private generateGenericTests(url: string): TestCase[] {
    return [
      {
        id: 'generic-001',
        name: '页面基本测试',
        description: '验证页面基本功能',
        priority: 'high',
        category: 'Smoke',
        steps: [
          { action: 'navigate', target: url, description: '打开页面' },
        ],
        assertions: [
          { type: 'visible', target: 'body', expected: true, description: '页面加载成功' },
        ],
      },
    ];
  }

  /**
   * 生成测试套件
   */
  generateTestSuite(baseUrl: string): TestCase[] {
    const allTests: TestCase[] = [];
    
    const pages = [
      { path: '/dashboard', type: 'dashboard' },
      { path: '/menu', type: 'menu' },
      { path: '/orders', type: 'orders' },
      { path: '/reservations', type: 'reservations' },
      { path: '/inventory', type: 'inventory' },
    ];
    
    pages.forEach(page => {
      const tests = this.generateTestCases(`${baseUrl}${page.path}`, page.type);
      allTests.push(...tests);
    });
    
    return allTests;
  }

  /**
   * 导出测试用例为 JSON
   */
  exportTestCases(testCases: TestCase[]): string {
    return JSON.stringify(testCases, null, 2);
  }
}

// 导出单例
export const testGenerator = new AITestGenerator();

// 命令行执行
if (require.main === module) {
  (async () => {
    const baseUrl = process.argv[2] || 'http://localhost:3000';
    const generator = new AITestGenerator();
    const testSuite = generator.generateTestSuite(baseUrl);
    
    console.log(`✅ 生成了 ${testSuite.length} 个测试用例`);
    console.log('\n测试用例列表:');
    testSuite.forEach(tc => {
      console.log(`- [${tc.priority}] ${tc.id}: ${tc.name}`);
    });
    
    // 保存到文件
    const fs = await import('fs');
    const path = await import('path');
    const outputPath = path.join(process.cwd(), 'tests', 'generated-tests.json');
    
    fs.writeFileSync(
      outputPath,
      generator.exportTestCases(testSuite)
    );
    console.log(`\n📝 测试用例已保存到 ${outputPath}`);
  })();
}
