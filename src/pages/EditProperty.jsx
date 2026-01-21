import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  InputAdornment,
  Card,
  CardContent,
} from '@mui/material';
import {
  Edit as EditIcon,
  AttachMoney as MoneyIcon,
  LocationOn as LocationIcon,
  Description as DescriptionIcon,
  Image as ImageIcon,
  Bed as BedIcon,
  Bathtub as BathIcon,
  SquareFoot as AreaIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';

function EditProperty() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [property, setProperty] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    type: 'sale',
    bedrooms: '',
    bathrooms: '',
    area: '',
    contact: '',
    images: ['']
  });

  useEffect(() => {
    fetchProperty();
  }, [id, currentUser]);

  const fetchProperty = () => {
    try {
      const allProperties = JSON.parse(localStorage.getItem('properties') || '[]');
      const foundProperty = allProperties.find(p => p.id === id);
      
      if (!foundProperty) {
        setError('Property not found.');
        setLoading(false);
        return;
      }

      // Check if user owns this property
      if (foundProperty.sellerId !== currentUser?.uid) {
        setError('You are not authorized to edit this property.');
        setLoading(false);
        return;
      }

      setProperty(foundProperty);
      setFormData({
        title: foundProperty.title || '',
        description: foundProperty.description || '',
        price: foundProperty.price?.toString() || '',
        location: foundProperty.location || '',
        type: foundProperty.type || 'sale',
        bedrooms: foundProperty.bedrooms?.toString() || '',
        bathrooms: foundProperty.bathrooms?.toString() || '',
        area: foundProperty.area?.toString() || '',
        contact: foundProperty.contact || '',
        images: foundProperty.images?.length > 0 ? foundProperty.images : ['']
      });
    } catch (error) {
      console.error('Error fetching property:', error);
      setError('Failed to load property data.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData(prev => ({
      ...prev,
      images: newImages
    }));
  };

  const addImageField = () => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, '']
    }));
  };

  const removeImageField = (index) => {
    if (formData.images.length > 1) {
      const newImages = formData.images.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        images: newImages
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError('');
      setSuccess('');
      setSaving(true);

      // Filter out empty image URLs
      const validImages = formData.images.filter(img => img.trim() !== '');

      const updatedProperty = {
        ...property,
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        location: formData.location,
        type: formData.type,
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
        area: parseInt(formData.area),
        contact: formData.contact || currentUser.email,
        images: validImages,
        updatedAt: new Date().toISOString()
      };

      // Get all properties and update the specific one
      const allProperties = JSON.parse(localStorage.getItem('properties') || '[]');
      const propertyIndex = allProperties.findIndex(p => p.id === id);
      
      if (propertyIndex === -1) {
        throw new Error('Property not found');
      }

      allProperties[propertyIndex] = updatedProperty;
      localStorage.setItem('properties', JSON.stringify(allProperties));
      
      setSuccess('Property updated successfully!');
      setTimeout(() => {
        navigate(`/property/${id}`);
      }, 2000);

    } catch (err) {
      console.error('Error updating property:', err);
      setError('Failed to update property: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate(`/property/${id}`);
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
            Loading Property
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Please wait while we fetch the property details...
          </Typography>
        </Box>
      </Box>
    );
  }

  if (error && !property) {
    return (
      <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', py: 4 }}>
        <Container maxWidth="md">
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
            <Button
              variant="contained"
              onClick={() => navigate('/my-properties')}
            >
              Back to My Properties
            </Button>
          </Paper>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <EditIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
              Edit Property
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Update your property details below
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 3 }}>
              {success}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Basic Information */}
              <Grid item xs={12}>
                <Card sx={{ mb: 3 }}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                      Basic Information
                    </Typography>
                    
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Property Title"
                          value={formData.title}
                          onChange={(e) => handleInputChange('title', e.target.value)}
                          required
                          placeholder="e.g., Beautiful 3BR House in Downtown"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <EditIcon color="action" />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Price"
                          type="number"
                          value={formData.price}
                          onChange={(e) => handleInputChange('price', e.target.value)}
                          required
                          placeholder="Enter price in USD"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <MoneyIcon color="action" />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth required>
                          <InputLabel>Property Type</InputLabel>
                          <Select
                            value={formData.type}
                            onChange={(e) => handleInputChange('type', e.target.value)}
                            label="Property Type"
                          >
                            <MenuItem value="sale">For Sale</MenuItem>
                            <MenuItem value="rent">For Rent</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Location"
                          value={formData.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          required
                          placeholder="e.g., New York, NY"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LocationIcon color="action" />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              {/* Property Details */}
              <Grid item xs={12}>
                <Card sx={{ mb: 3 }}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                      Property Details
                    </Typography>
                    
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          fullWidth
                          label="Bedrooms"
                          type="number"
                          value={formData.bedrooms}
                          onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                          required
                          inputProps={{ min: 0 }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <BedIcon color="action" />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} sm={4}>
                        <TextField
                          fullWidth
                          label="Bathrooms"
                          type="number"
                          value={formData.bathrooms}
                          onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                          required
                          inputProps={{ min: 0 }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <BathIcon color="action" />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} sm={4}>
                        <TextField
                          fullWidth
                          label="Area (sq ft)"
                          type="number"
                          value={formData.area}
                          onChange={(e) => handleInputChange('area', e.target.value)}
                          required
                          inputProps={{ min: 0 }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <AreaIcon color="action" />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Description"
                          multiline
                          rows={4}
                          value={formData.description}
                          onChange={(e) => handleInputChange('description', e.target.value)}
                          required
                          placeholder="Describe your property in detail..."
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1 }}>
                                <DescriptionIcon color="action" />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              {/* Images */}
              <Grid item xs={12}>
                <Card sx={{ mb: 3 }}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                      Property Images
                    </Typography>
                    
                    {formData.images.map((image, index) => (
                      <Box key={index} sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <TextField
                          fullWidth
                          label={`Image URL ${index + 1}`}
                          value={image}
                          onChange={(e) => handleImageChange(index, e.target.value)}
                          placeholder="https://example.com/image.jpg"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <ImageIcon color="action" />
                              </InputAdornment>
                            ),
                          }}
                        />
                        {formData.images.length > 1 && (
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => removeImageField(index)}
                            sx={{ minWidth: 'auto', px: 2 }}
                          >
                            ×
                          </Button>
                        )}
                      </Box>
                    ))}
                    
                    <Button
                      variant="outlined"
                      onClick={addImageField}
                      sx={{ mt: 1 }}
                    >
                      Add Another Image
                    </Button>
                  </CardContent>
                </Card>
              </Grid>

              {/* Contact Information */}
              <Grid item xs={12}>
                <Card sx={{ mb: 3 }}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                      Contact Information
                    </Typography>
                    
                    <TextField
                      fullWidth
                      label="Contact Email"
                      type="email"
                      value={formData.contact}
                      onChange={(e) => handleInputChange('contact', e.target.value)}
                      placeholder={currentUser?.email || 'your@email.com'}
                      helperText="Leave empty to use your account email"
                    />
                  </CardContent>
                </Card>
              </Grid>

              {/* Action Buttons */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<CancelIcon />}
                    onClick={handleCancel}
                    sx={{ px: 4, py: 1.5 }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={saving}
                    startIcon={saving ? <CircularProgress size={20} /> : <SaveIcon />}
                    sx={{ px: 4, py: 1.5 }}
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default EditProperty;