interface IFormattedDate {
  month: number;
  day: number;
  year: number;
}

export const formattedDate = (value: string): IFormattedDate => {
  const month = Number(value.substring(0, 2));
  const day = Number(value.substring(2, 4));
  const year = Number(value.substring(4));

  return { month, day, year };
};
