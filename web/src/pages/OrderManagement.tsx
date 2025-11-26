import { useState } from 'react';
import { Table, Button, Tag, Space, Modal, Descriptions } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface Order {
  key: string;
  orderNo: string;
  table: string;
  items: string[];
  totalAmount: number;
  status: 'pending' | 'cooking' | 'completed' | 'cancelled';
  createTime: string;
}

export default function OrderManagement() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const orders: Order[] = [
    {
      key: '1',
      orderNo: 'ORD001',
      table: '桌号 5',
      items: ['意大利面', '提拉米苏', '红酒'],
      totalAmount: 256,
      status: 'completed',
      createTime: '2025-11-26 12:30',
    },
    {
      key: '2',
      orderNo: 'ORD002',
      table: '桌号 3',
      items: ['玛格丽特披萨', '可乐'],
      totalAmount: 118,
      status: 'cooking',
      createTime: '2025-11-26 13:15',
    },
    {
      key: '3',
      orderNo: 'ORD003',
      table: '桌号 8',
      items: ['海鲜意面', '意式浓缩'],
      totalAmount: 156,
      status: 'pending',
      createTime: '2025-11-26 13:45',
    },
  ];

  const statusMap = {
    pending: { text: '待处理', color: 'orange' },
    cooking: { text: '制作中', color: 'blue' },
    completed: { text: '已完成', color: 'green' },
    cancelled: { text: '已取消', color: 'red' },
  };

  const handleViewDetail = (record: Order) => {
    setSelectedOrder(record);
    setIsModalOpen(true);
  };

  const columns: ColumnsType<Order> = [
    { title: '订单号', dataIndex: 'orderNo', key: 'orderNo' },
    { title: '桌号', dataIndex: 'table', key: 'table' },
    { title: '菜品数量', dataIndex: 'items', key: 'items', render: (items) => items.length },
    { title: '总金额', dataIndex: 'totalAmount', key: 'totalAmount', render: (val) => `¥${val}` },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={statusMap[status].color}>{statusMap[status].text}</Tag>
      ),
    },
    { title: '下单时间', dataIndex: 'createTime', key: 'createTime' },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button type="link" icon={<EyeOutlined />} onClick={() => handleViewDetail(record)}>
            查看详情
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div data-testid="orders-page">
      <h2>订单管理</h2>
      <Table columns={columns} dataSource={orders} />
      
      <Modal
        title="订单详情"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalOpen(false)}>
            关闭
          </Button>,
        ]}
      >
        {selectedOrder && (
          <Descriptions column={1}>
            <Descriptions.Item label="订单号">{selectedOrder.orderNo}</Descriptions.Item>
            <Descriptions.Item label="桌号">{selectedOrder.table}</Descriptions.Item>
            <Descriptions.Item label="菜品">
              {selectedOrder.items.join(', ')}
            </Descriptions.Item>
            <Descriptions.Item label="总金额">¥{selectedOrder.totalAmount}</Descriptions.Item>
            <Descriptions.Item label="状态">
              <Tag color={statusMap[selectedOrder.status].color}>
                {statusMap[selectedOrder.status].text}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="下单时间">{selectedOrder.createTime}</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
}
