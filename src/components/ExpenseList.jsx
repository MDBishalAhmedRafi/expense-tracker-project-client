"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function ExpenseTable() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editExpense, setEditExpense] = useState(null);
  const [form, setForm] = useState({ title: "", amount: "", category: "", date: "" });

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/expenses");
      setExpenses(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this expense?")) return;
    await axios.delete(`http://localhost:5000/expenses/${id}`);
    fetchExpenses();
  };

  const handleEditClick = (exp) => {
    setEditExpense(exp);
    setForm({
      title: exp.title,
      amount: exp.amount,
      category: exp.category,
      date: exp.date.split("T")[0],
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editExpense) return;

    console.log("Updating expense ID:", editExpense._id);

await axios.patch(`http://localhost:5000/expenses/${editExpense._id}`, {
  title: form.title,
  amount: parseFloat(form.amount),
  category: form.category,
  date: form.date,
});
  };

  const total = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Total Expense: ${total.toFixed(2)}</h2>

      {editExpense && (
        <form onSubmit={handleUpdate} className="bg-base-200 p-4 rounded mb-6 shadow-md space-y-2">
          <h3 className="font-bold">Edit Expense</h3>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="input input-bordered w-full"
            required
          />
          <input
            type="number"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            className="input input-bordered w-full"
            required
          />
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="select select-bordered w-full"
            required
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Shopping">Shopping</option>
            <option value="Others">Others</option>
          </select>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="input input-bordered w-full"
            required
          />
          <button type="submit" className="btn btn-primary w-full">Update Expense</button>
        </form>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Title</th>
                <th>Amount ($)</th>
                <th>Category</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((exp) => (
                <tr key={exp._id}>
                  <td>{exp.title}</td>
                  <td>{exp.amount}</td>
                  <td>
                    <span
                      className={`badge ${
                        exp.category === "Food"
                          ? "badge-info"
                          : exp.category === "Transport"
                          ? "badge-warning"
                          : exp.category === "Shopping"
                          ? "badge-success"
                          : "badge-accent"
                      }`}
                    >
                      {exp.category}
                    </span>
                  </td>
                  <td>{new Date(exp.date).toLocaleDateString()}</td>
                  <td className="flex gap-2">
                    <button className="btn btn-sm btn-outline" onClick={() => handleEditClick(exp)}>Edit</button>
                    <button className="btn btn-sm btn-error" onClick={() => handleDelete(exp._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
