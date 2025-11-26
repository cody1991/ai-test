import { Card, Row, Col, Statistic, Table } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface OrderData {
  key: string;
  orderNo: string;
  table: string;
  items: string;
  amount: number;
  status: string;
}

export default function Dashboard() {
  const recentOrders: OrderData[] = [
    { key: '1', orderNo: 'ORD001', table: '桌号 5', items: '意大利面, 提拉米苏', amount: 168, status: '已完成' },
    { key: '2', orderNo: 'ORD002', table: '桌号 3', items: '玛格丽特披萨', amount: 98, status: '制作中' },
    { key: '3', orderNo: 'ORD003', table: '桌号 8', items: '海鲜意面, 红酒', amount: 256, status: '已完成' },
  ];

  const columns: ColumnsType<OrderData> = [
    { title: '订单号', dataIndex: 'orderNo', key: 'orderNo' },
    { title: '桌号', dataIndex: 'table', key: 'table' },
    { title: '菜品', dataIndex: 'items', key: 'items' },
    { title: '金额', dataIndex: 'amount', key: 'amount', render: (val) => `¥${val}` },
    { title: '状态', dataIndex: 'status', key: 'status' },
  ];

  return (
    <div data-testid="dashboard-page">
      <h2>仪表盘</h2>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="今日营业额"
              value={12580}
              precision={2}
              prefix="¥"
              valueStyle={{ color: '#3f8600' }}
              suffix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="今日订单"
              value={45}
              valueStyle={{ color: '#3f8600' }}
              suffix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="预订数量"
              value={12}
              valueStyle={{ color: '#cf1322' }}
              suffix={<ArrowDownOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="库存预警"
              value={3}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
      </Row>
      <Card title="最近订单" style={{ marginTop: 24 }}>
        <Table columns={columns} dataSource={recentOrders} pagination={false} />
      </Card>
    </div>
  );
}
