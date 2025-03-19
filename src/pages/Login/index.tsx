import React from 'react';
import { 
  Button, 
  Container, 
  Typography, 
  Box, 
  Paper,
  Alert 
} from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { performanceMonitor } from '../../config/performance';

const Login: React.FC = () => {
  const { signInWithGoogle } = useAuth();
  const { error, handleError, clearError } = useErrorHandler();

  const handleGoogleLogin = async () => {
    // Medir performance do login
    const loginTrace = performanceMonitor.startTrace('google_login');

    try {
      await performanceMonitor.measureAsyncOperation('google_login', async () => {
        await signInWithGoogle();
      });
      loginTrace.stop();
    } catch (err) {
      loginTrace.stop();
      handleError(err as Error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {error && (
          <Alert 
            severity="error" 
            onClose={clearError}
            sx={{ width: '100%', mb: 2 }}
          >
            {error}
          </Alert>
        )}
        
        <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5">
            Microsoft Todo Clone
          </Typography>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleGoogleLogin}
          >
            Entrar com Google
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
