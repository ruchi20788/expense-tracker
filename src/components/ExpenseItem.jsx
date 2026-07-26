export default function ExpenseItem({ expense, onDelete, onEdit }) {
  return (
    <div className="expense-item">
      <span className="category-badge">{expense.category}</span>
      <span>{expense.date}</span>
      <span>{expense.note}</span>
      <span className="amount">₹{expense.amount.toFixed(2)}</span>
      <button onClick={() => onEdit(expense)}>Edit</button>
      <button onClick={() => onDelete(expense.id)}>Delete</button>
    </div>
  );
}