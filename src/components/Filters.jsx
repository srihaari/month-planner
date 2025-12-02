function Filters({ filters, setFilters }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="filters">
      <div className="filter-group">
        <label>Status:</label>
        <select name="status" value={filters.status} onChange={handleChange}>
          <option value="all">All</option>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Label:</label>
        <select name="label" value={filters.label} onChange={handleChange}>
          <option value="all">All</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Finance">Finance</option>
        </select>
      </div>
    </div>
  );
}

export default Filters;
