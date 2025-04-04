import React, { useState, useContext } from 'react';
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
        setError("Login failed. Please check your credentials.");
      });
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
          Login
        </Typography>
        <Typography variant="body1" align="left" color="textSecondary" gutterBottom>
          Enter your credentials to access your account                </Typography>
        <Box
          component="form"
          onSubmit={handleLogin}
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
          {error && (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          )}
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </Box>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ textDecoration: 'none', color: '#1976d2' }}>
            Register
          </Link>
        </Typography>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Check out <Link to="/whats-new" style={{ textDecoration: 'none', color: '#1976d2' }}>What's New!</Link> page for the latest updates.
        </Typography>
      </Paper>
    </Container>
  );
}

export default Login;
