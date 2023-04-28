const fieldlist = ({ timesheetLocation, employee, timesheetName, handleSelectTimeSheet }) => [
  { label: 'Số phiếu', name: 'note', value: timesheetLocation?.id, type: 'input', disabled: true },
  { label: 'Mã nhân viên', name: 'employID', value: employee?.id, type: 'input' },
  { label: 'Tên nhân viên', name: 'employName', value: employee?.fullName, type: 'input' },
  {
    label: 'Phòng ban',
    name: 'department',
    value: employee?.departmentId,
    type: 'select',
    options: [
      { value: 'PB008', label: 'Phòng IT' },
      { value: 'PB005', label: 'Phòng pháp lý' },
    ],
  },
  {
    label: 'Chức danh',
    name: 'position',
    value: employee?.positionId,
    type: 'select',
    options: [
      { value: 'CD027', label: 'Lập trình viên' },
      { value: 'CD013', label: 'Tổng giám đốc' },
    ],
  },
  {
    label: 'Ngày vào làm',
    name: 'dateIn',
    value: employee?.createdAt,
    type: 'date',
    disabled: true,
  },
  {
    label: 'Chọn bảng công',
    name: 'timesheetName',
    options: timesheetName,
    type: 'select',
    handleSelect: handleSelectTimeSheet,
  },
  { label: 'Nội dụng', name: 'content', value: timesheetLocation?.content, type: 'input' },
  {
    label: 'Ngày lập',
    name: 'createDate',
    value: timesheetLocation?.createdAt,
    type: 'date',
    require: true,
  },
];
export default fieldlist;
