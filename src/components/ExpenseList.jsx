import ExpenseItem from './ExpenseItem';

export default function ExpenseList({ expenses, onDelete, onEdit }) {
  if (expenses.length === 0) return <p>No expenses yet. Add one above!</p>;

  return (
    <div className="expense-list">
      {expenses.map((exp) => (
        <ExpenseItem key={exp.id} expense={exp} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  );
}