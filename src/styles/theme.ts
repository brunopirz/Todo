import { createTheme } from '@mui/material/styles';

const baseTheme = {
  typography: {
    fontFamily: [
      'Segoe UI',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 4,
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }
      }
    }
  }
};

export const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'light',
    primary: {
      main: '#0078D4', // Microsoft Blue
      light: '#3AA0F3',
      dark: '#005A9E'
    },
    background: {
      default: '#F3F2F1',
      paper: '#FFFFFF'
    }
  }
});

export const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'dark',
    primary: {
      main: '#3AA0F3', // Lighter blue for dark mode
      light: '#5FB0F5',
      dark: '#2B88D9'
    },
    background: {
      default: '#201F1E',
      paper: '#323130'
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#C8C6C4'
    }
  }
});
