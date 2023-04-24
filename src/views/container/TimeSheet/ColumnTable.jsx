import { Input } from 'antd';

export const columns = (props) => {
  const columns = [
    {
      title: 'Dữ liệu',
      key: 'data',
      children: [
        {
          title: 'Thứ - Ngày',
          dataIndex: 'timesheetsDetailDay',
          key: 'timesheetsDetailDay',
          render: (_, timesheet) => {
            const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
            const d = new Date(
              `${timesheet.timesheetsDetailMonth} ${timesheet.timesheetsDetailDay}, ${timesheet.timesheetsDetailYear}`
            );
            return (
              <p style={{ color: !d.getDay() && 'red' }}>
                {days[d.getDay()]} - {timesheet.timesheetsDetailDay}
              </p>
            );
          },
        },
        {
          title: 'Giờ vào',
          dataIndex: 'timeInData',
          key: 'timeInData',
        },
        {
          title: 'Giờ ra',
          dataIndex: 'timeOutData',
          key: 'timeOutData',
        },
        {
          title: 'Hành chính',
          dataIndex: 'workingHourAnalysis',
          key: 'workingHourAnalysis',
        },
        {
          title: 'Tăng ca',
          dataIndex: 'overtimeAnalysis',
          key: 'overtimeAnalysis',
        },
        {
          title: 'Đi trễ',
          dataIndex: 'lateAnalysis',
          key: 'lateAnalysis',
        },
        {
          title: 'Về sớm',
          dataIndex: 'earlyAnalysis',
          key: 'earlyAnalysis',
        },
      ],
    },
    {
      title: 'Vắng',
      dataIndex: 'holidayAnalysisChar',
      key: 'holidayAnalysisChar',
      filterKey: 'id',
    },
    {
      title: 'Điểu chỉnh',
      key: 'Edditing',
      children: [
        {
          title: 'Hành chính',
          dataIndex: 'workingHourEdit',
          key: 'workingHourEdit',
          width: '110px',
          render: () => <Input style={{ width: '100px' }} />,
        },
        {
          title: 'Tăng ca',
          dataIndex: 'overtimeEdit',
          key: 'overtimeEdit',
          width: '110px',
          render: () => <Input style={{ width: '100px' }} />,
        },
      ],
    },
  ];
  return columns;
};
