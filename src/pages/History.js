import React, { useContext } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';

function History() {
  const { expenses } = useContext(ExpenseContext);
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Istoric Cheltuieli</h1>
      {expenses.length === 0 ? (
        <p>Nu ai adăugat încă nicio cheltuială.</p>
      ) : (
        <ul>
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
