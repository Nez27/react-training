/**
 * Convert value to currency format with value
 * @param value Value need to be converted
 * @returns Return the string value with currency
 */
const formatCurrency = (value: number): string => {
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};


/**
 * Calculate the day durations
 * @param startDate The start of date
 * @param endDate The end of date
 * @returns The number of days between 2 date input
 */
const getDayDiff = (startDate: Date, endDate: Date): number => {
  const msInDay = 24 * 60 * 60 * 1000;

  if(endDate > startDate) {
    return Math.round(
      Math.abs(Number(endDate) - Number(startDate)) / msInDay
    );
  }

  return 0;
}

export {
  formatCurrency,
  getDayDiff,
};
