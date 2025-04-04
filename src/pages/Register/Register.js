import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ExpenseContext } from '../../context/ExpenseContext';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box
} from '@mui/material';

function Register() {
  const { setUser } = useContext(ExpenseContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const res = await axios.post('/api/register', { username, password });
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      setUser(user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Welcome to ExpenseTracker
      </Typography>
      <Typography variant="body1" align="center" color="textSecondary" gutterBottom>
        Sign in to your account or create a new one
      </Typography>
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" align="left" gutterBottom>
          Register
        </Typography>
        <Typography variant="body1" align="left" color="textSecondary" gutterBottom>
          Create a new account to get started
        </Typography>
        <Box
          component="form"
          onSubmit={handleRegister}
          sx={{
            mt: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}
        >
          <TextField
            label="username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label="password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <TextField
            label="confirm password"
            type="password"
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {error && (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          )}
          <Button type="submit" variant="contained" color="primary">
            Register
          </Button>
        </Box>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Already have an account?{' '}
          <Link to="/login" style={{ textDecoration: 'none', color: '#1976d2' }}>
            Login
          </Link>
        </Typography>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Check out <Link to="/whats-new" style={{ textDecoration: 'none', color: '#1976d2' }}>What's New!</Link> page for the latest updates.
        </Typography>
      </Paper>
    </Container>
  );
}

export default Register;
