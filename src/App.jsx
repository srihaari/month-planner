import { useMemo, useState } from "react";
import {
  getMonthMatrix,
  isSameDay,
  isSameMonth,
  formatDateISO,
} from "./dateUtils";
import CalendarHeader from "./components/CalendarHeader";
import Filters from "./components/Filters";
import TaskModal from "./components/TaskModal";
import DayCell from "./components/DayCell";

const INITIAL_TASKS = [
  {
    id: "1",
    title: "Project kickoff",
    date: formatDateISO(new Date()),
    status: "todo",
    label: "Work",
  },
  {
    id: "2",
    title: "Gym session",
    date: formatDateISO(new Date()),
    status: "in-progress",
    label: "Personal",
  },
  {
    id: "3",
    title: "Pay bills",
    date: formatDateISO(new Date(new Date().setDate(new Date().getDate() + 2))),
    status: "done",
    label: "Finance",
  },
];

function App() {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [filters, setFilters] = useState({ status: "all", label: "all" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDate, setModalDate] = useState(formatDateISO(new Date()));

  const matrix = useMemo(
    () => getMonthMatrix(currentMonth.getFullYear(), currentMonth.getMonth()),
    [currentMonth]
  );

  const today = new Date();

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      if (filters.status !== "all" && t.status !== filters.status) return false;
      if (filters.label !== "all" && t.label !== filters.label) return false;
      return true;
    });
  }, [tasks, filters]);

  const handlePrevMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
    );
  };

  const handleToday = () => {
    const now = new Date();
    setCurrentMonth(new Date(now.getFullYear(), now.getMonth(), 1));
  };

  const openAddTaskModal = (date) => {
    setModalDate(formatDateISO(date));
    setIsModalOpen(true);
  };

  const handleAddTask = (taskData) => {
    setTasks((prev) => [
      ...prev,
      {
        ...taskData,
        id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      },
    ]);
  };

  const handleDragDrop = (taskId, newDate) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, date: formatDateISO(newDate) } : task
      )
    );
  };

  const handleTaskStatusToggle = (taskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status:
                task.status === "todo"
                  ? "in-progress"
                  : task.status === "in-progress"
                  ? "done"
                  : "todo",
            }
          : task
      )
    );
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Month View Task Planner</h1>

      <CalendarHeader
        currentMonth={currentMonth}
        onPrev={handlePrevMonth}
        onNext={handleNextMonth}
        onToday={handleToday}
      />

      <Filters filters={filters} setFilters={setFilters} />

      <div className="calendar-grid">
        {/* Weekday headers */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="weekday-header">
            {d}
          </div>
        ))}

        {/* Days */}
        {matrix.map((week, wIndex) =>
          week.map((date, dIndex) => {
            const dayTasks = filteredTasks.filter((t) =>
              isSameDay(new Date(t.date), date)
            );
            const isCurrentMonth = isSameMonth(date, currentMonth);
            const isToday = isSameDay(date, today);

            return (
              <DayCell
                key={`${wIndex}-${dIndex}`}
                date={date}
                isToday={isToday}
                isCurrentMonth={isCurrentMonth}
                tasks={dayTasks}
                onAddTask={openAddTaskModal}
                onDropTask={handleDragDrop}
                onTaskStatusToggle={handleTaskStatusToggle}
              />
            );
          })
        )}
      </div>

      {isModalOpen && (
        <TaskModal
          defaultDate={modalDate}
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddTask}
        />
      )}
    </div>
  );
}

export default App;
