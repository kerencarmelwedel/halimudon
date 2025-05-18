import React, { useState, useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Pages
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Profile from './pages/Profile';
import FindPartner from './pages/FindPartner';
import FindGroup from './pages/FindGroup';

// Components
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';

// Context
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');

  const theme = useMemo(() => createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#2D3748', // Deep blue-gray
        light: '#4A5568',
        dark: '#1A202C',
      },
      secondary: {
        main: '#38B2AC', // Teal
        light: '#4FD1C5',
        dark: '#319795',
      },
      background: darkMode ? {
        default: '#1A202C',
        paper: '#2D3748',
      } : {
        default: '#F7FAFC',
        paper: '#FFFFFF',
      },
      text: darkMode ? {
        primary: '#F7FAFC',
        secondary: '#E2E8F0',
      } : {
        primary: '#2D3748',
        secondary: '#4A5568',
      },
    },
    typography: {
      fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      h1: {
        fontWeight: 700,
        fontSize: '2.5rem',
      },
      h2: {
        fontWeight: 600,
        fontSize: '2rem',
      },
      h3: {
        fontWeight: 600,
        fontSize: '1.75rem',
      },
      h4: {
        fontWeight: 500,
        fontSize: '1.5rem',
      },
      h5: {
        fontWeight: 500,
        fontSize: '1.25rem',
      },
      h6: {
        fontWeight: 500,
        fontSize: '1rem',
      },
      button: {
        textTransform: 'none',
        fontWeight: 500,
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
            padding: '10px 20px',
            fontWeight: 500,
          },
          contained: {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
            },
          },
        },
      },
    },
  }), [darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LanguageProvider>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={
              <PrivateRoute>
                <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
                  <Home />
                </Layout>
              </PrivateRoute>
            } />
            <Route path="/profile" element={
              <PrivateRoute>
                <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
                  <Profile />
                </Layout>
              </PrivateRoute>
            } />
            <Route path="/find-partner" element={
              <PrivateRoute>
                <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
                  <FindPartner />
                </Layout>
              </PrivateRoute>
            } />
            <Route path="/find-group" element={
              <PrivateRoute>
                <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
                  <FindGroup />
                </Layout>
              </PrivateRoute>
            } />
          </Routes>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App; 