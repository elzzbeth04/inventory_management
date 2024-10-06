import React, { useState, useEffect } from 'react';
import { List, Avatar, Typography, Box, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import profile from '../assets/prfile.png'
import profile2 from '../assets/pmic.png'
const Sidebar = () => {
  const [firstName, setFirstName] = useState('');

  // State for toggling dropdowns
  const [showProductOptions, setShowProductOptions] = useState(false);
  const [showSupplierOptions, setShowSupplierOptions] = useState(false);
  const [showPurchaseOrderOptions, setShowPurchaseOrderOptions] = useState(false);
  const [showUserOptions, setShowUserOptions] = useState(false);

  // Fetch username from localStorage when the component mounts
  useEffect(() => {
    const storedFirstName = localStorage.getItem('username'); // Get the first name stored in localStorage
    if (storedFirstName) {
      setFirstName(storedFirstName); // Set the first name to state
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

  return (
    <Box sx={{ backgroundColor: '#003366', height: '100vh', color: '#fff', padding: '15px' }}>
      <Typography variant="h4" gutterBottom sx={{ ml: 2 }}>
        IMS
      </Typography>
      <Avatar 
      alt={firstName} 
      src={profile} 
      sx={{ marginLeft: '16px' }} // Add left margin using sx prop
    />
      {/* Display the dynamically fetched first name */}
      <Typography variant="body1" gutterBottom sx={{ ml: 2 }}>
        {firstName || 'User'}
      </Typography>

      <List sx={{ paddingTop: 1 ,ml:2}}>
        <Link to="/dashboard" style={{ display: 'block', color: 'inherit', padding: '10px 0', textDecoration: 'none' }}>
          <Box sx={{ padding: 'px 0', color: 'inherit' }}>Dashboard</Box>
        </Link>
        <Link to="/reports" style={{ display: 'block', color: 'inherit', padding: '10px 0', textDecoration: 'none' }}>
          <Box sx={{ padding: 'px 0', color: 'inherit' }}>Reports</Box>
        </Link>

        <Box 
          onClick={handleProductClick} 
          sx={{ display: 'block', color: 'inherit', padding: '10px 0', cursor: 'pointer' }}
        >
          <Typography>Product</Typography>
        </Box>

        {showProductOptions && (
          <Box sx={{ paddingLeft: 1, marginTop: '1px' }}>
            <Paper
              elevation={1}
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '5px',
                marginBottom: '5px',
                backgroundColor: '#003366',
                color: '#fff',
                cursor: 'pointer',
                textDecoration: 'none',
                '&:hover': { backgroundColor: '#0059b3', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }
              }}
              component={Link}
              to="/addproduct"
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
                backgroundColor: '#003366',
                color: '#fff',
                cursor: 'pointer',
                textDecoration: 'none',
                '&:hover': { backgroundColor: '#0059b3', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }
              }}
              component={Link}
              to="/viewproduct"
            >
              <Typography>View Product</Typography>
            </Paper>
          </Box>
        )}

        {/* Similar sections for Supplier, Purchase Order, and User */}
        {/* Supplier Section */}
        <Box 
          onClick={handleSupplierClick} 
          sx={{ display: 'block', color: 'inherit', padding: '10px 0', cursor: 'pointer' }}
        >
          <Typography>Supplier</Typography>
        </Box>

        {showSupplierOptions && (
          <Box sx={{ paddingLeft: 1, marginTop: '1px' }}>
            <Paper
              elevation={1}
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '5px',
                marginBottom: '5px',
                backgroundColor: '#003366',
                color: '#fff',
                cursor: 'pointer',
                textDecoration: 'none',
                '&:hover': { backgroundColor: '#0059b3', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }
              }}
              component={Link}
              to="/create-suppliers"
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
                backgroundColor: '#003366',
                color: '#fff',
                cursor: 'pointer',
                textDecoration: 'none',
                '&:hover': { backgroundColor: '#0059b3', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }
              }}
              component={Link}
              to="/view-suppliers"
            >
              <Typography>View Supplier</Typography>
            </Paper>
          </Box>
        )}

        {/* Purchase Order Section */}
        <Box 
          onClick={handlePurchaseOrderClick} 
          sx={{ display: 'block', color: 'inherit', padding: '10px 0', cursor: 'pointer' }}
        >
          <Typography>Purchase Order</Typography>
        </Box>

        {showPurchaseOrderOptions && (
          <Box sx={{ paddingLeft: 1, marginTop: '1px' }}>
            <Paper
              elevation={1}
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '5px',
                marginBottom: '5px',
                backgroundColor: '#003366',
                color: '#fff',
                cursor: 'pointer',
                textDecoration: 'none',
                '&:hover': { backgroundColor: '#0059b3', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }
              }}
              component={Link}
              to="/create-orders"
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
                backgroundColor: '#003366',
                color: '#fff',
                cursor: 'pointer',
                textDecoration: 'none',
                '&:hover': { backgroundColor: '#0059b3', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }
              }}
              component={Link}
              to="/view-orders"
            >
              <Typography>View Purchase Order</Typography>
            </Paper>
          </Box>
        )}

        {/* User Section */}
        <Box 
          onClick={handleUserClick} 
          sx={{ display: 'block', color: 'inherit', padding: '10px 0', cursor: 'pointer' }}
        >
          <Typography>User</Typography>
        </Box>

        {showUserOptions && (
          <Box sx={{ paddingLeft: 1, marginTop: '1px' }}>
            <Paper
              elevation={1}
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '5px',
                marginBottom: '5px',
                backgroundColor: '#003366',
                color: '#fff',
                cursor: 'pointer',
                textDecoration: 'none',
                '&:hover': { backgroundColor: '#0059b3', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }
              }}
              component={Link}
              to="/adduser"
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
                backgroundColor: '#003366',
                color: '#fff',
                cursor: 'pointer',
                textDecoration: 'none',
                '&:hover': { backgroundColor: '#0059b3', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }
              }}
              component={Link}
              to="/viewuser"
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