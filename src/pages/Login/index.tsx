import React from 'react';
import { 
  Button, 
  Container, 
  Typography, 
  Box, 
  Paper 
} from '@mui/material';
import { useAuth } from '../../hooks/useAuth';

const Login: React.FC = () => {
  const { signInWithGoogle } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Erro no login', error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box 
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper 
          elevation={3} 
          sx={{ 
            padding: 4, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center' 
          }}
        >
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
