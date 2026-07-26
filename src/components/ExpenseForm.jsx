import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const CATEGORIES = ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Other'];

export default function ExpenseForm({ onAdd, editingExpense, onUpdate }) {
  const [form, setForm] = useState(
    editingExpense || { amount: '', category: 'Food', date: '', note: '' }
  );

  useEffect(() => {
    if (editingExpense) {
      setForm(editingExpense);
    }
  }, [editingExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.amount || !form.date) return;

    if (editingExpense) {
      onUpdate({ ...form, amount: parseFloat(form.amount) });
    } else {
      onAdd({ ...form, id: uuidv4(), amount: parseFloat(form.amount) });
    }
    setForm({ amount: '', category: 'Food', date: '', note: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <input
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
        required
      />
      <select
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      >
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <input
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Note (optional)"
        value={form.note}
        onChange={(e) => setForm({ ...form, note: e.target.value })}
      />
      <button type="submit">{editingExpense ? 'Update' : 'Add Expense'}</button>
    </form>
  );
}