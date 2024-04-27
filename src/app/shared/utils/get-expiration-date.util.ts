import { DateTime } from 'luxon';
import { formattedDate } from './formatted-date.util';
import { formattedTime } from './formatted-time.util';

export const getExpirationDate = (date: string, time: string): DateTime => {
  const { month, day, year } = formattedDate(date);
  const { hours: hour, minutes: minute } = formattedTime(time);

  return DateTime.now().set({
    month,
    day,
    year,
    hour,
    minute,
    second: 0,
    millisecond: 0,
  });
};
