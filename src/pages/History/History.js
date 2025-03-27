import React, { useContext } from 'react';
import { ExpenseContext } from '../../context/ExpenseContext';
import styles from '../History/History.module.css';

function History() {
  const { expenses, salary } = useContext(ExpenseContext);
  return (
    <div className={styles.container}>
      <h1>Istoric Cheltuieli - Luna Curentă</h1>
      <div className={styles.salary}>
        <strong>Salariu lunar:</strong> {salary}
      </div>
      {expenses.length === 0 ? (
        <p>Nu ai adăugat încă nicio cheltuială.</p>
      ) : (
        <ul className={styles.expenseList}>
          {expenses.map((exp, index) => (
            <li key={index}>
              {exp.name}: {exp.amount}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default History;
