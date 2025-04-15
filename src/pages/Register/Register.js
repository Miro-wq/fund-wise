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
        Bine ați venit la ExpenseTracker
      </Typography>
      <Typography variant="body1" align="center" color="textSecondary" gutterBottom>
        Creați un cont nou
      </Typography>
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" align="left" gutterBottom>
          Înregistrare
        </Typography>
        <Typography variant="body1" align="left" color="textSecondary" gutterBottom>
          Creați un cont nou pentru a începe
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
          <TextField
            label="confirmă parolă"
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
            Înregistrare
          </Button>
        </Box>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Aveți deja un cont?{' '}
          <Link to="/login" style={{ textDecoration: 'none', color: '#1976d2' }}>
            Conectați-vă
          </Link>
        </Typography>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Consultă pagina <Link to="/whats-new" style={{ textDecoration: 'none', color: '#1976d2' }}>Noutăți!</Link> pentru cele mai recente actualizări.
        </Typography>
      </Paper>
    </Container>
  );
}

export default Register;
