const {
  CheckOutlined,
  FileTextOutlined,
  FormOutlined,
  DeleteOutlined,
} = require('@ant-design/icons');
const { Space, Button } = require('antd');

export const columns = (props) => {
  const columns = [
    {
      title: '#',
      dataIndex: 'num',
      key: 'num',
      render: (value, item, index) => index + 1 + props.offset,
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      filterKey: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: 90,
      minWidth: 80,
      key: 'name',
      filterKey: 'name',
      defaultSearch: 'name',
    },
    {
      title: 'Owner',
      dataIndex: 'BrandEmployeeCreate',
      key: 'BrandEmployeeCreate',
      filterKey: 'fullName',
      render: (_, { BrandEmployeeCreate }) => <p>{BrandEmployeeCreate?.fullName}</p>,
    },
    {
      title: 'Date',
      key: 'createdAt',
      dataIndex: 'createdAt',
      filterKey: 'createdAt',
      render: (_, { createdAt }) => <p>{new Date(createdAt).toLocaleDateString()}</p>,
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (_, { status }) => (
        <p style={{ color: status ? 'blue' : 'red' }}>{status ? 'Progressing' : 'Not Progress'}</p>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, todo) => {
        return (
          <Space size="small">
            <Button
              onClick={() => props.handleButtonDone(todo)}
              style={{ backgroundColor: '#a0d911' }}
              icon={<CheckOutlined />}
            ></Button>
            <Button
              onClick={() => props.handleDetail(todo)}
              style={{ backgroundColor: '#1677ff' }}
              icon={<FileTextOutlined />}
            ></Button>
            <Button
              onClick={() => props.handleEdit(todo)}
              style={{ backgroundColor: '#fadb14' }}
              icon={<FormOutlined />}
            ></Button>
            <Button
              onClick={() => props.handleDelete(todo?.id)}
              style={{ backgroundColor: '#f5222d' }}
              icon={<DeleteOutlined />}
            ></Button>
          </Space>
        );
      },
    },
  ];
  return columns;
};
