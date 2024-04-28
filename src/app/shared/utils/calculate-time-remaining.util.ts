import { DateTime } from 'luxon';

const pad = (value: number): string => (value < 10 ? `0${value}` : `${value}`);

export const calculateTimeRemaining = (date: DateTime | null): string => {
  if (!date) return '00m 00s';

  const now = DateTime.local();

  const diff = date.diff(now, ['hours', 'minutes', 'seconds']);

  const hours = Math.max(0, diff.hours);
  const minutes = Math.max(0, diff.minutes);
  const seconds = Math.floor(Math.max(0, diff.seconds));

  return `${hours ? `${pad(hours)}h` : ''} ${pad(minutes)}m ${pad(seconds)}s`;
};
