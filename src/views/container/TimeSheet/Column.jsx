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
        render: (value, item, index) => index + 1 ,
      },
      {
        title: 'Số Phiếu',
        dataIndex: 'id',
        key: 'id',
        filterKey: 'id',
      },
      {
        title : "Mã nhân viên",
        dataIndex : 'employeeId',
        key:'employeeId',
        render: (_, {AdjustEmployerEmployee}) => <p>{AdjustEmployerEmployee.employeeId}</p>
      },
      {
        title: 'Tên nhân viên',
        dataIndex: 'fullName',
        key: 'fullName',
        filterKey: 'name',
        defaultSearch: 'name',
        render: (_, {AdjustEmployerEmployeeCreate}) => <p>{AdjustEmployerEmployeeCreate.fullName}</p>
      },
      {
        title: 'Nội dung',
        dataIndex: 'content',
        key: 'content',
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
        render: (_, { AdjustEmployerAppDetail }) => (
          <p >{AdjustEmployerAppDetail.ProAppDetailEmployeeApprover.fullName}</p>
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
    //   {
    //     title: 'Action',
    //     key: 'action',
    //     render: (_, todo) => {
    //       return (
    //         <Space size="small">
    //           <Button
    //             onClick={() => props.handleButtonDone(todo)}
    //             style={{ backgroundColor: '#a0d911' }}
    //             icon={<CheckOutlined />}
    //           ></Button>
    //           <Button
    //             onClick={() => props.handleDetail(todo)}
    //             style={{ backgroundColor: '#1677ff' }}
    //             icon={<FileTextOutlined />}
    //           ></Button>
    //           <Button
    //             onClick={() => props.handleEdit(todo)}
    //             style={{ backgroundColor: '#fadb14' }}
    //             icon={<FormOutlined />}
    //           ></Button>
    //           <Button
    //             onClick={() => props.handleDelete(todo?.id)}
    //             style={{ backgroundColor: '#f5222d' }}
    //             icon={<DeleteOutlined />}
    //           ></Button>
    //         </Space>
    //       );
    //     },
    //   },
    ];
    return columns;
  };
  