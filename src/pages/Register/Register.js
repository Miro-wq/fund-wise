import React, { useState, useContext } from 'react';
import { ExpenseContext } from '../../context/ExpenseContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import styles from '../Register/Register.module.css';

function Register() {
  const { setUser } = useContext(ExpenseContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/register', { username, password });
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      setUser(user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || "Înregistrare eșuată");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Înregistrare</h1>
      <form onSubmit={handleRegister} className={styles.form}>
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
        <button type="submit" className={styles.button}>Înregistrare</button>
      </form>
      <p>
        Ai deja un cont? <Link to="/login">Conectează-te</Link>
      </p>
    </div>
  );
}

export default Register;
