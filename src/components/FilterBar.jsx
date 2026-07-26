const CATEGORIES = ['All', 'Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Other'];

export default function FilterBar({ filters, setFilters }) {
  return (
    <div className="filter-bar">
      <select
        value={filters.category}
        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
      >
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <input
        type="date"
        value={filters.startDate}
        onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
      />
      <input
        type="date"
        value={filters.endDate}
        onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
      />
    </div>
  );
}