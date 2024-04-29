export const truncateName = (name) => {
  if (name.length > 30) {
    return name.slice(0, 30) + "...";
  } else {
    return name;
  }
};

export const formatCurrency = (amount) => {
  const roundedAmount = Math.ceil(amount * 100) / 100;
  return roundedAmount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
