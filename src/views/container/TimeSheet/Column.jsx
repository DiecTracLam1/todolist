
const {
  CheckOutlined,
  FileTextOutlined,
  FormOutlined,
  DeleteOutlined,
} = require('@ant-design/icons');
const { Space, Button, Popconfirm } = require('antd');

export const columns = (props) => {
  const columns = [
    {
      title: '#',
      dataIndex: 'num',
      key: 'num',
      render: (value, item, index) => index + 1 + Number((props.page - 1) * props.pageSize),
    },
    {
      title: 'Số Phiếu',
      dataIndex: 'id',
      key: 'id',
      filterKey: 'id',
    },
    {
      title: 'Mã nhân viên',
      dataIndex: 'employeeId',
      key: 'employeeId',
      render: (_, { AdjustEmployerEmployee }) => <p>{AdjustEmployerEmployee.employeeId}</p>,
    },
    {
      title: 'Tên nhân viên',
      dataIndex: 'fullName',
      key: 'fullName',
      filterKey: 'name',
      defaultSearch: 'name',
      render: (_, { AdjustEmployerEmployeeCreate }) => (
        <p>{AdjustEmployerEmployeeCreate.fullName}</p>
      ),
    },
    {
      title: 'Nội dung',
      dataIndex: 'content',
      key: 'content',
      width: 100,
      minWidth: 90,
      filterKey: 'content',
    },
    {
      title: 'Ngày lập',
      key: 'createdAt',
      dataIndex: 'createdAt',
      filterKey: 'createdAt',
      render: (_, { createdAt }) => <p>{new Date(createdAt).toLocaleDateString()}</p>,
    },
    {
      title: 'Người duyệt',
      key: 'AdjustEmployerAppDetail',
      dataIndex: 'AdjustEmployerAppDetail',
      width: 120,
      render: (_, { AdjustEmployerAppDetail }) => (
        <p>{AdjustEmployerAppDetail.ProAppDetailEmployeeApprover.fullName}</p>
      ),
    },
    {
      title: 'Trạng thái',
      key: 'status',
      dataIndex: 'status',
      render: (_, { status }) => (
        <p style={{ color: status ? 'blue' : 'red' }}>{status ? 'Progressing' : 'Not Progress'}</p>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, timesheet) => {
        const {
          openConfirm,
          confirmDeleLoading,
          setOpenConfirm,
          handleButtonDone,
          handleDetail,
          handleEdit,
          handleDelete,
        } = props;
        return (
          <Space size="small">
            <Button
              onClick={() => handleButtonDone(timesheet)}
              style={{ backgroundColor: '#a0d911' }}
              icon={<CheckOutlined />}
            ></Button>
            <Button
              onClick={() => handleDetail(timesheet)}
              style={{ backgroundColor: '#1677ff' }}
              icon={<FileTextOutlined />}
            ></Button>
            <Button
              onClick={() => handleEdit(timesheet)}
              style={{ backgroundColor: '#fadb14' }}
              icon={<FormOutlined />}
            ></Button>

            <Popconfirm
              description="Người dùng chắc chắn muốn xóa không ?"
              open={openConfirm[timesheet?.id]}
              icon={false}
              onConfirm={() => handleDelete(timesheet?.id)}
              okButtonProps={{
                loading: confirmDeleLoading,
              }}
              onCancel={() =>
                setOpenConfirm((prev) => ({
                  ...prev,
                  [timesheet?.id]: false,
                }))
              }
            >
              <Button
                onClick={() =>
                  setOpenConfirm((prev) => ({
                    ...prev,
                    [timesheet?.id]: !openConfirm[timesheet?.id],
                  }))
                }
                style={{ backgroundColor: '#f5222d' }}
                icon={<DeleteOutlined />}
              ></Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  return columns;
};
