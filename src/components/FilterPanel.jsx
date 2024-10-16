import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
  IconButton,
  Typography,
  Slider,
} from '@mui/material';

const FilterPanel = ({ open, onClose, categories, subcategories, onApplyFilters }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [salePriceRange, setSalePriceRange] = useState([0, 100]);
  const [createdAt, setCreatedAt] = useState([null, null]);
  const [updatedAt, setUpdatedAt] = useState([null, null]);

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setSelectedCategories(typeof value === 'string' ? value.split(',') : value);
  };

  const handleSubcategoryChange = (event) => {
    const value = event.target.value;
    setSelectedSubcategories(typeof value === 'string' ? value.split(',') : value);
  };
  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
   
  };
  
  const handleSalePriceChange = (event, newValue) => {
    setSalePriceRange(newValue);
    
  };
  
  
  const handleCancel = () => {
    
    setSelectedCategories([]);
    setSelectedSubcategories([]);
    setNameFilter('');
    setPriceRange([0, 100]);
    setCreatedAt([null, null]);
    setUpdatedAt([null, null]);

    onApplyFilters({
      name: '',
      selectedCategories: [],
      selectedSubcategories: [],
      priceRange: [0, 100],
      createdAt: [null, null],
      updatedAt: [null, null],
    });

    onClose();
  };

  const handleApplyFilters = () => {
    // Ensure the correct filter structure is passed
    onApplyFilters({
      name: nameFilter,
      selectedCategories,
      selectedSubcategories,
      priceMin: priceRange[0],  
      priceMax: priceRange[1],
      salePriceMin: salePriceRange[0],
      salePriceMax: salePriceRange[1],
      createdAt,
      updatedAt,
    });
    onClose(); 
  };

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{
      sx: {
        position: 'absolute',
        top: 30,
        right: 20,
        padding: 0,
        borderRadius: '8px',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
        background: 'linear-gradient(to bottom, #ffffff, #87ceeb)',
      },
    }}>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Filter By</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>

          {/* Name Field */}
          <Box sx={{
            border: "1px solid #007BFF",
            borderRadius: "8px",
            padding: 1,
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
          }}>
            <Typography variant="h6">Name</Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
              InputProps={{
                style: {
                  height: '30px',
                },
              }}
              sx={{
                backgroundColor: '#fff',
              }}
            />
          </Box>

          {/* Category Field */}
          <Box sx={{
            border: "1px solid #007BFF",
            borderRadius: "8px",
            padding: 1,
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
          }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Category</Typography>
            <TextField
              select
              fullWidth
              variant="outlined"
              SelectProps={{ multiple: true }}
              value={selectedCategories}
              onChange={handleCategoryChange}
              InputProps={{
                style: {
                  height: '30px',
                },
              }}
              sx={{
                backgroundColor: '#fff',
              }}
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </TextField>
          </Box>

          {/* Subcategory Field */}
          <Box sx={{
            border: "1px solid #007BFF",
            borderRadius: "8px",
            padding: 1,
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
          }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Subcategory</Typography>
            <TextField
              select
              fullWidth
              variant="outlined"
              SelectProps={{ multiple: true }}
              value={selectedSubcategories}
              onChange={handleSubcategoryChange}
              InputProps={{
                style: {
                  height: '30px',
                },
              }}
              sx={{
                backgroundColor: '#fff',
              }}
            >
              {subcategories.map((subcat) => (
                <MenuItem key={subcat} value={subcat}>{subcat}</MenuItem>
              ))}
            </TextField>
          </Box>

       {/* Price Range */}
          <Box sx={{
            border: "1px solid #007BFF",
            borderRadius: "8px",
            padding: 1,
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
          }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Price Range</Typography>
            <Slider
              value={priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={0}
              max={100}
              sx={{ color: 'primary.main' }}
            />
          </Box>

{/* Sale Price Range */}
          <Box sx={{
            border: "1px solid #007BFF",
            borderRadius: "8px",
            padding: 1,
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
          }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Sale Price Range</Typography>
            <Slider
              value={salePriceRange}
              onChange={handleSalePriceChange}
              valueLabelDisplay="auto"
              min={0}
              max={100}
              sx={{ color: 'primary.main' }}
            />
          </Box>


          {/* Created At */}
          <Box sx={{
            border: "1px solid #007BFF",
            borderRadius: "8px",
            padding: 1,
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
          }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Created At</Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                type="date"
                InputProps={{
                  style: {
                    height: '30px',
                  },
                }}
                onChange={(e) => setCreatedAt([e.target.value, createdAt[1]])}
                sx={{ flex: 1 }}
              />
              <TextField
                type="date"
                InputProps={{
                  style: {
                    height: '30px',
                  },
                }}
                onChange={(e) => setCreatedAt([createdAt[0], e.target.value])}
                sx={{ flex: 1 }}
              />
            </Box>
          </Box>

          {/* Updated At */}
          <Box sx={{
            border: "1px solid #007BFF",
            borderRadius: "8px",
            padding: 1,
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
          }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Updated At</Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                type="date"
                InputProps={{
                  style: {
                    height: '30px',
                  },
                }}
                onChange={(e) => setUpdatedAt([e.target.value, updatedAt[1]])}
                sx={{ flex: 1 }}
              />
              <TextField
                type="date"
                InputProps={{
                  style: {
                    height: '30px',
                  },
                }}
                onChange={(e) => setUpdatedAt([updatedAt[0], e.target.value])}
                sx={{ flex: 1 }}
              />
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleApplyFilters}>Apply Filter</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilterPanel;




// Usage example
{/* <FilterPanel
  open={open}
  onClose={() => setOpen(false)}
  categories={['abc','def','ghi']}
  subcategories={['a','d','g']}
/> */}


