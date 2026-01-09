import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PropertyCard from '../components/PropertyCard';
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  CircularProgress,
  Paper,
  Card,
  CardContent,
} from '@mui/material';
import {
  Add as AddIcon,
  Home as HomeIcon,
  TrendingUp as TrendingUpIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';

function MyProperties() {
  const { currentUser } = useAuth();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      fetchMyProperties();
    }
  }, [currentUser]);

  const fetchMyProperties = () => {
    try {
      // Get all properties from localStorage
      const allProperties = JSON.parse(localStorage.getItem('properties') || '[]');
      
      // Filter properties by current user
      const userProperties = allProperties.filter(property => 
        property.sellerId === currentUser.uid
      );
      
      // Sort by creation date (newest first)
      userProperties.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      setProperties(userProperties);
    } catch (error) {
      console.error('Error fetching properties:', error);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = () => {
    const totalProperties = properties.length;
    const forSale = properties.filter(p => p.type === 'sale').length;
    const forRent = properties.filter(p => p.type === 'rent').length;
    const totalValue = properties.reduce((sum, p) => sum + (p.price || 0), 0);

    return { totalProperties, forSale, forRent, totalValue };
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return (
      <Box sx={{ 
        minHeight: '100vh', 
        backgroundColor: '#f5f5f5',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress size={60} sx={{ mb: 3 }} />
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            Loading Your Properties
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Please wait while we fetch your listings...
          </Typography>
        </Box>
      </Box>
    );
  }

  const stats = calculateStats();

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            My Properties
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Manage and track all your property listings
          </Typography>
          
          <Button
            component={Link}
            to="/add-property"
            variant="contained"
            size="large"
            startIcon={<AddIcon />}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 'bold',
            }}
          >
            Add New Property
          </Button>
        </Box>

        {/* Statistics Cards */}
        {properties.length > 0 && (
          <Grid container spacing={3} sx={{ mb: 6 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ textAlign: 'center', p: 3, height: '100%' }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    backgroundColor: 'primary.light',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2
                  }}
                >
                  <HomeIcon sx={{ fontSize: 30, color: 'primary.main' }} />
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  {stats.totalProperties}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Properties
                </Typography>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ textAlign: 'center', p: 3, height: '100%' }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    backgroundColor: 'success.light',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2
                  }}
                >
                  <TrendingUpIcon sx={{ fontSize: 30, color: 'success.main' }} />
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                  {stats.forSale}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  For Sale
                </Typography>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ textAlign: 'center', p: 3, height: '100%' }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    backgroundColor: 'info.light',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2
                  }}
                >
                  <VisibilityIcon sx={{ fontSize: 30, color: 'info.main' }} />
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'info.main' }}>
                  {stats.forRent}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  For Rent
                </Typography>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ textAlign: 'center', p: 3, height: '100%' }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    backgroundColor: 'warning.light',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2
                  }}
                >
                  <Typography variant="h6" sx={{ color: 'warning.main', fontWeight: 'bold' }}>
                    $
                  </Typography>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'warning.main' }}>
                  {formatPrice(stats.totalValue)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Value
                </Typography>
              </Card>
            </Grid>
          </Grid>
        )}

        {/* Properties Grid */}
        {properties.length === 0 ? (
          <Paper elevation={3} sx={{ p: 6, textAlign: 'center', borderRadius: 3 }}>
            <Box
              sx={{
                width: 120,
                height: 120,
                borderRadius: '50%',
                backgroundColor: 'grey.100',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 3
              }}
            >
              <HomeIcon sx={{ fontSize: 60, color: 'grey.400' }} />
            </Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
              No Properties Yet
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: '500px', mx: 'auto' }}>
              You haven't added any properties yet. Start by adding your first property to begin building your real estate portfolio.
            </Typography>
            <Button
              component={Link}
              to="/add-property"
              variant="contained"
              size="large"
              startIcon={<AddIcon />}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 'bold',
              }}
            >
              Add Your First Property
            </Button>
          </Paper>
        ) : (
          <>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                Your Property Listings
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Showing {properties.length} {properties.length === 1 ? 'property' : 'properties'}
              </Typography>
            </Box>

            <Grid container spacing={4}>
              {properties.map((property) => (
                <Grid item xs={12} sm={6} lg={4} key={property.id}>
                  <PropertyCard property={property} />
                </Grid>
              ))}
            </Grid>

            <Box sx={{ textAlign: 'center', mt: 6 }}>
              <Button
                component={Link}
                to="/add-property"
                variant="outlined"
                size="large"
                startIcon={<AddIcon />}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                }}
              >
                Add Another Property
              </Button>
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
}

export default MyProperties;