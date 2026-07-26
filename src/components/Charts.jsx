import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#00C49F'];

export default function Charts({ expenses }) {
  // Category-wise totals for Pie Chart
  const categoryData = Object.values(
    expenses.reduce((acc, exp) => {
      acc[exp.category] = acc[exp.category] || { name: exp.category, value: 0 };
      acc[exp.category].value += exp.amount;
      return acc;
    }, {})
  );

  // Month-wise totals for Line Chart
  const monthlyData = Object.values(
    expenses.reduce((acc, exp) => {
      const month = exp.date.slice(0, 7); // "YYYY-MM"
      acc[month] = acc[month] || { month, total: 0 };
      acc[month].total += exp.amount;
      return acc;
    }, {})
  ).sort((a, b) => a.month.localeCompare(b.month));

  return (
    <div className="charts">
      <div className="chart-box">
        <h3>Spending by Category</h3>
        <ResponsiveContainer width="100%" height={300}>
  <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
    <Pie
      data={categoryData}
      dataKey="value"
      nameKey="name"
      outerRadius={70}
      label={({ name, value }) => `${name}: ₹${value}`}
    >
              {categoryData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-box">
        <h3>Monthly Trend</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={monthlyData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}