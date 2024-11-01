export const formatDateToHoursAndMinutes = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const hour = date.getHours();
  const minute = date.getMinutes();

  const dayFomated = (day < 10 ? "0" : "") + day;
  const hourFormated = (hour < 10 ? "0" : "") + hour;
  const minuteFormated = (minute < 10 ? "0" : "") + minute;

  const isDateToday = new Date().getDate() === day;

  return isDateToday
    ? `${hourFormated}:${minuteFormated}`
    : `${dayFomated}/${month}  •  ${hourFormated}:${minuteFormated}`;
};
