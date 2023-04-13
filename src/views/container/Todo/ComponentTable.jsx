import { forwardRef, useImperativeHandle } from 'react';
import { Table } from 'antd';
import { columns } from '~/features/antd/tableColumn';

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
