import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [salary, setSalary] = useState("");
  const [extraIncome, setExtraIncome] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || "");

  //daca este token, se preia datele pentru luna curentă
  useEffect(() => {
    if (token) {
      axios.get('/api/data', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          setSalary(res.data.salary);
          setExpenses(res.data.expenses);
          setExtraIncome(res.data.extraIncome);
        })
        .catch((err) => console.error(err));
    }
  }, [token]);

  const addExpense = (name, amount) => {
    const newExpense = { name, amount: Number(amount), date: new Date().toISOString() };
    setExpenses([...expenses, newExpense]);
    axios.post('/api/expenses', newExpense, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        //starea cu lista completă de cheltuieli primită de la server
        setExpenses(response.data.expenses);
      })
      .catch(err => console.error(err));
  };

  const updateSalary = (newSalary) => {
    setSalary(newSalary);
    setExpenses([]);
    //endpoint pentru a actualiza salariul
    axios.post('/api/reset', { salary: newSalary }, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .catch(err => console.error(err));
  };

  const updateExtraIncome = (value) => {
    setExtraIncome(value);
  };

  const login = (username, password) => {
    return axios.post('/api/login', { username, password })
      .then(res => {
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
      value={{
        salary,
        extraIncome,
        expenses,
        user,
        token,
        addExpense,
        setSalary: updateSalary,
        setExtraIncome: updateExtraIncome,
        setExpenses,
        login,
        logout,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
