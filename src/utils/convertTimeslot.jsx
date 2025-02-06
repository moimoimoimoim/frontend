export const convertToSlot = (day, time) => {
  if (!time) return null;
  const [hours, minutes] = time.split(":").map(Number);
  return (day - 1) * 48 + hours * 2 + (minutes === 30 ? 1 : 0);
};

const days = ["월", "화", "수", "목", "금", "토", "일"];

export const convertToTime = (slot) => {
  return [
    days[Math.floor(slot / 48)], // day
    Math.floor((slot % 48) / 2)
      .toString()
      .padStart(2, "0"), // hour
    ((slot % 48) % 2 ? 30 : 0).toString().padStart(2, "0"), // minute
  ];
};
