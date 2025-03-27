import React, { useContext, useState, useEffect } from 'react';
import { ExpenseContext } from '../../context/ExpenseContext';
import styles from '../Home/Home.module.css';

function Home() {
  const { 
    salary, 
    extraIncome, 
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
  const totalExpenses = expenses.reduce((acc, e) => acc + e.amount, 0);

  useEffect(() => {
    if (salary) {
      setLocalSalary(salary);
    }
  }, [salary]);

  //notificare dacă se depășește limita zilnică
  useEffect(() => {
    console.log('dailyLimit:', dailyLimit, 'totalExpenses:', totalExpenses);
    if (dailyLimit > 0 && totalExpenses > dailyLimit) {
      if (Notification.permission === 'granted') {
        new Notification('Ai depășit limita zilnică de cheltuieli!');
      } else {
        console.log('Notificările nu sunt permise.');
      }
    }
  }, [totalExpenses, dailyLimit]);

  const handleSalarySubmit = (e) => {
    e.preventDefault();
    if (localSalary) {
      setSalary(localSalary);
      //actualizează venitul suplimentar
      setExtraIncome(localExtraIncome);
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
      <h1>Expense Tracker</h1>
      <form onSubmit={handleSalarySubmit} className={styles.salaryForm}>
        <label>
          Salariu lunar:
          <input
            type="number"
            value={localSalary}
            onChange={(e) => setLocalSalary(e.target.value)}
            placeholder="Introdu salariul"
            className={styles.input}
          />
        </label>
        <label>
          Venit suplimentar:
          <input
            type="number"
            value={localExtraIncome}
            onChange={(e) => setLocalExtraIncome(e.target.value)}
            placeholder="Introdu venitul suplimentar"
            className={styles.input}
          />
        </label>
        <button type="submit" className={styles.button}>Salvează</button>
      </form>
      <div className={styles.limit}>
        <h2>Limita zilnică: {localSalary ? dailyLimit.toFixed(2) : ""}</h2>
      </div>
      <form onSubmit={handleAddExpense} className={styles.expenseForm}>
        <label>
          Cheltuială:
          <input
            type="text"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
            placeholder="Nume cheltuială"
            className={styles.input}
          />
        </label>
        <label>
          Suma:
          <input
            type="number"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value)}
            placeholder="Introdu suma"
            className={styles.input}
          />
        </label>
        <button type="submit" className={styles.button}>Adaugă cheltuială</button>
      </form>
      <div className={styles.total}>
        <h3>Total cheltuieli: {expenses.length > 0 ? totalExpenses : ""}</h3>
      </div>
    </div>
  );
}

export default Home;
