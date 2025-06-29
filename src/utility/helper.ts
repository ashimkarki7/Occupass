import dayjs from 'dayjs';


export const formatDate = (dateStr: string): string => {
  const match = /\/Date\((\d+)(?:[+-]\d+)?\)\//.exec(dateStr);
  if (!match) return dateStr;
  const timestamp = parseInt(match[1], 10);
  return dayjs(timestamp).format('MM/DD/YYYY');
};
