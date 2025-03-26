// Home.js
import React, { useContext, useState, useEffect } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';

function Home() {
  const { salary, setSalary, addExpense, expenses } = useContext(ExpenseContext);
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  
  const dailyLimit = salary ? Number(salary) / 30 : 0;
  const totalExpenses = expenses.reduce((total, exp) => total + exp.amount, 0);

  // Solicită permisiunea pentru notificări la montare
  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  // Trimite notificare dacă se depășește limita zilnică
  useEffect(() => {
    if (dailyLimit > 0 && totalExpenses > dailyLimit) {
      if (Notification.permission === 'granted') {
        new Notification('Ai depășit limita zilnică de cheltuieli!');
      }
    }
  }, [totalExpenses, dailyLimit]);

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (expenseName && expenseAmount && Number(expenseAmount) > 0) {
      addExpense(expenseName, expenseAmount);
      setExpenseName("");
      setExpenseAmount("");
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Tracker Cheltuieli - Home</h1>
      <div style={{ marginBottom: '20px' }}>
        <label>
          Salariu lunar:
          <input 
            type="number" 
            value={salary} 
            onChange={(e) => setSalary(e.target.value)}
            placeholder="Introdu salariul"
            style={{ marginLeft: '10px' }}
          />
        </label>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <h2>Limita zilnică: {salary ? dailyLimit.toFixed(2) : ""}</h2>
      </div>
      <form onSubmit={handleAddExpense} style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>
            Cheltuială:
            <input 
              type="text" 
              value={expenseName} 
              onChange={(e) => setExpenseName(e.target.value)}
              placeholder="Nume cheltuială"
              style={{ marginLeft: '10px' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>
            Suma:
            <input 
              type="number" 
              value={expenseAmount} 
              onChange={(e) => setExpenseAmount(e.target.value)}
              placeholder="Introdu suma"
              style={{ marginLeft: '10px' }}
            />
          </label>
        </div>
        <button type="submit">Adaugă cheltuială</button>
      </form>
      <div>
        <h3>Total cheltuieli: {expenses.length > 0 ? totalExpenses : ""}</h3>
      </div>
    </div>
  );
}

export default Home;
