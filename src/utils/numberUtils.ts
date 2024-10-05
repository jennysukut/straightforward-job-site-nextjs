export const parseAmount = (amount: string | number): number => {
  if (typeof amount === "number") return amount;
  return parseFloat(amount.replace(/[^0-9.]/g, "")) || 0;
};

export const calculatePercentage = ({ currentAmount, targetAmount }: any) => {
  const percentage = (currentAmount / targetAmount) * 100;
  return percentage.toFixed(1);
};
