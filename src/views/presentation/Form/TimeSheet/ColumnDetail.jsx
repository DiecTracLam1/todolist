import { InputNumber } from 'antd';

export const columns = (props) => {
  const columns = [
    {
      title: 'Dữ liệu',
      children: [
        {
          title: 'Thứ - Ngày',
          dataIndex: 'timesheetsDetailDay',
          key: 'timesheetsDetailDay',
          render: (_, timesheet, index) => {
            const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
            const d = new Date(
              `${timesheet.timesheetsDetailMonth} ${timesheet.timesheetsDetailDay}, ${timesheet.timesheetsDetailYear}`
            );
            return (
              <p key={index} style={{ color: !d.getDay() && 'red' }}>
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
      children: [
        {
          title: 'Hành chính',
          dataIndex: 'workingHourEdit',
          key: 'workingHourEdit',
          width: '110px',
          render: (_, timesheet, index) => (
            <InputNumber
              value={timesheet?.workingHourEdit}
              key={index}
              max={24}
              onChange={(values) => props.handleWorkingHour(values, index)}
              style={{ width: '100px' }}
            />
          ),
        },
        {
          title: 'Tăng ca',
          dataIndex: 'overtimeEdit',
          key: 'overtimeEdit',
          width: '110px',
          render: (_, timesheet, index) => (
            <InputNumber
              value={timesheet?.overtimeEdit}
              key={index}
              max={24}
              onChange={(values) => props.handleOvertime(values, index)}
              style={{ width: '100px' }}
            />
          ),
        },
      ],
    },
  ];
  return columns;
};
