import { forwardRef, useImperativeHandle } from 'react';
import { Table } from 'antd';
import { columns } from '~/features/antd/tableColumn';

const ComponentTable = forwardRef(
  ({ NewTodoList, handleEdit, handleDetail, handleButtonDone, handleDelete }, ref) => {
    const column = columns({ handleEdit, handleDetail, handleButtonDone, handleDelete });
    useImperativeHandle(ref, () => ({
        
      getFilter() {
        return (ref.current = column.filter((coloumn) => coloumn.filterKey));
      },
      getDefaultSearch() {
        return (ref.current = column.find((coloumn) => coloumn.defaultSearch));
      },
    }));
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
  }
);

export default ComponentTable;
