// App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { ExpenseProvider, ExpenseContext } from '../src/context/ExpenseContext';
import Home from '../src/pages/Home/Home';
import History from '../src/pages/History/History';
import Login from '../src/pages/Login/Login';
import Register from '../src/pages/Register/Register';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Albastru MUI
    },
    secondary: {
      main: '#9c27b0', // Mov MUI
    },
  },
});

const PrivateRoute = ({ children }) => {
  const { token } = useContext(ExpenseContext);
  return token ? children : <Navigate to="/login" />;
};

function AppRoutes() {
  const { token, logout } = useContext(ExpenseContext);

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            ExpenseTracker
          </Typography>
          {token ? (
            <>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/history">
                History
              </Button>
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Box sx={{ mt: 4 }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/history" element={<PrivateRoute><History /></PrivateRoute>} />
        </Routes>
      </Box>
    </Router>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ExpenseProvider>
        <AppRoutes />
      </ExpenseProvider>
    </ThemeProvider>
  );
}
