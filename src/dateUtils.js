export function getMonthMatrix(year, month) {
  // month is 0-11
  const firstDayOfMonth = new Date(year, month, 1);
  const startDay = firstDayOfMonth.getDay(); // 0 = Sunday

  // Start from the Sunday of the first week that includes the 1st
  const startDate = new Date(year, month, 1 - startDay);

  const weeks = [];
  let current = new Date(startDate);

  for (let w = 0; w < 6; w++) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      week.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    weeks.push(week);
  }

  return weeks;
}

export function isSameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isSameMonth(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

export function formatDateISO(date) {
  // yyyy-mm-dd
  return date.toISOString().split("T")[0];
}
