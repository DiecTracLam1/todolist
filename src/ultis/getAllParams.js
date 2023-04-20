export function getAllParams(limit, offset, searchParams = {}) {
  return {
    limit,
    offset,
    searchText: [
      { value: searchParams?.name, key: 'name' },
      { value: searchParams?.id, key: 'id' },
      { value: searchParams?.fullName, key: 'BrandEmployeeCreate.fullName' },
      { value: searchParams?.createdAt, key: 'createdAt' },
    ],
  };
}
