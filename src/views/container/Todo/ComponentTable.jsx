import { Table } from 'antd';
import { forwardRef } from 'react';

const ComponentTable = forwardRef(({ NewTodoList, column }, ref) => {
  console.log(column)
  return (
    <Table
      rowKey="id"
      columns={column}
      dataSource={NewTodoList}
      pagination={false}
      scroll={{ x: true, y: '420px' }}
      bordered
      ref={ref}
    />
  );
});

export default ComponentTable;
