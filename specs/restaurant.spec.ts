/**
 * Spec-kit 规则定义 - 餐厅管理系统
 * 
 * Spec-kit 是测试规则的配置文件，定义了：
 * 1. 页面结构和路由
 * 2. 业务规则和验证逻辑
 * 3. 测试覆盖范围
 */

export interface PageSpec {
  name: string;
  path: string;
  description: string;
  features: FeatureSpec[];
}

export interface FeatureSpec {
  name: string;
  type: 'form' | 'table' | 'search' | 'modal' | 'chart';
  actions: ActionSpec[];
  validations: ValidationRule[];
}

export interface ActionSpec {
  name: string;
  selector: string;
  input?: string;
  expected: string;
}

export interface ValidationRule {
  field: string;
  rules: string[];
  errorMessage: string;
}

/**
 * 餐厅管理系统 Spec 配置
 */
export const restaurantSpec: PageSpec[] = [
  {
    name: '仪表盘',
    path: '/dashboard',
    description: '数据概览和关键指标',
    features: [
      {
        name: '数据卡片展示',
        type: 'chart',
        actions: [
          { name: '页面加载', selector: 'body', expected: '显示4个数据卡片' }
        ],
        validations: []
      }
    ]
  },
  {
    name: '菜单管理',
    path: '/menu',
    description: '菜品的增删改查',
    features: [
      {
        name: '菜品列表',
        type: 'table',
        actions: [
          { name: '查看列表', selector: '.ant-table', expected: '显示菜品表格' },
          { name: '搜索菜品', selector: 'input[placeholder*="搜索"]', input: '披萨', expected: '筛选结果包含披萨' }
        ],
        validations: []
      },
      {
        name: '添加菜品',
        type: 'form',
        actions: [
          { name: '打开表单', selector: 'button:contains("添加菜品")', expected: '弹出表单' },
          { name: '填写名称', selector: 'input[id*="name"]', input: '测试菜品', expected: '输入成功' },
          { name: '填写价格', selector: 'input[id*="price"]', input: '99', expected: '输入成功' },
          { name: '选择分类', selector: '.ant-select', input: '主菜', expected: '选择成功' },
          { name: '提交表单', selector: 'button[type="submit"]', expected: '添加成功提示' }
        ],
        validations: [
          { field: 'name', rules: ['required', 'maxLength:50'], errorMessage: '请输入菜品名称' },
          { field: 'price', rules: ['required', 'number', 'min:0'], errorMessage: '请输入有效价格' },
          { field: 'category', rules: ['required'], errorMessage: '请选择分类' }
        ]
      },
      {
        name: '编辑菜品',
        type: 'form',
        actions: [
          { name: '点击编辑', selector: 'button:contains("编辑"):first', expected: '打开编辑表单' },
          { name: '修改价格', selector: 'input[id*="price"]', input: '120', expected: '修改成功' },
          { name: '保存修改', selector: 'button:contains("确定")', expected: '更新成功' }
        ],
        validations: []
      },
      {
        name: '删除菜品',
        type: 'modal',
        actions: [
          { name: '点击删除', selector: 'button:contains("删除"):first', expected: '弹出确认框' },
          { name: '确认删除', selector: '.ant-modal button:contains("确定")', expected: '删除成功' }
        ],
        validations: []
      }
    ]
  },
  {
    name: '订单管理',
    path: '/orders',
    description: '订单处理和状态管理',
    features: [
      {
        name: '订单列表',
        type: 'table',
        actions: [
          { name: '查看订单', selector: '.ant-table', expected: '显示订单列表' },
          { name: '筛选状态', selector: '.ant-select', input: '待处理', expected: '显示待处理订单' }
        ],
        validations: []
      },
      {
        name: '订单状态更新',
        type: 'form',
        actions: [
          { name: '更改状态', selector: 'button:contains("处理中")', expected: '状态更新成功' }
        ],
        validations: []
      }
    ]
  },
  {
    name: '预订管理',
    path: '/reservations',
    description: '餐位预订管理',
    features: [
      {
        name: '预订列表',
        type: 'table',
        actions: [
          { name: '查看预订', selector: '.ant-table', expected: '显示预订信息' }
        ],
        validations: []
      },
      {
        name: '新增预订',
        type: 'form',
        actions: [
          { name: '打开表单', selector: 'button:contains("新增")', expected: '显示表单' },
          { name: '填写信息', selector: 'input[id*="name"]', input: '张三', expected: '输入成功' },
          { name: '选择时间', selector: '.ant-picker', input: '2024-01-01 18:00', expected: '时间选择成功' }
        ],
        validations: [
          { field: 'customerName', rules: ['required'], errorMessage: '请输入顾客姓名' },
          { field: 'time', rules: ['required'], errorMessage: '请选择预订时间' },
          { field: 'guests', rules: ['required', 'number', 'min:1'], errorMessage: '请输入用餐人数' }
        ]
      }
    ]
  },
  {
    name: '库存管理',
    path: '/inventory',
    description: '食材库存管理',
    features: [
      {
        name: '库存列表',
        type: 'table',
        actions: [
          { name: '查看库存', selector: '.ant-table', expected: '显示库存数据' },
          { name: '低库存提醒', selector: '.ant-badge', expected: '显示警告标识' }
        ],
        validations: []
      },
      {
        name: '更新库存',
        type: 'form',
        actions: [
          { name: '修改数量', selector: 'input[type="number"]', input: '100', expected: '更新成功' }
        ],
        validations: [
          { field: 'quantity', rules: ['required', 'number', 'min:0'], errorMessage: '请输入有效数量' }
        ]
      }
    ]
  }
];
