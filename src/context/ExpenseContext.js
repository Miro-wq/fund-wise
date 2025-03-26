import React, { createContext, useState } from 'react';

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [salary, setSalary] = useState("");
  const [expenses, setExpenses] = useState([]);

  const addExpense = (name, amount) => {
    setExpenses([...expenses, { name, amount: Number(amount) }]);
  };

  return (
    <ExpenseContext.Provider value={{ salary, setSalary, expenses, addExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
};
