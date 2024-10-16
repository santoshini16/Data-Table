import React from 'react';
import { Box, Button } from '@mui/material';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const handleClick = (page) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const paginationItems = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationItems.push(
      <Button
        key={i}
        variant="outlined"
        onClick={() => handleClick(i)}
        sx={{
          margin: '0 2px',
          border: currentPage === i ? '2px solid #1976d2' : '1px solid #ccc',
          color: currentPage === i ? '#1976d2' : '#333',
          padding: '6px', 
          minWidth: '36px', 
          height: '36px',
          '&:hover': {
            boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)',
          },
        }}
      >
        {i}
      </Button>
    );
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" sx={{ marginTop: 2 }}>
      <Button
       
        disabled={currentPage === 1}
        onClick={() => handleClick(currentPage - 1)}
        sx={{
          padding: '6px', 
          minWidth: '36px', 
          height: '36px',
          fontWeight: 'bold', 
          fontSize: '1.5rem', 
        }}
      >
        {'<'}
      </Button>
      {paginationItems}
      <Button
       
        disabled={currentPage === totalPages}
        onClick={() => handleClick(currentPage + 1)}
        sx={{
          padding: '6px',
          minWidth: '36px', 
          height: '36px',
          fontWeight: 'bold', 
          fontSize: '1.5rem', 
        }}
      >
        {'>'}
      </Button>
    </Box>
  );
};

export default Pagination;

