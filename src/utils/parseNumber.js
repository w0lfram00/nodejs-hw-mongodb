export const parseNumber = (number, defaultValue) => {
  if (!(typeof number === 'string')) return defaultValue;

  const parsedNumber = parseInt(number);
  if (Number.isNaN(parsedNumber)) {
    return defaultValue;
  }
  return number;
};
