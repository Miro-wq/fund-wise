import { createTheme, lighten } from '@mui/material/styles';

const theme = createTheme({
  palette: {
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
    },
  },
});

export default theme;
