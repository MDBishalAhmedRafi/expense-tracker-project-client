"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import ExpenseChart from "./ExpenseChart";
import ExpenseFilter from "./ExpenseFilter";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editExpense, setEditExpense] = useState(null);
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/expenses");
      setExpenses(res.data);
      setFilteredExpenses(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load expenses!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/expenses/${id}`);
          toast.success("Expense deleted!");
          fetchExpenses();
        } catch (err) {
          toast.error("Failed to delete expense!");
        }
      }
    });
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

    try {
      await axios.patch(`http://localhost:5000/expenses/${editExpense._id}`, {
        title: form.title,
        amount: parseFloat(form.amount),
        category: form.category,
        date: form.date,
      });
      toast.success("Expense updated successfully!");
      setEditExpense(null);
      fetchExpenses();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update expense!");
    }
  };

  const handleFilter = ({ category, start, end }) => {
    let temp = [...expenses];
    if (category) temp = temp.filter((e) => e.category === category);
    if (start) temp = temp.filter((e) => new Date(e.date) >= new Date(start));
    if (end) temp = temp.filter((e) => new Date(e.date) <= new Date(end));
    setFilteredExpenses(temp);
  };

  const total = filteredExpenses.reduce(
    (sum, exp) => sum + parseFloat(exp.amount),
    0
  );

  return (
    <div className="space-y-8 px-4 md:px-8 py-6">
      {/* Filter */}
      <div data-aos="fade-down">
        <ExpenseFilter onFilter={handleFilter} />
      </div>

      {/* Chart */}
      <div data-aos="fade-up">
        <ExpenseChart expenses={filteredExpenses} />
      </div>

      {/* Total */}
      <h2
        className="text-xl font-bold text-primary text-center"
        data-aos="zoom-in"
      >
        Total Expense: ${total.toFixed(2)}
      </h2>

      {/* Edit Form */}
      {editExpense && (
        <form
          onSubmit={handleUpdate}
          className="bg-base-200 p-6 rounded-xl shadow-md space-y-4 max-w-xl mx-auto"
          data-aos="fade-up"
        >
          <h3 className="text-lg font-bold text-center">Edit Expense</h3>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="input input-bordered w-full"
            placeholder="Title"
            required
          />
          <input
            type="number"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            className="input input-bordered w-full"
            placeholder="Amount"
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
          <button type="submit" className="btn btn-primary w-full">
            Update Expense
          </button>
        </form>
      )}

      {/* Table */}
      <div data-aos="fade-up">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full text-sm">
              <thead className="bg-base-300 text-base-content">
                <tr>
                  <th>Title</th>
                  <th>Amount ($)</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenses.map((exp) => (
                  <tr key={exp._id} className="hover:bg-base-100 transition">
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
                      <button
                        className="btn btn-sm btn-outline"
                        onClick={() => handleEditClick(exp)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => handleDelete(exp._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
