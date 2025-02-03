export const convertToSlot = (day, time) => {
  if (!time) return null;
  const [hours, minutes] = time.split(":").map(Number);
  return (day - 1) * 48 + hours * 2 + (minutes === 30 ? 1 : 0);
};
