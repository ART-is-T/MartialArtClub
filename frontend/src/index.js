import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#073b3a" },       // красивый глубокий зелёный
    secondary: { main: "#0b6e4f" },    // светло-зелёный для hover/акцентов
    background: {
      default: "#1a1a1a", 
      paper: "#2a2a2a",
    },
    text: {
      primary: "#e0e0e0",
      secondary: "#a0a0a0",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h2: { fontWeight: 700, letterSpacing: "1px" },
  },
  shape: {
    borderRadius: 6,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          padding: "8px 18px",
          textTransform: "none",
          fontWeight: 500,
          transition: "background-color 0.3s ease, color 0.3s ease",
          "&:hover": {
            backgroundColor: "#08a045", // твой secondary
            color: "#fff",
          }
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#0b6e4f", // secondary
          }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": { color: "#0b6e4f" }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 6,
        }
      }
    }
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
);