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
  // 自然语言描述（AI 自动定位）
  target?: string;
  // 备选：CSS 选择器（可选）
  selector?: string;
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
          { name: '页面加载', target: '查看仪表盘页面', expected: '显示4个数据卡片' }
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
          { name: '查看列表', target: '查看页面上的菜品表格', expected: '显示菜品表格' },
          { name: '搜索菜品', target: '在搜索框中输入', input: '披萨', expected: '筛选结果包含披萨' }
        ],
        validations: []
      },
      {
        name: '添加菜品',
        type: 'form',
        actions: [
          { name: '打开表单', target: '点击"添加菜品"按钮', expected: '弹出表单' },
          { name: '填写名称', target: '在菜品名称输入框中输入', input: '测试菜品', expected: '输入成功' },
          { name: '填写价格', target: '在价格输入框中输入', input: '99', expected: '输入成功' },
          { name: '选择分类', target: '在分类下拉框中选择', input: '主菜', expected: '选择成功' },
          { name: '提交表单', target: '点击确定按钮', expected: '添加成功提示' }
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
          { name: '点击编辑', target: '点击第一行的编辑按钮', expected: '打开编辑表单' },
          { name: '修改价格', target: '修改价格输入框的值', input: '120', expected: '修改成功' },
          { name: '保存修改', target: '点击确定按钮保存', expected: '更新成功' }
        ],
        validations: []
      },
      {
        name: '删除菜品',
        type: 'modal',
        actions: [
          { name: '点击删除', target: '点击第一行的删除按钮', expected: '弹出确认框' },
          { name: '确认删除', target: '在弹窗中点击确定按钮', expected: '删除成功' }
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
          { name: '查看订单', target: '查看页面上的订单表格', expected: '显示订单列表' },
          { name: '筛选状态', target: '在状态筛选下拉框中选择', input: '待处理', expected: '显示待处理订单' }
        ],
        validations: []
      },
      {
        name: '订单状态更新',
        type: 'form',
        actions: [
          { name: '更改状态', target: '点击"处理中"按钮', expected: '状态更新成功' }
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
          { name: '查看预订', target: '查看页面上的预订表格', expected: '显示预订信息' }
        ],
        validations: []
      },
      {
        name: '新增预订',
        type: 'form',
        actions: [
          { name: '打开表单', target: '点击新增按钮', expected: '显示表单' },
          { name: '填写信息', target: '在顾客姓名输入框中输入', input: '张三', expected: '输入成功' },
          { name: '选择时间', target: '在时间选择器中选择', input: '2024-01-01 18:00', expected: '时间选择成功' }
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
          { name: '查看库存', target: '查看页面上的库存表格', expected: '显示库存数据' },
          { name: '低库存提醒', target: '查看低库存预警标识', expected: '显示警告标识' }
        ],
        validations: []
      },
      {
        name: '更新库存',
        type: 'form',
        actions: [
          { name: '修改数量', target: '在数量输入框中输入', input: '100', expected: '更新成功' }
        ],
        validations: [
          { field: 'quantity', rules: ['required', 'number', 'min:0'], errorMessage: '请输入有效数量' }
        ]
      }
    ]
  }
];
