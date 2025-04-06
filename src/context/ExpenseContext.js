import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [salary, setSalary] = useState("");
  const [extraIncome, setExtraIncome] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || "");
  const [rent, setRent] = useState("");
  const [water, setWater] = useState("");
  const [gas, setGas] = useState("");
  const [electricity, setElectricity] = useState("");
  const [internet, setInternet] = useState("");
  const [tv, setTV] = useState("");
  const [phone, setPhone] = useState("");


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
          setRent(res.data.rent);
          setWater(res.data.water);
          setGas(res.data.gas);
          setElectricity(res.data.electricity);
          setInternet(res.data.internet);
          setTV(res.data.tv);
          setPhone(res.data.phone);
          setUser(res.data.user);
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

  const updateSalary = (newSalary, newExtraIncome, newRent, newWater, newGas, newElectricity, newInternet, newTV, newPhone) => {
    setSalary(newSalary);
    setExpenses([]);
    //endpoint pentru a actualiza salariul, venitul suplimentar si utilitățile
    axios.post('/api/reset', {
      salary: newSalary,
      extraIncome: newExtraIncome,
      rent: newRent,
      water: newWater,
      gas: newGas,
      electricity: newElectricity,
      internet: newInternet,
      tv: newTV,
      phone: newPhone
    }, {
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
        setUser,
        token,
        rent,
        water,
        gas,
        electricity,
        internet,
        tv,
        phone,
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