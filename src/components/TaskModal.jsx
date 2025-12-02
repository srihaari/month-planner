import { useState } from "react";

function TaskModal({ defaultDate, onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(defaultDate);
  const [status, setStatus] = useState("todo");
  const [label, setLabel] = useState("Work");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({ title, date, status, label });
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Add Task</h2>

        <form onSubmit={handleSubmit} className="modal-form">
          <label>
            Title
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title"
              autoFocus
            />
          </label>

          <label>
            Date
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>

          <div className="modal-row">
            <label>
              Status
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </label>

            <label>
              Label
              <select value={label} onChange={(e) => setLabel(e.target.value)}>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Finance">Finance</option>
              </select>
            </label>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskModal;
