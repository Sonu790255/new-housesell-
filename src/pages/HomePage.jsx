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
      <Box className="hero-section" sx={{ py: 12, mb: 6 }}>
        <Container maxWidth="lg">
          <Box className="hero-content" sx={{ textAlign: 'center' }}>
            <Typography
              variant="h1"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                color: 'white',
                mb: 2,
                fontSize: { xs: '2.75rem', md: '4rem' },
                letterSpacing: '-0.02em',
                lineHeight: 1.2
              }}
            >
              Find Your Perfect
              <Box 
                component="span" 
                sx={{ 
                  display: 'block', 
                  background: 'linear-gradient(90deg, #60a5fa 0%, #a78bfa 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Dream Home
              </Box>
            </Typography>
            
            <Typography
              variant="h6"
              sx={{
                color: 'rgba(255, 255, 255, 0.85)',
                mb: 6,
                maxWidth: '650px',
                mx: 'auto',
                fontWeight: 400,
                lineHeight: 1.6
              }}
            >
              Discover exceptional properties in prime locations with our comprehensive real estate platform
            </Typography>

            <Grid container spacing={3} justifyContent="center" sx={{ maxWidth: '900px', mx: 'auto' }}>
              <Grid item xs={12} sm={4}>
                <Card 
                  sx={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.08)', 
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.12)',
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)'
                    }
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', py: 3 }}>
                    <HomeIcon sx={{ fontSize: 48, color: '#60a5fa', mb: 1.5 }} />
                    <Typography variant="h4" sx={{ color: 'white', fontWeight: 700, mb: 0.5 }}>
                      {properties.length}+
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      Properties Listed
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card 
                  sx={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.08)', 
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.12)',
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)'
                    }
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', py: 3 }}>
                    <LocationIcon sx={{ fontSize: 48, color: '#a78bfa', mb: 1.5 }} />
                    <Typography variant="h4" sx={{ color: 'white', fontWeight: 700, mb: 0.5 }}>
                      50+
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      Prime Locations
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card 
                  sx={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.08)', 
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.12)',
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)'
                    }
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', py: 3 }}>
                    <VerifiedIcon sx={{ fontSize: 48, color: '#34d399', mb: 1.5 }} />
                    <Typography variant="h4" sx={{ color: 'white', fontWeight: 700, mb: 0.5 }}>
                      100%
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
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
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4, 
            mb: 6, 
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'grey.200',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography 
              variant="h4" 
              component="h2" 
              gutterBottom 
              sx={{ 
                fontWeight: 700,
                color: 'grey.900',
                letterSpacing: '-0.01em'
              }}
            >
              Find Properties That Match Your Needs
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.05rem' }}>
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
                <Typography 
                  variant="h4" 
                  component="h2" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 700,
                    color: 'grey.900',
                    letterSpacing: '-0.01em'
                  }}
                >
                  Available Properties
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.05rem' }}>
                  Showing {filteredProperties.length} of {properties.length} properties
                </Typography>
              </Box>
              <Chip
                icon={<VerifiedIcon />}
                label="Recently Updated"
                sx={{
                  backgroundColor: '#ecfdf5',
                  color: '#059669',
                  fontWeight: 600,
                  border: '1px solid #a7f3d0',
                  '& .MuiChip-icon': {
                    color: '#059669'
                  }
                }}
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
      <Box sx={{ backgroundColor: '#f8fafc', py: 10, mt: 6 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography 
              variant="h3" 
              component="h2" 
              gutterBottom 
              sx={{ 
                fontWeight: 700,
                color: 'grey.900',
                letterSpacing: '-0.02em'
              }}
            >
              Why Choose HouseSell?
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary" 
              sx={{ 
                maxWidth: '700px', 
                mx: 'auto',
                fontWeight: 400,
                lineHeight: 1.6
              }}
            >
              We provide the best platform for buying and selling properties with advanced features and trusted service
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card 
                elevation={0}
                sx={{ 
                  textAlign: 'center', 
                  p: 4, 
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'grey.200',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.1)',
                    transform: 'translateY(-8px)',
                    borderColor: 'primary.light'
                  }
                }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '20px',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3,
                    boxShadow: '0 8px 24px rgba(59, 130, 246, 0.25)'
                  }}
                >
                  <SearchIcon sx={{ fontSize: 40, color: 'white' }} />
                </Box>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
                  Smart Search
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  Advanced filtering system to find exactly what you're looking for
                </Typography>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card 
                elevation={0}
                sx={{ 
                  textAlign: 'center', 
                  p: 4, 
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'grey.200',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.1)',
                    transform: 'translateY(-8px)',
                    borderColor: 'success.light'
                  }
                }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '20px',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3,
                    boxShadow: '0 8px 24px rgba(16, 185, 129, 0.25)'
                  }}
                >
                  <VerifiedIcon sx={{ fontSize: 40, color: 'white' }} />
                </Box>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
                  Verified Listings
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  All properties are verified for authenticity and accuracy
                </Typography>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card 
                elevation={0}
                sx={{ 
                  textAlign: 'center', 
                  p: 4, 
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'grey.200',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.1)',
                    transform: 'translateY(-8px)',
                    borderColor: 'secondary.light'
                  }
                }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '20px',
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3,
                    boxShadow: '0 8px 24px rgba(139, 92, 246, 0.25)'
                  }}
                >
                  <SpeedIcon sx={{ fontSize: 40, color: 'white' }} />
                </Box>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
                  Fast & Secure
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
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
