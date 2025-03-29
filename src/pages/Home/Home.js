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
    expenses,
    rent,
    water,
    gas,
    electricity,
    internet,
    tv,
    phone,
  } = useContext(ExpenseContext);

  //salariu și venit suplimentar
  const [localSalary, setLocalSalary] = useState(salary || "");
  const [localExtraIncome, setLocalExtraIncome] = useState(extraIncome || "");

  //stari pentru utilități
  const [localRent, setLocalRent] = useState("");
  const [localWater, setLocalWater] = useState("");
  const [localGas, setLocalGas] = useState("");
  const [localElectricity, setLocalElectricity] = useState("");
  const [localInternet, setLocalInternet] = useState("");
  const [localTV, setLocalTV] = useState("");
  const [localPhone, setLocalPhone] = useState("");

  //stări pentru cheltuieli noi
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");

  //calcu total utilități
  const totalUtilities =
    Number(rent) +
    Number(water) +
    Number(gas) +
    Number(electricity) +
    Number(internet) +
    Number(tv) +
    Number(phone);


  //venit net lunar = salariu - utilități + venit suplimentar
  const netIncome = Number(localSalary) - totalUtilities + Number(localExtraIncome);

  //daily limit calculat pe baza venitului net
  const dailyLimit = netIncome / 30 || 0;

  //totalul cheltuielilor din ziua curentă
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

  //notif dacă se depășește daily limit
  useEffect(() => {
    console.log('dailyLimit:', dailyLimit, 'totalExpensesToday:', totalExpensesToday);
    if (dailyLimit > 0 && totalExpensesToday > dailyLimit) {
      if (Notification.permission === 'granted') {
        new Notification('Ai depășit limita zilnică de cheltuieli!');
      } else {
        console.log('Notificările nu sunt permise.');
      }
    }
  }, [totalExpensesToday, dailyLimit]);

  //salvează salariul și utilitățile în DB
  const handleSalarySubmit = (e) => {
    e.preventDefault();
    if (localSalary) {
      axios.post('/api/reset', {
        salary: localSalary,
        extraIncome: localExtraIncome,
        rent: localRent,
        water: localWater,
        gas: localGas,
        electricity: localElectricity,
        internet: localInternet,
        tv: localTV,
        phone: localPhone
      }, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(() => {
          //actualizează contextul cu noile valori
          setSalary(localSalary);
          setExtraIncome(localExtraIncome);
        })
        .catch(err => console.error(err));
    }
  };

  //adaugă o cheltuială nouă
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
        {/* Dacă dorești, poți păstra sau afișa câmpul pentru additional income */}
        {/* <label>
          Additional income:
          <input
            type="number"
            value={localExtraIncome}
            onChange={(e) => setLocalExtraIncome(e.target.value)}
            placeholder="Enter your additional income"
            className={styles.input}
          />
        </label> */}
        <h3>Utilities (paid at the beginning of the month):</h3>
        <label>
          Rent:
          <input
            type="number"
            value={localRent}
            onChange={(e) => setLocalRent(e.target.value)}
            placeholder="Rent"
            className={styles.input}
          />
        </label>
        <label>
          Water:
          <input
            type="number"
            value={localWater}
            onChange={(e) => setLocalWater(e.target.value)}
            placeholder="Water"
            className={styles.input}
          />
        </label>
        <label>
          Gas:
          <input
            type="number"
            value={localGas}
            onChange={(e) => setLocalGas(e.target.value)}
            placeholder="Gas"
            className={styles.input}
          />
        </label>
        <label>
          Electricity:
          <input
            type="number"
            value={localElectricity}
            onChange={(e) => setLocalElectricity(e.target.value)}
            placeholder="Electricity"
            className={styles.input}
          />
        </label>
        <label>
          Internet:
          <input
            type="number"
            value={localInternet}
            onChange={(e) => setLocalInternet(e.target.value)}
            placeholder="Internet"
            className={styles.input}
          />
        </label>
        <label>
          TV:
          <input
            type="number"
            value={localTV}
            onChange={(e) => setLocalTV(e.target.value)}
            placeholder="TV"
            className={styles.input}
          />
        </label>
        <label>
          Phone:
          <input
            type="number"
            value={localPhone}
            onChange={(e) => setLocalPhone(e.target.value)}
            placeholder="Phone"
            className={styles.input}
          />
        </label>
        <button type="submit" className={styles.button}>Save</button>
      </form>
      <div className={styles.limit}>
        <h2>Daily limit: {localSalary ? dailyLimit.toFixed(2) : ""} RON</h2>
        <p>Net monthly income: {localSalary ? netIncome.toFixed(2) : ""} RON</p>
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
