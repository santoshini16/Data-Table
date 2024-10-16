
import React, { useEffect, useMemo, useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FilterListIcon from '@mui/icons-material/FilterList';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import LayersIcon from '@mui/icons-material/Layers';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';


import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
  IconButton,
  Toolbar,
  ThemeProvider,
  createTheme,
  Box,
} from '@mui/material';
import Pagination from './Pagination';
import { useReactTable, getCoreRowModel, getSortedRowModel,getGroupedRowModel } from '@tanstack/react-table';
import ColumnVisibilityPanel from './ColumnVisibilityPanel';
import SortingPanel from './SortingPanel';
import FilterPanel from './FilterPanel';
import GroupPanel from './GroupPanel';

const columns = [
  { id: 'id', label: 'ID', minWidth: 50 },
  { id: 'name', label: 'Name', minWidth: 150 },
  { id: 'category', label: 'Category', minWidth: 100 },
  { id: 'subcategory', label: 'Subcategory', minWidth: 100 },
  { id: 'createdAt', label: 'Created At', minWidth: 210 },
  { id: 'updatedAt', label: 'Updated At', minWidth: 210 },
  { id: 'price', label: 'Price', minWidth: 60, align: 'right' },
  { id: 'salePrice', label: 'Sale Price', minWidth: 60, align: 'right' },
];

function createData(id, name, category, subcategory, createdAt, updatedAt, price, salePrice) {
  return { id, name, category, subcategory, createdAt, updatedAt, price, salePrice };
}

const customTheme = createTheme({
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '10px 20px',
          border: '1px solid #e0e0e0',
        },
        head: {
          backgroundColor: '#0097A7',
          fontWeight: 'bold',
          color: '#FFFFFF',
          paddingLeft:10,
          textAlign:'center'
        },
      },
    },
  },
  typography: {
    h6: {
      fontWeight: 700,
      color: '#1976d2',
    },
  },
});

