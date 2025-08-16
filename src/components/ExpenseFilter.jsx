import { useState } from "react";

export default function ExpenseFilter({ onFilter }) {
  const [category, setCategory] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleFilter = (e) => {
    e.preventDefault();
    onFilter({ category, start, end });
  };

  return (
    <form onSubmit={handleFilter} className="flex flex-col md:flex-row gap-4 mb-4">
      <div className="flex flex-col">
        <label className="mb-1 font-medium">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="select select-bordered"
        >
          <option value="">All Categories</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Shopping">Shopping</option>
          <option value="Others">Others</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label className="mb-1 font-medium">Start Date</label>
        <input
          type="date"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          className="input input-bordered"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-1 font-medium">End Date</label>
        <input
          type="date"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          className="input input-bordered"
        />
      </div>

      <div className="flex items-end">
        <button type="submit" className="btn btn-primary">
          Filter
        </button>
      </div>
    </form>
  );
}
