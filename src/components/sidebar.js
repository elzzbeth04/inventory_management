import React, { useState, useEffect } from 'react';
import { List, Avatar, Typography, Box, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const Sidebar = () => {
  const [firstName, setFirstName] = useState('');

  // State for toggling dropdowns
  const [showProductOptions, setShowProductOptions] = useState(false);
  const [showSupplierOptions, setShowSupplierOptions] = useState(false);
  const [showPurchaseOrderOptions, setShowPurchaseOrderOptions] = useState(false);
  const [showUserOptions, setShowUserOptions] = useState(false);

  // State for tracking selected option
  const [selectedOption, setSelectedOption] = useState('');

  // Fetch username from localStorage when the component mounts
  useEffect(() => {
    const storedFirstName = localStorage.getItem('username');
    if (storedFirstName) {
      setFirstName(storedFirstName);
    }
  }, []);

  const handleProductClick = () => {
    setShowProductOptions(!showProductOptions);
  };

  const handleSupplierClick = () => {
    setShowSupplierOptions(!showSupplierOptions);
  };

  const handlePurchaseOrderClick = () => {
    setShowPurchaseOrderOptions(!showPurchaseOrderOptions);
  };

  const handleUserClick = () => {
    setShowUserOptions(!showUserOptions);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const isSelected = (option) => selectedOption === option;

  return (
      <Box 
        sx={{ 
          backgroundColor: '#003366', 
          minHeight: '100vh',  // Ensures it stretches with the dashboard content
          width: '250px',      // Fixed width for the sidebar
          color: '#fff', 
          padding: '20px', 
          position: 'fixed',   // Sticks the sidebar to the left
          top: 0,              // Ensures it starts from the top
          left: 0,             // Keeps it aligned to the left
          overflowY: 'auto' 
        }}
      >
    
      <Typography variant="h4" gutterBottom>
        IMS
      </Typography>
      <Avatar alt={firstName} src="https://via.placeholder.com/150" />
      <Typography variant="body1" gutterBottom>{firstName || 'User'}</Typography>

      <List sx={{ paddingTop: 2 }}>
        <Link to="/dashboard" style={{ display: 'block', color: 'inherit', padding: '10px 0', textDecoration: 'none' }}>
          <Box sx={{ padding: '10px 0', color: 'inherit', backgroundColor: isSelected('dashboard') ? '#A9A9A9' : 'transparent' }} 
               onClick={() => handleOptionSelect('dashboard')}>
            Dashboard
          </Box>
        </Link>
        <Link to="/reports" style={{ display: 'block', color: 'inherit', padding: '10px 0', textDecoration: 'none' }}>
          <Box sx={{ padding: '10px 0', color: 'inherit', backgroundColor: isSelected('reports') ? '#A9A9A9' : 'transparent' }} 
               onClick={() => handleOptionSelect('reports')}>
            Reports
          </Box>
        </Link>

        {/* Product Section */}
        <Box 
          onClick={handleProductClick} 
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'inherit', padding: '10px 0', cursor: 'pointer' }}
        >
          <Typography>Product</Typography>
          {showProductOptions ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </Box>
        {showProductOptions && (
          <Box sx={{ paddingLeft: 2, marginTop: '1px' }}>
            <Paper
              elevation={1}
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '5px',
                marginBottom: '5px',
                backgroundColor: isSelected('add-product') ? '#A9A9A9' : '#003366',
                color: '#fff',
                cursor: 'pointer',
                textDecoration: 'none',
                '&:hover': { backgroundColor: '#A9A9A9' }
              }}
              component={Link}
              to="/addproduct"
              onClick={() => handleOptionSelect('add-product')}
            >
              <Typography>Add Product</Typography>
            </Paper>
            <Paper
              elevation={1}
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '5px',
                marginBottom: '5px',
                backgroundColor: isSelected('view-product') ? '#A9A9A9' : '#003366',
                color: '#fff',
                cursor: 'pointer',
                textDecoration: 'none',
                '&:hover': { backgroundColor: '#A9A9A9' }
              }}
              component={Link}
              to="/viewproduct"
              onClick={() => handleOptionSelect('view-product')}
            >
              <Typography>View Product</Typography>
            </Paper>
          </Box>
        )}

        {/* Supplier Section */}
        <Box 
          onClick={handleSupplierClick} 
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'inherit', padding: '10px 0', cursor: 'pointer' }}
        >
          <Typography>Supplier</Typography>
          {showSupplierOptions ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </Box>
        {showSupplierOptions && (
          <Box sx={{ paddingLeft: 2, marginTop: '1px' }}>
            <Paper
              elevation={1}
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '5px',
                marginBottom: '5px',
                backgroundColor: isSelected('add-supplier') ? '#A9A9A9' : '#003366',
                color: '#fff',
                cursor: 'pointer',
                textDecoration: 'none',
                '&:hover': { backgroundColor: '#A9A9A9' }
              }}
              component={Link}
              to="/create-suppliers"
              onClick={() => handleOptionSelect('add-supplier')}
            >
              <Typography>Add Supplier</Typography>
            </Paper>
            <Paper
              elevation={1}
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '5px',
                marginBottom: '5px',
                backgroundColor: isSelected('view-supplier') ? '#A9A9A9' : '#003366',
                color: '#fff',
                cursor: 'pointer',
                textDecoration: 'none',
                '&:hover': { backgroundColor: '#A9A9A9' }
              }}
              component={Link}
              to="/view-suppliers"
              onClick={() => handleOptionSelect('view-supplier')}
            >
              <Typography>View Supplier</Typography>
            </Paper>
          </Box>
        )}

        {/* Purchase Order Section */}
        <Box 
          onClick={handlePurchaseOrderClick} 
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'inherit', padding: '10px 0', cursor: 'pointer' }}
        >
          <Typography>Purchase Order</Typography>
          {showPurchaseOrderOptions ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </Box>
        {showPurchaseOrderOptions && (
          <Box sx={{ paddingLeft: 2, marginTop: '1px' }}>
            <Paper
              elevation={1}
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '5px',
                marginBottom: '5px',
                backgroundColor: isSelected('add-order') ? '#A9A9A9' : '#003366',
                color: '#fff',
                cursor: 'pointer',
                textDecoration: 'none',
                '&:hover': { backgroundColor: '#A9A9A9' }
              }}
              component={Link}
              to="/create-orders"
              onClick={() => handleOptionSelect('add-order')}
            >
              <Typography>Add Purchase Order</Typography>
            </Paper>
            <Paper
              elevation={1}
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '5px',
                marginBottom: '5px',
                backgroundColor: isSelected('view-order') ? '#A9A9A9' : '#003366',
                color: '#fff',
                cursor: 'pointer',
                textDecoration: 'none',
                '&:hover': { backgroundColor: '#A9A9A9' }
              }}
              component={Link}
              to="/view-orders"
              onClick={() => handleOptionSelect('view-order')}
            >
              <Typography>View Purchase Order</Typography>
            </Paper>
          </Box>
        )}

        {/* User Section */}
        <Box 
          onClick={handleUserClick} 
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'inherit', padding: '10px 0', cursor: 'pointer' }}
        >
          <Typography>User</Typography>
          {showUserOptions ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </Box>
        {showUserOptions && (
          <Box sx={{ paddingLeft: 2, marginTop: '1px' }}>
            <Paper
              elevation={1}
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '5px',
                marginBottom: '5px',
                backgroundColor: isSelected('add-user') ? '#A9A9A9' : '#003366',
                color: '#fff',
                cursor: 'pointer',
                textDecoration: 'none',
                '&:hover': { backgroundColor: '#A9A9A9' }
              }}
              component={Link}
              to="/adduser"
              onClick={() => handleOptionSelect('add-user')}
            >
              <Typography>Add User</Typography>
            </Paper>
            <Paper
              elevation={1}
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '5px',
                marginBottom: '5px',
                backgroundColor: isSelected('view-user') ? '#A9A9A9' : '#003366',
                color: '#fff',
                cursor: 'pointer',
                textDecoration: 'none',
                '&:hover': { backgroundColor: '#A9A9A9' }
              }}
              component={Link}
              to="/viewusers"
              onClick={() => handleOptionSelect('view-user')}
            >
              <Typography>View User</Typography>
            </Paper>
          </Box>
        )}
      </List>
    </Box>
  );
};

export default Sidebar;