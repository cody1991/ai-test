import { Table, Tag, Progress } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface InventoryItem {
  key: string;
  name: string;
  category: string;
  stock: number;
  unit: string;
  minStock: number;
  status: 'normal' | 'low' | 'out';
}

export default function InventoryManagement() {
  const inventory: InventoryItem[] = [
    { key: '1', name: '番茄酱', category: '调料', stock: 50, unit: '瓶', minStock: 20, status: 'normal' },
    { key: '2', name: '奶酪', category: '食材', stock: 15, unit: 'kg', minStock: 10, status: 'low' },
    { key: '3', name: '意面', category: '食材', stock: 80, unit: 'kg', minStock: 30, status: 'normal' },
    { key: '4', name: '橄榄油', category: '调料', stock: 5, unit: '瓶', minStock: 15, status: 'out' },
    { key: '5', name: '红酒', category: '饮品', stock: 24, unit: '瓶', minStock: 20, status: 'normal' },
  ];

  const statusMap = {
    normal: { text: '充足', color: 'green' },
    low: { text: '偏低', color: 'orange' },
    out: { text: '缺货', color: 'red' },
  };

  const columns: ColumnsType<InventoryItem> = [
    { title: '物品名称', dataIndex: 'name', key: 'name' },
    { title: '分类', dataIndex: 'category', key: 'category' },
    {
      title: '库存',
      dataIndex: 'stock',
      key: 'stock',
      render: (stock, record) => `${stock} ${record.unit}`,
    },
    {
      title: '最低库存',
      dataIndex: 'minStock',
      key: 'minStock',
      render: (minStock, record) => `${minStock} ${record.unit}`,
    },
    {
      title: '库存状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={statusMap[status].color}>{statusMap[status].text}</Tag>
      ),
    },
    {
      title: '库存率',
      key: 'stockRate',
      render: (_, record) => {
        const percent = Math.min((record.stock / record.minStock) * 100, 100);
        return (
          <Progress
            percent={Number(percent.toFixed(0))}
            status={record.status === 'out' ? 'exception' : record.status === 'low' ? 'normal' : 'success'}
          />
        );
      },
    },
  ];

  return (
    <div data-testid="inventory-page">
      <h2>库存管理</h2>
      <Table columns={columns} dataSource={inventory} />
    </div>
  );
}
