import { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Dashboard from './components/Dashboard';
import Charts from './components/Charts';
import FilterBar from './components/FilterBar';
import './App.css';

function App() {
  const [expenses, setExpenses] = useLocalStorage('expenses', []);
  const [editingExpense, setEditingExpense] = useState(null);
  const [filters, setFilters] = useState({ category: 'All', startDate: '', endDate: '' });

  const addExpense = (expense) => setExpenses([...expenses, expense]);

  const deleteExpense = (id) => setExpenses(expenses.filter((e) => e.id !== id));

  const updateExpense = (updated) => {
    setExpenses(expenses.map((e) => (e.id === updated.id ? updated : e)));
    setEditingExpense(null);
  };

  const filteredExpenses = expenses.filter((e) => {
    const matchesCategory = filters.category === 'All' || e.category === filters.category;
    const matchesStart = !filters.startDate || e.date >= filters.startDate;
    const matchesEnd = !filters.endDate || e.date <= filters.endDate;
    return matchesCategory && matchesStart && matchesEnd;
  });

  return (
    <div className="app">
      <h1>Expense Tracker</h1>
      <ExpenseForm
        onAdd={addExpense}
        editingExpense={editingExpense}
        onUpdate={updateExpense}
      />
      <Dashboard expenses={filteredExpenses} />
      <FilterBar filters={filters} setFilters={setFilters} />
      <Charts expenses={filteredExpenses} />
      <ExpenseList
        expenses={filteredExpenses}
        onDelete={deleteExpense}
        onEdit={setEditingExpense}
      />
    </div>
  );
}

export default App;