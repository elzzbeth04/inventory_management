import React, { useState } from 'react';
import { List, Avatar, Typography, Box, Paper } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [showProductOptions, setShowProductOptions] = useState(false);
  const [showUserOptions, setShowUserOptions] = useState(false);
  const [showSupplierOptions, setShowSupplierOptions] = useState(false);
  const [showPurchaseOrderOptions, setShowPurchaseOrderOptions] = useState(false);

  const handleProductClick = () => {
    setShowProductOptions(!showProductOptions);
  };

  const handleUserClick = () => {
    setShowUserOptions(!showUserOptions);
  };

  const handleSupplierClick = () => {
    setShowSupplierOptions(!showSupplierOptions);
  };

  const handlePurchaseOrderClick = () => {
    setShowPurchaseOrderOptions(!showPurchaseOrderOptions);
  };

  return (
    <Box sx={{ backgroundColor: '#003366', height: '100vh', color: '#fff', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        IMS
      </Typography>
      <Avatar alt="John Doe" src="https://via.placeholder.com/150" />
      <Typography variant="body1" gutterBottom>John Doe</Typography>

      <List sx={{ paddingTop: 2 }}>
        <Link to="/" style={{ display: 'block', color: 'inherit', padding: '10px 0', textDecoration: 'none' }}>
          <Box sx={{ padding: '10px 0', color: 'inherit' }}>Dashboard</Box>
        </Link>

        <Box 
          onClick={handleProductClick} 
          sx={{ display: 'block', color: 'inherit', padding: '10px 0', cursor: 'pointer' }}
        >
          <Typography>Product</Typography>
        </Box>
        
        {showProductOptions && (
          <Box sx={{ paddingLeft: 1, marginTop: '1px' }}>
            {/* Add Product */}
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
              to="/addproduct"  // Link to Add Product page
            >
              {/* <AddCircleOutlineIcon sx={{ marginRight: '4px' }} /> */}
              <Typography>Add Product</Typography>
            </Paper>

            {/* View Product */}
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
              to="/viewproduct"  // Link to View Product page
            >
              {/* <VisibilityIcon sx={{ marginRight: '4px' }} /> */}
              <Typography>View Product</Typography>
            </Paper>
          </Box>
        )}

        <Box 
          onClick={handleSupplierClick} 
          sx={{ display: 'block', color: 'inherit', padding: '10px 0', cursor: 'pointer' }}
        >
          <Typography>Supplier</Typography>
        </Box>

        {showSupplierOptions && (
          <Box sx={{  paddingLeft: 1, marginTop: '1px' }}>
            {/* Add Supplier */}
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
              to="/addsupplier"  // Link to Add Supplier page
            >
              {/* <AddCircleOutlineIcon sx={{ marginRight: '10px' }} /> */}
              <Typography>Add Supplier</Typography>
            </Paper>

            {/* View Supplier */}
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
              to="/viewsupplier"  // Link to View Supplier page
            >
              {/* <VisibilityIcon sx={{ marginRight: '10px' }} /> */}
              <Typography>View Supplier</Typography>
            </Paper>
          </Box>
        )}

        <Box 
          onClick={handlePurchaseOrderClick} 
          sx={{ display: 'block', color: 'inherit', padding: '10px 0', cursor: 'pointer' }}
        >
          <Typography>Purchase Order</Typography>
        </Box>

        {showPurchaseOrderOptions && (
          <Box sx={{  paddingLeft: 1, marginTop: '1px' }}>
            {/* Add Purchase Order */}
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
              to="/addpurchaseorder"  // Link to Add Purchase Order page
            >
              {/* <AddCircleOutlineIcon sx={{ marginRight: '10px' }} /> */}
              <Typography>Add Purchase Order</Typography>
            </Paper>

            {/* View Purchase Order */}
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
              to="/viewpurchaseorder"  // Link to View Purchase Order page
            >
              {/* <VisibilityIcon sx={{ marginRight: '10px' }} /> */}
              <Typography>View Purchase Order</Typography>
            </Paper>
          </Box>
        )}

        <Box 
          onClick={handleUserClick} 
          sx={{ display: 'block', color: 'inherit', padding: '10px 0', cursor: 'pointer' }}
        >
          <Typography>User</Typography>
        </Box>

        {showUserOptions && (
          <Box sx={{  paddingLeft: 1, marginTop: '1px' }}>
            {/* Add User */}
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
                '&:hover': { backgroundColor: '#0059b3',  }
              }}
              component={Link}
              to="/adduser"  // Link to Add User page
            >
              {/* <AddCircleOutlineIcon sx={{ marginRight: '10px' }} /> */}
              <Typography>Add User</Typography>
            </Paper>

            {/* View User */}
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
              to="/viewuser"  // Link to View User page
            >
              {/* <VisibilityIcon sx={{ marginRight: '10px' }} /> */}
              <Typography>View User</Typography>
            </Paper>
          </Box>
        )}
      </List>
    </Box>
  );
};

export default Sidebar;
