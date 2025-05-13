import { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import { 
  Box, 
  Button, 
  Typography, 
  Container, 
  Paper,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      provider.addScope('email');
      provider.addScope('profile');
      
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      localStorage.setItem('firebase_token', token);
      console.log("token")
      console.log(token)
      
      console.log(auth)
      console.log('Sign-in successful:', result.user);
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Sign-in error:', error);
      setError(error.message);
    }
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
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Welcome to Resume Review
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Box sx={{ mt: 3 }}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleGoogleSignIn}
              sx={{ 
                mt: 3, 
                mb: 2,
                backgroundColor: '#4285F4',
                '&:hover': {
                  backgroundColor: '#357ABD',
                }
              }}
            >
              Sign in with Google
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login; 