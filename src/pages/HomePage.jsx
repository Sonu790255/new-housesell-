import { useState, useEffect } from 'react';
import PropertyCard from '../components/PropertyCard';
import PropertyFilters from '../components/PropertyFilters';
import { initializeSampleData } from '../utils/sampleData';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  CircularProgress,
  Card,
  CardContent,
  Chip,
} from '@mui/material';
import {
  Home as HomeIcon,
  LocationOn as LocationIcon,
  VerifiedUser as VerifiedIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
  Speed as SpeedIcon,
} from '@mui/icons-material';

function HomePage() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    location: '',
    type: '',
    maxPrice: '',
    bedrooms: ''
  });

  useEffect(() => {
    // Initialize sample data on first load
    initializeSampleData();
    fetchProperties();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [properties, filters]);

  const fetchProperties = () => {
    try {
      // Get properties from localStorage
      const storedProperties = localStorage.getItem('properties');
      const propertiesData = storedProperties ? JSON.parse(storedProperties) : [];
      
      // Sort by creation date (newest first)
      propertiesData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      setProperties(propertiesData);
      setFilteredProperties(propertiesData);
    } catch (error) {
      console.error('Error fetching properties:', error);
      setProperties([]);
      setFilteredProperties([]);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...properties];

    if (filters.location) {
      filtered = filtered.filter(property =>
        property.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.type) {
      filtered = filtered.filter(property => property.type === filters.type);
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(property => property.price <= parseFloat(filters.maxPrice));
    }

    if (filters.bedrooms) {
      filtered = filtered.filter(property => property.bedrooms >= parseInt(filters.bedrooms));
    }

    setFilteredProperties(filtered);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({ location: '', type: '', maxPrice: '', bedrooms: '' });
  };

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box className="hero-section" sx={{ py: 10, mb: 6 }}>
        <Container maxWidth="lg">
          <Box className="hero-content" sx={{ textAlign: 'center' }}>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                color: 'white',
                mb: 3,
                fontSize: { xs: '2.5rem', md: '3.5rem' }
              }}
            >
              Find Your Perfect
              <Box component="span" sx={{ display: 'block', color: 'rgba(255, 255, 255, 0.8)' }}>
                Dream Home
              </Box>
            </Typography>
            
            <Typography
              variant="h5"
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                mb: 6,
                maxWidth: '600px',
                mx: 'auto'
              }}
            >
              Discover amazing properties in prime locations with our comprehensive real estate platform
            </Typography>

            <Grid container spacing={3} justifyContent="center" sx={{ maxWidth: '800px', mx: 'auto' }}>
              <Grid item xs={12} sm={4}>
                <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}>
                  <CardContent sx={{ textAlign: 'center', py: 3 }}>
                    <HomeIcon sx={{ fontSize: 40, color: 'white', mb: 1 }} />
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                      {properties.length}+ Properties
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}>
                  <CardContent sx={{ textAlign: 'center', py: 3 }}>
                    <LocationIcon sx={{ fontSize: 40, color: 'white', mb: 1 }} />
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                      Multiple Locations
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}>
                  <CardContent sx={{ textAlign: 'center', py: 3 }}>
                    <VerifiedIcon sx={{ fontSize: 40, color: 'white', mb: 1 }} />
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                      Verified Listings
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Search Section */}
        <Paper elevation={3} sx={{ p: 4, mb: 6, borderRadius: 3 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
              Find Properties That Match Your Needs
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Use our advanced filters to discover your perfect home
            </Typography>
          </Box>
          <PropertyFilters filters={filters} onFilterChange={handleFilterChange} />
        </Paper>

        {/* Results Section */}
        {loading ? (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <CircularProgress size={60} sx={{ mb: 3 }} />
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
              Loading Properties
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Please wait while we fetch the latest listings...
            </Typography>
          </Box>
        ) : filteredProperties.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                backgroundColor: 'grey.100',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 3
              }}
            >
              {properties.length === 0 ? (
                <HomeIcon sx={{ fontSize: 40, color: 'grey.400' }} />
              ) : (
                <SearchIcon sx={{ fontSize: 40, color: 'grey.400' }} />
              )}
            </Box>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
              {properties.length === 0 ? 'No Properties Available' : 'No Matching Properties'}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              {properties.length === 0 
                ? 'Be the first to add a property to our platform!'
                : 'Try adjusting your search criteria to find more properties.'}
            </Typography>
            {properties.length > 0 && (
              <Button
                variant="contained"
                size="large"
                startIcon={<RefreshIcon />}
                onClick={clearFilters}
                sx={{ px: 4, py: 1.5 }}
              >
                Clear All Filters
              </Button>
            )}
          </Box>
        ) : (
          <>
            {/* Results Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
              <Box>
                <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Available Properties
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Showing {filteredProperties.length} of {properties.length} properties
                </Typography>
              </Box>
              <Chip
                icon={<VerifiedIcon />}
                label="Updated recently"
                color="primary"
                variant="outlined"
              />
            </Box>

            {/* Properties Grid */}
            <Grid container spacing={4} sx={{ mb: 6 }}>
              {filteredProperties.map((property) => (
                <Grid item xs={12} sm={6} lg={4} key={property.id}>
                  <PropertyCard property={property} />
                </Grid>
              ))}
            </Grid>

            {/* Load More Section */}
            {filteredProperties.length >= 9 && (
              <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Chip
                  icon={<VerifiedIcon />}
                  label="All properties loaded"
                  color="success"
                  sx={{ px: 3, py: 1 }}
                />
              </Box>
            )}
          </>
        )}
      </Container>

      {/* Features Section */}
      <Box sx={{ backgroundColor: 'grey.100', py: 8, mt: 6 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
              Why Choose HouseSell?
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '600px', mx: 'auto' }}>
              We provide the best platform for buying and selling properties with advanced features and trusted service
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card sx={{ textAlign: 'center', p: 3, height: '100%' }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    backgroundColor: 'primary.light',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3
                  }}
                >
                  <SearchIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                </Box>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Smart Search
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Advanced filtering system to find exactly what you're looking for
                </Typography>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card sx={{ textAlign: 'center', p: 3, height: '100%' }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    backgroundColor: 'success.light',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3
                  }}
                >
                  <VerifiedIcon sx={{ fontSize: 40, color: 'success.main' }} />
                </Box>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Verified Listings
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  All properties are verified for authenticity and accuracy
                </Typography>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card sx={{ textAlign: 'center', p: 3, height: '100%' }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    backgroundColor: 'secondary.light',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3
                  }}
                >
                  <SpeedIcon sx={{ fontSize: 40, color: 'secondary.main' }} />
                </Box>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Fast & Secure
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Lightning-fast search with secure user authentication
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default HomePage;
