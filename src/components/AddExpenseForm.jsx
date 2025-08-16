"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AddExpenseForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

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

      onAdd(res.data);
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
      className="bg-base-200 p-8 rounded-xl shadow-lg max-w-xl mx-auto space-y-6"
      data-aos="fade-up"
    >
      <h2 className="text-2xl font-bold text-primary text-center">
        Add New Expense
      </h2>

      {error && (
        <div
          className="bg-red-100 text-red-600 p-3 rounded-md text-sm"
          data-aos="fade-in"
        >
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input input-bordered w-full transition duration-300 focus:ring-2 focus:ring-primary"
          required
          data-aos="fade-right"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="input input-bordered w-full transition duration-300 focus:ring-2 focus:ring-primary"
          min="0.01"
          step="0.01"
          required
          data-aos="fade-left"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="select select-bordered w-full transition duration-300 focus:ring-2 focus:ring-primary"
          required
          data-aos="fade-right"
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
          className="input input-bordered w-full transition duration-300 focus:ring-2 focus:ring-primary"
          required
          data-aos="fade-left"
        />
      </div>

      <button
        type="submit"
        className={`btn btn-primary w-full transition-transform duration-300 hover:scale-105 ${
          loading ? "loading" : ""
        }`}
        data-aos="zoom-in"
      >
        {loading ? "Adding..." : "Add Expense"}
      </button>
    </form>
  );
}
