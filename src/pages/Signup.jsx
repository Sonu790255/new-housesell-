import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  InputAdornment,
  IconButton,
  Avatar,
  CircularProgress,
} from '@mui/material';
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    if (password.length < 6) {
      return setError('Password must be at least 6 characters long');
    }

    try {
      setError('');
      setLoading(true);
      await signup(email, password);
      navigate('/');
    } catch (err) {
      setError('Failed to create account: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #4caf50 0%, #388e3c 100%)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative'
    }}>
      <Container maxWidth="sm">
        <Box sx={{ textAlign: 'center', mb: 4, position: 'relative', zIndex: 2 }}>
          <Avatar
            sx={{
              mx: 'auto',
              mb: 2,
              bgcolor: 'white',
              color: 'success.main',
              width: 64,
              height: 64,
              fontSize: '2rem',
            }}
          >
            🏠
          </Avatar>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'white' }}>
            Join HouseSell
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 4 }}>
            Create your account to start buying and selling properties
          </Typography>
        </Box>

        <Paper elevation={8} sx={{ p: 4, borderRadius: 3, backgroundColor: 'white', position: 'relative', zIndex: 2 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              margin="normal"
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                py: 1.5,
                mb: 3,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                backgroundColor: '#4caf50',
                '&:hover': { backgroundColor: '#388e3c' },
              }}
            >
              {loading ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1 }} />
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </Button>

            <Box sx={{ textAlign: 'center', pt: 2, borderTop: '1px solid #e0e0e0' }}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?{' '}
                <Link to="/login" style={{ color: '#4caf50', textDecoration: 'none', fontWeight: 'bold' }}>
                  Sign in here
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </div>
  );
}

export default Signup;
