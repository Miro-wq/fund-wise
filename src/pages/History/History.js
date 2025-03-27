import React, { useContext, useState, useMemo } from 'react';
import { ExpenseContext } from '../../context/ExpenseContext';
import styles from '../History/History.module.css';
import ExpenseLineChart from '../../components/ExpenseLineChart';
import exportPDF from '../../components/Export';

function History() {
  const { expenses, salary, extraIncome } = useContext(ExpenseContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minValue, setMinValue] = useState('');
  const [maxValue, setMaxValue] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filteredExpenses = useMemo(() => {
    return expenses.filter(exp => {
      //filtrare după nume
      if (searchTerm && !exp.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      //filtrare după categorie (dacă câmpul category există)
      if (selectedCategory && exp.category !== selectedCategory) {
        return false;
      }
      //filtrare după valoare minimă
      if (minValue && exp.amount < Number(minValue)) {
        return false;
      }
      //filtrare după valoare maximă
      if (maxValue && exp.amount > Number(maxValue)) {
        return false;
      }
      //filtrare după interval de date
      if (startDate) {
        const expDate = new Date(exp.date);
        if (expDate < new Date(startDate)) {
          return false;
        }
      }
      if (endDate) {
        const expDate = new Date(exp.date);
        if (expDate > new Date(endDate)) {
          return false;
        }
      }
      return true;
    });
  }, [expenses, searchTerm, selectedCategory, minValue, maxValue, startDate, endDate]);

  const categories = useMemo(() => {
    const cats = expenses.map(exp => exp.category).filter(Boolean);
    return [...new Set(cats)];
  }, [expenses]);

  return (
    <div className={styles.container}>
      <h1>Istoric Cheltuieli</h1>
      <div className={styles.salary}>
        <strong>Salariu lunar:</strong> {salary} | <strong>Venit suplimentar:</strong> {extraIncome}
      </div>

      <div className={styles.exportButtons}>
        <button onClick={() => exportPDF(expenses)} className={styles.button}>
          Export PDF
        </button>
      </div>

      <div className={styles.filterSection}>
        <input
          type="text"
          placeholder="Caută după nume"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className={styles.input}
        />
        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className={styles.input}
        >
          <option value="">Toate categoriile</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Valoare minimă"
          value={minValue}
          onChange={e => setMinValue(e.target.value)}
          className={styles.input}
        />
        <input
          type="number"
          placeholder="Valoare maximă"
          value={maxValue}
          onChange={e => setMaxValue(e.target.value)}
          className={styles.input}
        />
        <input
          type="date"
          placeholder="Data de început"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          className={styles.input}
        />
        <input
          type="date"
          placeholder="Data de sfârșit"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
          className={styles.input}
        />
      </div>

      {expenses.length === 0 ? (
        <p>Nu ai adăugat încă nicio cheltuială.</p>
      ) : (
        <>
          <ExpenseLineChart expenses={expenses} />
          {filteredExpenses.length === 0 ? (
            <p>Nu au fost găsite cheltuieli pentru criteriile selectate.</p>
          ) : (
            <ul className={styles.expenseList}>
              {filteredExpenses.map((exp, index) => {
                const expDate = new Date(exp.date);
                return (
                  <li key={index}>
                    {exp.name} - {exp.amount} RON {exp.category && `- ${exp.category}`} - {expDate.toLocaleDateString()} {expDate.toLocaleTimeString()}
                  </li>
                );
              })}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

export default History;
