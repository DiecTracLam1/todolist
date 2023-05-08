import dayjs from 'dayjs';

const fieldlist = ({ timesheetLocation, employee, timesheetDate , defaultSelected}) => [
  {
    label: 'Số phiếu',
    name: 'noteId',
    value: timesheetLocation?.id,
    type: 'input',
    disabled: true,
  },
  { label: 'Mã nhân viên', name: 'employeeId', value: employee?.id, type: 'input', disabled: true },
  {
    label: 'Tên nhân viên',
    name: 'employName',
    value: employee?.fullName,
    type: 'input',
    disabled: true,
  },
  {
    label: 'Phòng ban',
    name: 'departmentId',
    value: employee?.departmentId,
    type: 'select',
    options: [
      { value: 'PB008', label: 'Phòng IT' },
      { value: 'PB005', label: 'Phòng pháp lý' },
    ],
    disabled: true,
  },
  {
    label: 'Chức danh',
    name: 'positionId',
    value: employee?.positionId,
    type: 'select',
    options: [
      { value: 'CD027', label: 'Lập trình viên' },
      { value: 'CD013', label: 'Tổng giám đốc' },
    ],
    disabled: true,
  },
  {
    label: 'Ngày vào làm',
    name: 'dateIn',
    value: employee?.createdAt ? dayjs(new Date(employee?.createdAt)) : '',
    type: 'date',
    disabled: true,
  },
  {
    label: 'Chọn bảng công',
    name: 'timesheetDate',
    value : defaultSelected ?? "" ,
    options: timesheetDate,
    type: 'select',
  },
  { label: 'Nội dụng', name: 'content', value: timesheetLocation?.content, type: 'input' },
  {
    label: 'Ngày lập',
    name: 'createDate',
    value: timesheetLocation?.createdAt ? dayjs(new Date(timesheetLocation?.createdAt)) : '',
    type: 'date',
    disabled: true,
  },
];
export default fieldlist;
