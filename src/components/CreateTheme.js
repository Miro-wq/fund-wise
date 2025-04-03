import { createTheme, lighten } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#1a1e23', // culoare de fundal închisă
      paper: '#1d2228', // culoare de fundal închisă pentru elemente
    },
    primary: {
      main: '#fff',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          '--Paper-overlay': 'none !important',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: '#212830', // verde deschis
          '&:hover': {
            backgroundColor: lighten('#212830', 0.2),
          },
          border: '1px solid #424c5d',
          color: '#fff',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#fff',
        },
      },
    },
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0f1729',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: '#0f1729',
          '&:hover': {
            backgroundColor: lighten('#0f1729', 0.2),
          },
        },
      },
    }
  },
});

export default darkTheme;
