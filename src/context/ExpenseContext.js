import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [salary, setSalary] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || "");

  //daca este token, se preia datele pentru luna curentă
  useEffect(() => {
    if (token) {
      axios
        .get('/api/data', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const data = res.data;
          setSalary(data.salary);
          setExpenses(data.expenses);
        })
        .catch((err) => console.error(err));
    }
  }, [token]);

  const addExpense = (name, amount) => {
    const newExpense = { name, amount: Number(amount) };
    setExpenses([...expenses, newExpense]);
    //endpoint pentru a salva cheltuiala în backend
    axios
      .post('/api/expenses', newExpense, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .catch((err) => console.error(err));
  };

  const updateSalary = (newSalary) => {
    setSalary(newSalary);
    //endpoint pentru a actualiza salariul
    axios
      .post(
        '/api/salary',
        { salary: newSalary },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .catch((err) => console.error(err));
  };

  const login = (username, password) => {
    return axios
      .post('/api/login', { username, password })
      .then((res) => {
        setToken(res.data.token);
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
      });
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem('token');
  };

  return (
    <ExpenseContext.Provider
      value={{ salary, setSalary: updateSalary, expenses, addExpense, user, token, login, logout }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