const DataTable = () => {
  const [rows, setRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [sorting, setSorting] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({
    id: true,
    name: true,
    category: true,
    subcategory: true,
    createdAt: true,
    updatedAt: true,
    price: true,
    salePrice: true,
  });
  const [open, setOpen] = useState(false);
  const [openSorting, setOpenSorting] = useState(false);
  const [openFiltering, setOpenFiltering] = useState(false);
  const [filters, setFilters] = useState({
    selectedCategories: [],
    selectedSubcategories: [],
    name: '', 
    createdAt: '',
    updatedAt: '',
    priceMin: '',
    priceMax: '',
    salePriceMin: '',
    salePriceMax: '',
  });
  const [grouping, setGrouping] = useState([]);
  const [openGrouping,setOpenGrouping]=useState(false)
  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => {
        const formattedRows = data.map((item) =>
          createData(
            item.id,
            item.name,
            item.category,
            item.subcategory,
            item.createdAt,
            item.updatedAt,
            item.price,
            item.sale_price
          )
        );
        setRows(formattedRows);
        setCurrentPage(1);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const categories = [...new Set(rows.map(row => row.category))]; 
  const subcategories = [...new Set(rows.map(row => row.subcategory))]; 

  const applyFilters = (selectedFilters) => {
    setFilters(selectedFilters);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const matchesCategory = filters.selectedCategories.length === 0 || filters.selectedCategories.includes(row.category);
      const matchesSubcategory = filters.selectedSubcategories.length === 0 || filters.selectedSubcategories.includes(row.subcategory);
      const matchesName = row.name.toLowerCase().includes(filters.name.toLowerCase());
  
      const matchesCreatedAt = (filters.createdAt[0] ? new Date(row.createdAt) >= new Date(filters.createdAt[0]) : true) &&
                               (filters.createdAt[1] ? new Date(row.createdAt) <= new Date(filters.createdAt[1]) : true);
  
      const matchesUpdatedAt = (filters.updatedAt[0] ? new Date(row.updatedAt) >= new Date(filters.updatedAt[0]) : true) &&
                               (filters.updatedAt[1] ? new Date(row.updatedAt) <= new Date(filters.updatedAt[1]) : true);
  
      
                             
  
      return matchesCategory && matchesSubcategory && matchesName && matchesCreatedAt && matchesUpdatedAt  &&
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        );
    });
  }, [rows, filters, searchQuery]);
  
  

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;

  // Get current rows based on pagination and sorting
  const currentRows = useMemo(() => {
    // Sort the filtered rows
    const sortedRows = [...filteredRows].sort((a, b) => {
      for (const sort of sorting) {
        const { id, desc } = sort;
        if (a[id] < b[id]) return desc ? 1 : -1;
        if (a[id] > b[id]) return desc ? -1 : 1;
      }
      return 0; // If equal
    });
    return sortedRows.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredRows, sorting, startIndex, rowsPerPage]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // Use the useReactTable hook with sorting and other settings
  const table = useReactTable({
    data: currentRows,
    columns,
    state: {
      columnVisibility,
      sorting,
      grouping,
    },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    onSortingChange: setSorting,
    onGroupingChange: setGrouping,
  });

  const handleHeaderClick = (columnId) => {
    const existingSorting = sorting.find((s) => s.id === columnId);
    const newSortingOrder = existingSorting ? !existingSorting.desc : false; // Toggle order

    const newSorting = existingSorting
      ? sorting.map((s) => (s.id === columnId ? { ...s, desc: newSortingOrder } : s))
      : [...sorting, { id: columnId, desc: newSortingOrder }];

    setSorting(newSorting);
  };

  useEffect(() => {
    console.log('Rows:', rows);
    console.log('Filtered Rows:', filteredRows);
    console.log('Current Rows:', currentRows);
  }, [rows, filteredRows, currentRows]);

  const applyGrouping = (groupBy) => {
    console.log('Applying grouping:', groupBy);
    setGrouping(groupBy); // Set grouping state based on selected groupBy
  };

  // Clear grouping function
  const clearGrouping = () => {
    setGrouping([]); // Clear grouping state
  };
 
  useEffect(() => {
    console.log('Current Grouping:', grouping);
  }, [grouping]);

  return (
    <ThemeProvider theme={customTheme}>
      <Paper
        sx={{
          width: '100%',
          overflow: 'hidden',
          padding: 6,
          backgroundImage: 'linear-gradient(to left, #e0f7fa, #b2ebf2)',
        }}
      >
        <Typography variant="h6" component="div" sx={{ marginBottom: 2,textAlign:'center' }}>
          Advanced Data Table
        </Typography>

        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ width: '250px' }}
          />

          <Box>
            <IconButton onClick={() => setOpen(true)}>
              <VisibilityIcon />
            </IconButton>
            <IconButton onClick={() => setOpenSorting(true)}>
              <SwapVertIcon />
            </IconButton>
            <IconButton onClick={() => setOpenFiltering(true)}>
              <FilterListIcon />
            </IconButton>
            <IconButton onClick={() => setOpenGrouping(true)}>
              <LayersIcon />
            </IconButton>
          </Box>
        </Toolbar>

        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  columnVisibility[column.id] && (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                      onClick={() => handleHeaderClick(column.id)} 
                    >
                      {column.label}
                      {sorting.find((s) => s.id === column.id) && (
                        sorting.find((s) => s.id === column.id).desc ? (
                          <ArrowDownwardIcon fontSize="small" />
                        ) : (
                          <ArrowUpwardIcon fontSize="small" />
                        )
                      )}
                    </TableCell>
                  )
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {currentRows.map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      columnVisibility[column.id] && (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      )
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </Paper>

      {/* Column Visibility Panel */}
      <ColumnVisibilityPanel
        open={open}
        onClose={() => setOpen(false)}
        columns={columns}
        columnVisibility={columnVisibility}
        setColumnVisibility={setColumnVisibility}
      />

      {/* Sorting Panel */}
      <SortingPanel
        open={openSorting}
        onClose={() => setOpenSorting(false)}
        columns={columns}
        sorting={sorting}
        setSorting={setSorting}
      />
      <FilterPanel
        open={openFiltering}
        onClose={() => setOpenFiltering(false)}
        categories={categories}
        subcategories={subcategories}
        onApplyFilters={applyFilters}
      />
      <GroupPanel
         open={openGrouping}
         onClose={() => setOpenGrouping(false)}
         applyGrouping={applyGrouping}
         clearGrouping={clearGrouping}
      />
    </ThemeProvider>
  );
};

export default DataTable;














