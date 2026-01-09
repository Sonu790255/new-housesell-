import { Link } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Box,
  IconButton,
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  Bed as BedIcon,
  Bathtub as BathIcon,
  SquareFoot as AreaIcon,
} from '@mui/icons-material';

function PropertyCard({ property }) {
  if (!property) {
    return null;
  }

  const formatPrice = (price) => {
    if (!price || isNaN(price)) return '$0';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <Card
      component={Link}
      to={`/property/${property.id}`}
      className="property-card"
      sx={{
        textDecoration: 'none',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        '&:hover': {
          textDecoration: 'none',
        },
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="200"
          image={property.images && property.images.length > 0 ? property.images[0] : '/api/placeholder/400/200'}
          alt={property.title || 'Property image'}
          sx={{
            objectFit: 'cover',
            backgroundColor: 'grey.200',
          }}
          onError={(e) => {
            e.target.src = '/api/placeholder/400/200';
          }}
        />
        <Box sx={{ position: 'absolute', top: 12, right: 12 }}>
          <Chip
            label={property.type === 'sale' ? 'For Sale' : property.type === 'rent' ? 'For Rent' : 'Property'}
            color={property.type === 'sale' ? 'success' : 'primary'}
            size="small"
            sx={{
              fontWeight: 'bold',
              color: 'white',
            }}
          />
        </Box>
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Typography
          variant="h6"
          component="h3"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: 'text.primary',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {property.title || 'Untitled Property'}
        </Typography>

        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            color: 'primary.main',
            mb: 2,
          }}
        >
          {formatPrice(property.price)}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, color: 'text.secondary' }}>
          <LocationIcon sx={{ fontSize: 18, mr: 1 }} />
          <Typography variant="body2">
            {property.location || 'Location not specified'}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
            <BedIcon sx={{ fontSize: 16, mr: 0.5 }} />
            <Typography variant="caption">
              {property.bedrooms || 0} Beds
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
            <BathIcon sx={{ fontSize: 16, mr: 0.5 }} />
            <Typography variant="caption">
              {property.bathrooms || 0} Baths
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
            <AreaIcon sx={{ fontSize: 16, mr: 0.5 }} />
            <Typography variant="caption">
              {property.area || 0} sq ft
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default PropertyCard;
