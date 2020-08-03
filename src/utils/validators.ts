export const required = (value: string): string | undefined => {
  if (value) return undefined;
  return "Field can not be empty";
};

const maxLength = (length: number) => (value: string) => {
  if (length >= value.length) return undefined;
  return "Maximal count of symbols is " + length;
};

export const maxLength50 = maxLength(50);
