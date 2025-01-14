export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const today =
  new Date().getMonth() +
  1 +
  "." +
  new Date().getDate() +
  "." +
  new Date().getFullYear();

export const getMonthName = (month: any) => {
  const d = new Date();
  d.setMonth(month);
  const monthName = d.toLocaleString("default", { month: "long" });
  return monthName;
};
