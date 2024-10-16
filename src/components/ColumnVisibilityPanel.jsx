import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  IconButton,
  Box,
  FormControlLabel,
  Switch,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ColumnVisibilityPanel = ({ columns, columnVisibility, setColumnVisibility, open, onClose }) => {
  const handleToggleColumn = (columnId) => {
    // Toggle the visibility of the selected column
    setColumnVisibility((prev) => ({
      ...prev,
      [columnId]: !prev[columnId],
    }));
  };

  // Function to show all columns
  const handleShowAllColumns = () => {
    // Set all columns to visible
    const allVisible = columns.reduce((acc, column) => {
      acc[column.id] = true; // Set all columns to visible
      return acc;
    }, {});
    setColumnVisibility(allVisible);
  };

  // Function to apply changes
  const handleApply = () => {
    // Close the dialog after applying
    onClose(); 
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          position: 'absolute',
          top: 80,
          right: 20,
          padding: 6,
          borderRadius: '8px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
          background: 'linear-gradient(to bottom, #ffffff, #87ceeb)', // Gradient background for the dialog
        },
      }}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <span>Column Visibility</span>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <div style={{ padding: 20 }}>
        <Box display="flex" flexDirection="column">
          {columns.map((column) => (
            <Box
              key={column.id}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              sx={{ marginBottom: '8px', color: '#333' }} // Margin for spacing
            >
              <span>{column.label}</span> {/* Column label */}
              <Switch
                checked={columnVisibility[column.id] ?? true} // Default to true if not specified
                onChange={() => handleToggleColumn(column.id)}
                color="primary"
                sx={{ marginLeft: '16px' }} // Adjust margin for gap
              />
            </Box>
          ))}
        </Box>
      </div>
      <DialogActions>
        <Button onClick={handleShowAllColumns} color="primary">
          Show All Columns
        </Button>
        <Button onClick={handleApply} color="secondary">
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ColumnVisibilityPanel;





