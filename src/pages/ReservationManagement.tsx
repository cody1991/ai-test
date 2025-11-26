import { Table, Button, Tag, Space } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface Reservation {
  key: string;
  guestName: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  status: 'confirmed' | 'pending' | 'cancelled';
}

export default function ReservationManagement() {
  const reservations: Reservation[] = [
    {
      key: '1',
      guestName: '张三',
      phone: '138****5678',
      date: '2025-11-27',
      time: '18:00',
      guests: 4,
      status: 'confirmed',
    },
    {
      key: '2',
      guestName: '李四',
      phone: '139****1234',
      date: '2025-11-27',
      time: '19:30',
      guests: 2,
      status: 'pending',
    },
    {
      key: '3',
      guestName: '王五',
      phone: '136****9876',
      date: '2025-11-28',
      time: '12:00',
      guests: 6,
      status: 'confirmed',
    },
  ];

  const statusMap = {
    confirmed: { text: '已确认', color: 'green' },
    pending: { text: '待确认', color: 'orange' },
    cancelled: { text: '已取消', color: 'red' },
  };

  const columns: ColumnsType<Reservation> = [
    { title: '客人姓名', dataIndex: 'guestName', key: 'guestName' },
    { title: '联系电话', dataIndex: 'phone', key: 'phone' },
    { title: '预订日期', dataIndex: 'date', key: 'date' },
    { title: '预订时间', dataIndex: 'time', key: 'time' },
    { title: '人数', dataIndex: 'guests', key: 'guests' },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={statusMap[status].color}>{statusMap[status].text}</Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space>
          <Button type="link" icon={<CheckOutlined />}>
            确认
          </Button>
          <Button type="link" danger icon={<CloseOutlined />}>
            取消
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div data-testid="reservations-page">
      <h2>预订管理</h2>
      <Table columns={columns} dataSource={reservations} />
    </div>
  );
}
