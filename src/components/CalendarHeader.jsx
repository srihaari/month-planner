function CalendarHeader({ currentMonth, onPrev, onNext, onToday }) {
  const monthName = currentMonth.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="calendar-header">
      <div className="calendar-header-left">
        <button onClick={onPrev} className="btn">
          ◀
        </button>
        <button onClick={onToday} className="btn">
          Today
        </button>
        <button onClick={onNext} className="btn">
          ▶
        </button>
      </div>
      <div className="calendar-header-right">{monthName}</div>
    </div>
  );
}

export default CalendarHeader;
