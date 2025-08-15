"use client";

import AddExpenseForm from "@/components/AddExpenseForm";
import { useState } from "react";

export default function AddExpensePage() {
  const [refreshFlag, setRefreshFlag] = useState(false);

  const handleAddExpense = () => {
    setRefreshFlag(!refreshFlag); // optional if you want to trigger list refresh
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <AddExpenseForm onAdd={handleAddExpense} />
    </div>
  );
}
