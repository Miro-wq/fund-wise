import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ExpenseProvider } from './context/ExpenseContext';
import Home from './pages/Home';
import History from './pages/History';

function App() {
  return (
    <ExpenseProvider>
      <Router>
        <nav style={{ padding: '10px', background: '#f2f2f2' }}>
          <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
          <Link to="/history">History</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Router>
    </ExpenseProvider>
  );
}

export default App;
