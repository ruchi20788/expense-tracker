export default function Dashboard({ expenses }) {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  const categoryTotals = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});

  const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="dashboard">
      <div className="stat-card">
        <h4>Total Spent</h4>
        <p>₹{total.toFixed(2)}</p>
      </div>
      <div className="stat-card">
        <h4>Top Category</h4>
        <p>{topCategory ? `${topCategory[0]} (₹${topCategory[1].toFixed(2)})` : '—'}</p>
      </div>
      <div className="stat-card">
        <h4>Total Entries</h4>
        <p>{expenses.length}</p>
      </div>
    </div>
  );
}