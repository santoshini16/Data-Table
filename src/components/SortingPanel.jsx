import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Box,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SwapVertIcon from '@mui/icons-material/SwapVert';

const SortingPanel = ({ columns, sorting, setSorting, open, onClose }) => {
  // Function to handle sorting logic
  const handleSortChange = (columnId) => {
    const isSorted = sorting.find(sort => sort.id === columnId);

    if (!isSorted) {
      setSorting([{ id: columnId, desc: false }]); // Sort ascending by default
    } else if (isSorted.desc) {
      setSorting(sorting.filter(sort => sort.id !== columnId)); // Clear sort if already descending
    } else {
      setSorting([{ id: columnId, desc: true }]); // Sort descending
    }
  };

  // Function to clear all sorting
  const handleClearSort = () => {
    setSorting([]);
  };

  return (
    <Dialog open={open} onClose={onClose}  
      PaperProps={{
        sx: {
          position: 'absolute',
          top: 90,
          right: 20,
          padding: 5,
          borderRadius: '8px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
          background: 'linear-gradient(to bottom, #ffffff, #87ceeb)', // Gradient background for the dialog
        },
      }}>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Sort By</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        <Box>
          {columns.map((column) => (
            <Box key={column.id} display="flex" alignItems="center" justifyContent="space-between" sx={{ marginBottom: 1 }}>
              <Button
                variant="outlined"
                onClick={() => handleSortChange(column.id)}
                endIcon={<SwapVertIcon />}
                sx={{ flexGrow: 1, justifyContent: 'space-between' }}
              >
                Sort By {column.label}
              </Button>
            </Box>
          ))}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClearSort} color="secondary" sx={{ marginRight: 8}}>
          Clear Sort
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SortingPanel;







