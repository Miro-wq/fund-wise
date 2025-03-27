import React, { useContext, useState, useEffect } from 'react';
import { ExpenseContext } from '../../context/ExpenseContext';
import axios from 'axios';
import styles from '../Home/Home.module.css';

function Home() {
  const {
    salary,
    extraIncome,
    token,
    setSalary,
    setExtraIncome,
    addExpense,
    expenses
  } = useContext(ExpenseContext);

  const [localSalary, setLocalSalary] = useState(salary || "");
  const [localExtraIncome, setLocalExtraIncome] = useState(extraIncome || "");
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");

  //limita zilnică din suma salariului și a venitului suplimentar
  const dailyLimit = (Number(localSalary) + Number(localExtraIncome)) / 30 || 0;
  const today = new Date();
  const totalExpensesToday = expenses
    .filter(exp => {
      const expDate = new Date(exp.date);
      return expDate.toDateString() === today.toDateString();
    })
    .reduce((acc, e) => acc + e.amount, 0);

  useEffect(() => {
    if (salary) {
      setLocalSalary(salary);
    }
  }, [salary]);

  useEffect(() => {
    setLocalExtraIncome(extraIncome);
  }, [extraIncome]);

  //notificare dacă se depășește limita zilnică
  useEffect(() => {
    console.log('dailyLimit:', dailyLimit, 'totalExpensesToday :', totalExpensesToday);
    if (dailyLimit > 0 && totalExpensesToday > dailyLimit) {
      if (Notification.permission === 'granted') {
        new Notification('Ai depășit limita zilnică de cheltuieli!');
      } else {
        console.log('Notificările nu sunt permise.');
      }
    }
  }, [totalExpensesToday, dailyLimit]);

  const handleSalarySubmit = (e) => {
    e.preventDefault();
    if (localSalary) {
      axios.post('/api/reset', {
        salary: localSalary,
        extraIncome: localExtraIncome
      }, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(() => {
          setSalary(localSalary);
          setExtraIncome(localExtraIncome);
        })
        .catch(err => console.error(err));
    }
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (expenseName && expenseAmount && Number(expenseAmount) > 0) {
      addExpense(expenseName, expenseAmount);
      setExpenseName("");
      setExpenseAmount("");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Expense Tracker</h2>
      <form onSubmit={handleSalarySubmit} className={styles.salaryForm}>
        <label>
          Monthly income:
          <input
            type="number"
            value={localSalary}
            onChange={(e) => setLocalSalary(e.target.value)}
            placeholder="Enter your monthly income"
            className={styles.input}
          />
        </label>
        {/* <label>
          Additional income:
          <input
            type="number"
            value={localExtraIncome}
            onChange={(e) => setLocalExtraIncome(e.target.value)}
            placeholder="Enter your additional income"
            className={styles.inputAditional}
          />
        </label> */}
        <button type="submit" className={styles.button}>Save</button>
      </form>
      <div className={styles.limit}>
        <h2>Daily limit: {localSalary ? dailyLimit.toFixed(2) : ""} RON</h2>
      </div>
      <form onSubmit={handleAddExpense} className={styles.expenseForm}>
        <label>
          Expense:
          <input
            type="text"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
            placeholder="Insert expense"
            className={styles.input}
          />
        </label>
        <label>
          Amount:
          <input
            type="number"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value)}
            placeholder="Insert amount"
            className={styles.input}
          />
        </label>
        <button type="submit" className={styles.button}>Add Expense</button>
      </form>
      <div className={styles.total}>
        <h3>Total expenses for today: {expenses.length > 0 ? totalExpensesToday : ""} RON</h3>
      </div>
    </div>
  );
}

export default Home;
