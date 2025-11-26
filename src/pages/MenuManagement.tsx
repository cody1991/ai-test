import { useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Select, Space, Tag, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface MenuItem {
  key: string;
  name: string;
  category: string;
  price: number;
  description: string;
  status: 'available' | 'unavailable';
}

export default function MenuManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { key: '1', name: '玛格丽特披萨', category: '披萨', price: 98, description: '经典番茄奶酪披萨', status: 'available' },
    { key: '2', name: '海鲜意面', category: '意面', price: 128, description: '新鲜海鲜配白酱', status: 'available' },
    { key: '3', name: '提拉米苏', category: '甜点', price: 48, description: '意式经典甜点', status: 'available' },
    { key: '4', name: '意式浓缩咖啡', category: '饮品', price: 28, description: '纯正意式咖啡', status: 'unavailable' },
  ]);

  const handleAdd = () => {
    setEditingItem(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record: MenuItem) => {
    setEditingItem(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleDelete = (key: string) => {
    setMenuItems(menuItems.filter(item => item.key !== key));
    message.success('删除成功');
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      if (editingItem) {
        setMenuItems(menuItems.map(item => 
          item.key === editingItem.key ? { ...item, ...values } : item
        ));
        message.success('更新成功');
      } else {
        const newItem = { ...values, key: Date.now().toString() };
        setMenuItems([...menuItems, newItem]);
        message.success('添加成功');
      }
      setIsModalOpen(false);
    });
  };

  const columns: ColumnsType<MenuItem> = [
    { title: '菜品名称', dataIndex: 'name', key: 'name' },
    { title: '分类', dataIndex: 'category', key: 'category' },
    { title: '价格', dataIndex: 'price', key: 'price', render: (val) => `¥${val}` },
    { title: '描述', dataIndex: 'description', key: 'description' },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'available' ? 'green' : 'red'}>
          {status === 'available' ? '可售' : '已售罄'}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Button type="link" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.key)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div data-testid="menu-page">
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          添加菜品
        </Button>
      </div>
      <Table columns={columns} dataSource={menuItems} />
      
      <Modal
        title={editingItem ? '编辑菜品' : '添加菜品'}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="菜品名称" rules={[{ required: true }]}>
            <Input placeholder="请输入菜品名称" />
          </Form.Item>
          <Form.Item name="category" label="分类" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="披萨">披萨</Select.Option>
              <Select.Option value="意面">意面</Select.Option>
              <Select.Option value="甜点">甜点</Select.Option>
              <Select.Option value="饮品">饮品</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="price" label="价格" rules={[{ required: true }]}>
            <InputNumber min={0} style={{ width: '100%' }} prefix="¥" />
          </Form.Item>
          <Form.Item name="description" label="描述">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item name="status" label="状态" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="available">可售</Select.Option>
              <Select.Option value="unavailable">已售罄</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
