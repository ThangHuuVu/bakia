export const format = (amount: number, abbr: string) => {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: abbr,
  });
  return formatter.format(amount);
};
