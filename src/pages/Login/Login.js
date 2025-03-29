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
      <div className={styles.content}>
      <h1 className={styles.intro}>Welcome to ExpenseTracker</h1>
      <p className={styles.pLogin}>Sign in to your account or create a new one</p>
      </div>
      <div className={styles.formContainer}>
      <h3 className={styles.h2}>Login</h3>
      <p className={styles.p}>Enter your credentials to access your account</p>
      <form onSubmit={handleLogin} className={styles.form}>
        <label className={styles.label}>
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
    </div>
  );
}

export default Login;
