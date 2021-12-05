 export const getPercentage: (current: number, max: number) => number = (
  current,
  max
) => {
  return (100 * current) / max;
};

export const getValue: (percentage: number, max: number) => number = (
  percentage,
  max
) => {
  return (max / 100) * percentage;
};

export const getWidth: (percentage: number) => string = (percentage) => {
  return `${percentage}%`;
};
