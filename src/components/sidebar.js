import React, { useState } from 'react';
<<<<<<< Updated upstream
import { List, ListItem, ListItemText, Avatar, Typography, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material'; // Corrected to import from @mui/material

const Sidebar = () => {
  // State to manage the dropdown menu for 'User'
  const [open, setOpen] = useState(false);

  // Function to toggle the dropdown menu
  const handleClick = () => {
    setOpen(!open); // Toggle the 'open' state
  };

  return (
    <Box sx={{ backgroundColor: '#003366', height: '100vh', color: '#fff', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        IMS
      </Typography>
      <Avatar alt="John Doe" src="https://via.placeholder.com/150" />
      <Typography variant="body1" gutterBottom>John Doe</Typography>
      
      <List>
        <ListItem button>
          <ListItemText primary="Dashboard" sx={{ color: '#fff' }} />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Reports" sx={{ color: '#fff' }} />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Product" sx={{ color: '#fff' }} />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Supplier" sx={{ color: '#fff' }} />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Purchase Order" sx={{ color: '#fff' }} />
        </ListItem>

        {/* User Dropdown */}
        <ListItem button onClick={handleClick}>
          <ListItemText primary="User" sx={{ color: '#fff' }} />
          {open ? <ExpandLess sx={{ color: '#fff' }} /> : <ExpandMore sx={{ color: '#fff' }} />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button component={Link} to="/adduser">
              <ListItemText primary="Add User" sx={{ color: '#fff', paddingLeft: '20px' }} />
            </ListItem>
            <ListItem button component={Link} to="/viewuser">
              <ListItemText primary="View User" sx={{ color: '#fff', paddingLeft: '20px' }} />
            </ListItem>
          </List>
        </Collapse>
      </List>
    </Box>
  );
}

export default Sidebar;



/*import React from 'react';
import { List, ListItem, ListItemText, Avatar, Typography } from '@mui/material';
import { Box } from '@mui/system';
=======
import { Avatar, Typography, List, Box, Paper } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
>>>>>>> Stashed changes

const Sidebar = () => {
  const [showProductOptions, setShowProductOptions] = useState(false);

  const handleProductClick = () => {
    setShowProductOptions(!showProductOptions);
  };

  return (
    <Box sx={{ backgroundColor: '#003366', height: '100vh', color: '#fff', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        IMS
      </Typography>
      <Avatar alt="John Doe" src="https://via.placeholder.com/150" />
      <Typography variant="body1" gutterBottom>John Doe</Typography>
      
      <List sx={{ paddingTop: 2 }}>
        <Box component="a" href="#dashboard" sx={{ display: 'block', color: 'inherit', padding: '10px 0', textDecoration: 'none', '&:hover': { textDecoration: 'none' } }}>
          Dashboard
        </Box>
        <Box 
          component="div" 
          onClick={handleProductClick} 
          sx={{ display: 'block', color: 'inherit', padding: '10px 0', textDecoration: 'none', cursor: 'pointer', '&:hover': { textDecoration: 'none' } }}
        >
          Product
        </Box>
        {showProductOptions && (
          <Box sx={{ paddingLeft: 2, marginTop: '10px' }}>
            {/* Add Product */}
            <Paper
              elevation={3}
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px',
                marginBottom: '10px',
                backgroundColor: '#004080',
                color: '#fff',
                cursor: 'pointer',
                textDecoration: 'none',  // Remove underline
                '&:hover': { backgroundColor: '#0059b3', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }
              }}
              component="a"
              href="/addproduct"  // Link to Add Product page
            >
              <AddCircleOutlineIcon sx={{ marginRight: '10px' }} />
              <Typography>Add Product</Typography>
            </Paper>

            {/* View Product */}
            <Paper
              elevation={3}
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px',
                backgroundColor: '#004080',
                color: '#fff',
                cursor: 'pointer',
                textDecoration: 'none',  // Remove underline
                '&:hover': { backgroundColor: '#0059b3', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }
              }}
              component="a"
              href="/viewproduct"  // Link to View Product page
            >
              <VisibilityIcon sx={{ marginRight: '10px' }} />
              <Typography>View Product</Typography>
            </Paper>
          </Box>
        )}
        <Box component="a" href="#supplier" sx={{ display: 'block', color: 'inherit', padding: '10px 0', textDecoration: 'none', '&:hover': { textDecoration: 'none' } }}>
          Supplier
        </Box>
        <Box component="a" href="#purchase-order" sx={{ display: 'block', color: 'inherit', padding: '10px 0', textDecoration: 'none', '&:hover': { textDecoration: 'none' } }}>
          Purchase Order
        </Box>
        <Box component="a" href="#user" sx={{ display: 'block', color: 'inherit', padding: '10px 0', textDecoration: 'none', '&:hover': { textDecoration: 'none' } }}>
          User
        </Box>
      </List>
    </Box>
  );
}

export default Sidebar;
*/