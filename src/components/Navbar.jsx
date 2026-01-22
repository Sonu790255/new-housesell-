import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from '@mui/material';
import { 
  Home as HomeIcon, 
  ExitToApp as LogoutIcon,
  Add as AddIcon,
  ViewList as ViewListIcon,
} from '@mui/icons-material';

function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(135deg, #afeaf1 0%, #6edee2 100%)' }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography
  variant="h5"
  // component={Link}
  to="/"
sx={{
       fontWeight: 700,
       color: 'white',
       mb:1,
       fontSize: { xs: '1rem', md: '2rem' },
       letterSpacing: '-0.02em',
       mt:1
       
    }}
>
  🏠 TrueHomes
</Typography>

          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              component={Link}
              to="/"
              color="inherit"
              startIcon={<HomeIcon />}
            >
              Home
            </Button>
            
            {currentUser ? (
              <>
                <Button
                  component={Link}
                  to="/add-property"
                  color="inherit"
                  startIcon={<AddIcon />}
                >
                  Add Property
                </Button>
                <Button
                  component={Link}
                  to="/my-properties"
                  color="inherit"
                  startIcon={<ViewListIcon />}
                >
                  My Properties
                </Button>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  {currentUser.email}
                </Typography>
                <Button
                  onClick={handleLogout}
                  color="inherit"
                  variant="outlined"
                  startIcon={<LogoutIcon />}
                  sx={{
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button component={Link} to="/login" color="inherit">
                  Login
                </Button>
                <Button
                  component={Link}
                  to="/signup"
                  variant="outlined"
                  sx={{
                    color: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
