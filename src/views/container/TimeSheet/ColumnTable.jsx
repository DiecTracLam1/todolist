export const columns = (props) => {
  const columns = [
    {
      title: 'Dữ liệu',
      children: [
        {
          title: 'Thứ - Ngày',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Giờ vào',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Giờ ra',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Hành chính',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Tăng ca',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Đi trễ',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Về sớm',
          dataIndex: 'id',
          key: 'id',
        },
      ],
    },
    {
      title: 'Vắng',
      dataIndex: 'id',
      key: 'id',
      filterKey: 'id',
    },
    {
      title : "Điểu chỉnh",
      children:[
          {
            title:"Hành chính",
            dataIndex: 'id',
            key: 'id',
          },
          {
            title:"Tăng ca",
            dataIndex: 'id',
            key: 'id',
        },
      ]
    },
  ];
  return columns;
};
