import {
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Box,
} from '@mui/material';
import { Clear as ClearIcon } from '@mui/icons-material';

function PropertyFilters({ filters, onFilterChange }) {
  const clearAllFilters = () => {
    onFilterChange('location', '');
    onFilterChange('type', '');
    onFilterChange('maxPrice', '');
    onFilterChange('bedrooms', '');
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Location"
            placeholder="City, State"
            value={filters.location || ''}
            onChange={(e) => onFilterChange('location', e.target.value)}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Type</InputLabel>
            <Select
              value={filters.type || ''}
              onChange={(e) => onFilterChange('type', e.target.value)}
              label="Type"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="sale">For Sale</MenuItem>
              <MenuItem value="rent">For Rent</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Max Price"
            type="number"
            placeholder="Max price"
            value={filters.maxPrice || ''}
            onChange={(e) => onFilterChange('maxPrice', e.target.value)}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Bedrooms</InputLabel>
            <Select
              value={filters.bedrooms || ''}
              onChange={(e) => onFilterChange('bedrooms', e.target.value)}
              label="Bedrooms"
            >
              <MenuItem value="">Any</MenuItem>
              <MenuItem value="1">1+</MenuItem>
              <MenuItem value="2">2+</MenuItem>
              <MenuItem value="3">3+</MenuItem>
              <MenuItem value="4">4+</MenuItem>
              <MenuItem value="5">5+</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Button
          onClick={clearAllFilters}
          startIcon={<ClearIcon />}
          color="primary"
          variant="text"
        >
          Clear Filters
        </Button>
      </Box>
    </Box>
  );
}

export default PropertyFilters;
