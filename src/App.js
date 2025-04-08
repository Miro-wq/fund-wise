import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { ExpenseProvider, ExpenseContext } from '../src/context/ExpenseContext';
import Home from '../src/pages/Home/Home';
import History from '../src/pages/History/History';
import Login from '../src/pages/Login/Login';
import Register from '../src/pages/Register/Register';
import { CustomThemeProvider } from './components/ThemeContext';
import ThemeToggleButton from './components/ThemeToggleButton';
import { CssBaseline, AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import MobileBottomNav from './components/MobileBottomNav';
import LogoutIcon from '@mui/icons-material/Logout';
import WhatsNew from './pages/WhatsNew';
import ScrollToTop from './components/ScrollToTop';
import HowToUse from './pages/HowToUse';


const PrivateRoute = ({ children }) => {
  const { token } = useContext(ExpenseContext);
  return token ? children : <Navigate to="/login" />;
};

function AppRoutes() {
  const { token, logout } = useContext(ExpenseContext);
  const location = useLocation();



  const showMobileBottomNav = !['/login', '/register', '/whats-new'].includes(location.pathname);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <Typography variant="h6">
                ExpenseTracker
              </Typography>
            </Box>
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
              <Box
                component="img"
                src="/logo.png"
                alt="Logo"
                sx={{ height: 25 }}
              />
            </Box>
          </Box>
          {token ? (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/whats-new"
                sx={{
                  mr: { xs: '0', md: 2 },
                  textDecoration: 'none',
                  textTransform: 'capitalize',
                  color: '#2ec0ff',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: '#0087ff',
                    textDecoration: 'none',
                  },
                  '&:focus, &:active': {
                    textDecoration: 'none',
                    color: '#0087ff',
                    outline: 'none',
                  },
                }}
              >
                What's New!
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/"
                sx={{
                  display: { xs: 'none', md: 'block' },
                  borderBottom: location.pathname === "/" ? '2px solid #fff' : 'none',
                  textDecoration: 'none',
                  color: 'inherit',
                  mr: 2,
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
                <LogoutIcon />
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
          <ThemeToggleButton />
        </Toolbar>
      </AppBar>

      <Box sx={{ mt: 4 }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/whats-new" element={<WhatsNew />} />
          <Route path="/how-to-use" element={<HowToUse />} />
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
    <CustomThemeProvider>
      <CssBaseline />
      <ExpenseProvider>
        <Router>
          <ScrollToTop />
          <AppRoutes />
        </Router>
      </ExpenseProvider>
    </CustomThemeProvider>
  );
}
