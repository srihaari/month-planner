function TaskChip({ task, onStatusToggle }) {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", task.id);
  };

  return (
    <div
      className={`task-chip task-chip--${task.status.toLowerCase()}`}
      draggable
      onDragStart={handleDragStart}
      onClick={onStatusToggle}
      title="Click to cycle status • Drag to move"
    >
      <div className="task-title">{task.title}</div>
      <div className="task-meta">
        <span className="task-label">{task.label}</span>
        <span className="task-status">{task.status}</span>
      </div>
    </div>
  );
}

export default TaskChip;
