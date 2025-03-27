import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { ExpenseProvider, ExpenseContext } from '../src/context/ExpenseContext';
import Home from '../src/pages/Home/Home';
import History from '../src/pages/History/History';
import Login from '../src/pages/Login/Login';
import Register from '../src/pages/Register/Register';
import styles from '../src/App.module.css';

const PrivateRoute = ({ children }) => {
  const { token } = useContext(ExpenseContext);
  return token ? children : <Navigate to="/login" />;
};

function AppRoutes() {
  const { token, logout } = useContext(ExpenseContext);
  return (
    <Router>
      <nav className={styles.nav}>
        {token ? (
          <>
            <Link to="/" className={styles.link}>Home</Link>
            <Link to="/history" className={styles.link}>History</Link>
            <button onClick={logout} className={styles.button}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className={styles.link}>Login</Link>
            <Link to="/register" className={styles.link}>Register</Link>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/history" element={<PrivateRoute><History /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default function App() {
  return (
    <ExpenseProvider>
      <AppRoutes />
    </ExpenseProvider>
  );
}