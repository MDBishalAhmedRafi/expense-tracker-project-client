// src/context/ExpenseContext.jsx
"use client"; // must be here for hooks/state

import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://expense-tracker-server-ochre.vercel.app/expenses");
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

  return (
    <ExpenseContext.Provider value={{ expenses, setExpenses, loading, fetchExpenses }}>
      {children}
    </ExpenseContext.Provider>
  );
};
