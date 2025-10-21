export const filterContentByKeyword = <T extends { title?: string; description?: string }>(
  content: T[],
  keyword?: string
): T[] => {
  if (!keyword || keyword.trim() === '') return content;
  const k = keyword.toLowerCase();
  return content.filter(
    item =>
      (item.title ?? '').toLowerCase().includes(k) ||
      (item.description ?? '').toLowerCase().includes(k)
  );
};

export const sortContentByDate = <T extends { date?: string | number | Date }>(
  content: T[],
  ascending = true
): T[] => {
  // copy to avoid mutating original array
  return [...content].sort((a, b) => {
    const timeA = a.date ? new Date(a.date).getTime() : 0;
    const timeB = b.date ? new Date(b.date).getTime() : 0;
    return ascending ? timeA - timeB : timeB - timeA;
  });
};

export const paginateContent = <T>(content: T[], pageSize: number, pageNumber: number): T[] => {
  const startIndex = pageSize * Math.max(0, pageNumber - 1);
  return content.slice(startIndex, startIndex + pageSize);
};
