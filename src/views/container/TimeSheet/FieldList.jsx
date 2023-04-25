const fieldlist = ({timesheetLocation, employee , timesheetName , handleSelectTimeSheet}) => [
  { label: 'Số phiếu', name: 'note', value: timesheetLocation?.id, type: 'input' },
  { label: 'Mã nhân viên', name: 'employID', value: employee?.id, type: 'input' },
  { label: 'Tên nhân viên', name: 'employName', value: employee?.fullName, type: 'input' },
  {
    label: 'Phòng ban',
    name: 'department',
    value: employee?.EDepartment.name,
    type: 'select',
    options: [{ value: 'P. IT', label: 'Phòng IT' }],
  },
  {
    label: 'Chức danh',
    name: 'position',
    value: employee?.EPosition.name,
    type: 'select',
    options: [{ value: 'TỔNG GIÁM ĐỐC', label: 'Tổng giám đốc' }],
  },
  { label: 'Ngày vào làm', name: 'dateIn', value: employee?.createdAt, type: 'date' },
  { label: 'Chọn bảng công', name: 'timesheetName', options: timesheetName, type: 'select' , handleSelect : handleSelectTimeSheet},
  { label: 'Nội dụng', name: 'content', value: timesheetLocation?.content, type: 'input' },
  { label: 'Ngày lập', name: 'createDate', value: timesheetLocation?.createdAt, type: 'date' },
  
];
export default fieldlist;
