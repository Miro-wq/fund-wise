import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { ExpenseProvider, ExpenseContext } from '../src/context/ExpenseContext';
import Home from '../src/pages/Home/Home';
import History from '../src/pages/History/History';
import Login from '../src/pages/Login/Login';
import Register from '../src/pages/Register/Register';
import theme from '../src/components/CreateTheme';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import MobileBottomNav from './components/MobileBottomNav';


const PrivateRoute = ({ children }) => {
  const { token } = useContext(ExpenseContext);
  return token ? children : <Navigate to="/login" />;
};

function AppRoutes() {
  const { token, logout } = useContext(ExpenseContext);
  const location = useLocation();

  const showMobileBottomNav = !['/login', '/register'].includes(location.pathname);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            ExpenseTracker
          </Typography>
          {token ? (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/"
                sx={{
                  display: { xs: 'none', md: 'block' },
                  borderBottom: location.pathname === "/" ? '2px solid #fff' : 'none',
                  textDecoration: 'none',
                  color: 'inherit',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: '#a2a1a1',
                    textDecoration: 'none',
                  },
                  '&:focus, &:active': {
                    textDecoration: 'none',
                    color: '#fff',
                    outline: 'none',
                  },
                }}
              >
                Home
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/history"
                sx={{
                  display: { xs: 'none', md: 'block' },
                  borderBottom: location.pathname === "/history" ? '2px solid #fff' : 'none',
                  textDecoration: 'none',
                  color: 'inherit',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: '#a2a1a1',
                    textDecoration: 'none',
                  },
                  '&:focus, &:active': {
                    textDecoration: 'none',
                    color: '#fff',
                    outline: 'none',
                  },
                }}
              >
                History
              </Button>
              <Button color="inherit" onClick={logout}
              sx={{           
                textDecoration: 'none',
                color: 'inherit',
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: '#a2a1a1',
                  textDecoration: 'none',
                },
              }}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login"
              sx={{
                borderBottom: location.pathname === "/login" ? '2px solid #fff' : 'none',
                textDecoration: 'none',
                color: 'inherit',
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: '#a2a1a1',
                  textDecoration: 'none',
                },
                '&:focus, &:active': {
                  textDecoration: 'none',
                  color: '#fff',
                  outline: 'none',
                },
              }}>
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register"
               sx={{
                borderBottom: location.pathname === "/register" ? '2px solid #fff' : 'none',
                textDecoration: 'none',
                color: 'inherit',
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: '#a2a1a1',
                  textDecoration: 'none',
                },
                '&:focus, &:active': {
                  textDecoration: 'none',
                  color: '#fff',
                  outline: 'none',
                },
              }}>
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
      {showMobileBottomNav && <MobileBottomNav />}
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ExpenseProvider>
        <Router>
          <AppRoutes />
        </Router>
      </ExpenseProvider>
    </ThemeProvider>
  );
}
