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
} from '@mui/material';

const GroupPanel = ({ open, onClose, applyGrouping, clearGrouping }) => {
  const [groupBy, setGroupBy] = useState([]);
  const groupArr = ['category', 'subcategory'];

  const handleGroupChange = (e) => {
    const {
      target: { value },
    } = e;
    console.log('Current selected group:', value);
    setGroupBy(typeof value === 'string' ? value.split(',') : value);
  };

  const handleApply = () => {
    console.log('Applying grouping:', groupBy);
    applyGrouping(groupBy); // Call the passed function to apply grouping
    console.log('New grouping state:', groupBy); // Log the current grouping state
    onClose();
  };

  const handleClear = () => {
    clearGrouping();
    setGroupBy([]);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{
      sx: {
        position: 'absolute',
        top: 50,
        right: 30,
        padding: 3,
        borderRadius: '8px',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
        background: 'linear-gradient(to bottom, #ffffff, #87ceeb)',
        width:'300px',
        height:'400px'
      },
    }}>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Group By</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column'}}>
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
              value={groupBy}
              onChange={handleGroupChange}
              InputProps={{
                style: {
                  height: '30px',
                },
              }}
              sx={{
                backgroundColor: '#fff',
              }}
            >
              {groupArr.map((cat) => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </TextField>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{
        display:'flex',
        flexDirection:'column',
      }}>
        <Button onClick={handleClear}>Cancel</Button>
        <Button onClick={handleApply}>Apply Grouping</Button>
      </DialogActions>
    </Dialog>
  );
};

export default GroupPanel;

