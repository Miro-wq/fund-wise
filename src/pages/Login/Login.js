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
        Bine ați venit la ExpenseTracker
      </Typography>
      <Typography variant="body1" align="center" color="textSecondary" gutterBottom>
        Conectați-vă la cont sau creați unul nou
      </Typography>
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" align="left" gutterBottom>
          Conectare
        </Typography>
        <Typography variant="body1" align="left" color="textSecondary" gutterBottom>
          Introduceți datele de conectare pentru a vă accesa contul
        </Typography>
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
            label="utilizator"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label="parolă"
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
            Conectare
          </Button>
        </Box>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Nu aveți un cont?{' '}
          <Link to="/register" style={{ textDecoration: 'none', color: '#1976d2' }}>
            Înregistrați-vă
          </Link>
        </Typography>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Consultă pagina <Link to="/whats-new" style={{ textDecoration: 'none', color: '#1976d2' }}>Noutăți!</Link> pentru cele mai recente actualizări.
        </Typography>
      </Paper>
    </Container>
  );
}

export default Login;
