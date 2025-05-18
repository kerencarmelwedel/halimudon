import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Divider,
} from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signup, updateUserProfile, loginWithGoogle } = useAuth();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError(t('auth.signup.passwordMatch'));
    }

    try {
      setError('');
      setLoading(true);
      const result = await signup(email, password);
      if (result.user) {
        await updateUserProfile(displayName);
      }
      navigate('/');
    } catch (err) {
      setError(t('auth.signup.error'));
      console.error(err);
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      setLoading(true);
      await loginWithGoogle();
      navigate('/');
    } catch (err) {
      setError(t('auth.signup.error'));
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          {t('auth.signup.title')}
        </Typography>
        
        <Paper elevation={3} sx={{ p: 4, mt: 3, width: '100%' }}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="displayName"
              label={t('auth.signup.displayName')}
              name="displayName"
              autoComplete="name"
              autoFocus
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={t('auth.signup.email')}
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={t('auth.signup.password')}
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label={t('auth.signup.confirmPassword')}
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {t('auth.signup.submit')}
            </Button>

            <Divider sx={{ my: 2 }}>{t('auth.signup.or')}</Divider>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleSignIn}
              disabled={loading}
              sx={{ mb: 2 }}
            >
              {t('auth.signup.google')}
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Typography color="primary">
                  {t('auth.signup.login')}
                </Typography>
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
} 