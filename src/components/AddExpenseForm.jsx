"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function AddExpenseForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/expenses", {
        title,
        amount,
        category,
        date,
      });

      onAdd(res.data); // Add new expense to parent state
      toast.success("✅ Expense added successfully!");

      setTitle("");
      setAmount("");
      setCategory("");
      setDate("");
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong!");
      toast.error("❌ Failed to add expense!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-base-200 p-6 rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-xl font-bold">Add New Expense</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input input-bordered w-full"
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="input input-bordered w-full"
        min="0.01"
        step="0.01"
        required
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
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
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="input input-bordered w-full"
        required
      />
      <button
        type="submit"
        className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
      >
        Add Expense
      </button>
    </form>
  );
}
