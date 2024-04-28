import { DateTime } from 'luxon';

export const isToday = (date: DateTime): boolean => {
  const today = DateTime.local();
  return today.hasSame(date, 'day');
};
