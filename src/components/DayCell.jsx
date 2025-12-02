import TaskChip from "./TaskChip";

function DayCell({
  date,
  isToday,
  isCurrentMonth,
  tasks,
  onAddTask,
  onDropTask,
  onTaskStatusToggle,
}) {
  const handleDoubleClick = () => {
    onAddTask(date);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text/plain");
    if (taskId) {
      onDropTask(taskId, date);
    }
  };

  return (
    <div
      className={`day-cell ${!isCurrentMonth ? "day-cell--faded" : ""}`}
      onDoubleClick={handleDoubleClick}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="day-cell-header">
        <span className={`day-number ${isToday ? "day-number--today" : ""}`}>
          {date.getDate()}
        </span>
      </div>

      <div className="day-cell-tasks">
        {tasks.map((task) => (
          <TaskChip
            key={task.id}
            task={task}
            onStatusToggle={() => onTaskStatusToggle(task.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default DayCell;
