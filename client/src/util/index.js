export const formatDateTime = timestamp => {
  if (timestamp) {
    const timeString = new Date(timestamp);
    const [date, month, time] = [
      timeString.toLocaleString("en-us", { month: "long" }),
      timeString.getMonth() + 1,
      timeString.getHours() + ":" + timeString.getMinutes()
    ];
    const finalTime = `${month} ${date} • ${time}`;
    return finalTime;
  }
};
