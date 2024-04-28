interface IFormattedDate {
  month: number;
  day: number;
  year: number;
}

export const formattedDate = (value: string): IFormattedDate => {
  const [month, day, year] = value.split('/');

  return { month: Number(month), day: Number(day), year: Number(year) };
};
