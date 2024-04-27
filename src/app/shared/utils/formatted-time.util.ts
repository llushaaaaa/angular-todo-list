interface IFormattedTime {
  hours: number;
  minutes: number;
}

export const formattedTime = (value: string): IFormattedTime => {
  const hours = Number(value.substring(0, 2));
  const minutes = Number(value.substring(2, 4));

  return { hours, minutes };
};
