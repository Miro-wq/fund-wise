import React, { useState, useContext } from 'react';
import { ExpenseContext } from '../../context/ExpenseContext';
import { useNavigate } from 'react-router-dom';
import styles from '../Login/Login.module.css';

function Login() {
  const { login } = useContext(ExpenseContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    login(username, password)
      .then(() => {
        navigate('/');
      })
      .catch(err => {
        setError("Login eșuat");
      });
  };

  return (
    <div className={styles.container}>
      <h1>Logare</h1>
      <form onSubmit={handleLogin} className={styles.form}>
        <label>
          Utilizator:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
            placeholder="Introdu numele de utilizator"
          />
        </label>
        <label>
          Parolă:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            placeholder="Introdu parola"
          />
        </label>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.button}>Logare</button>
      </form>
    </div>
  );
}

export default Login;
