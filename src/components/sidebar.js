import React, { useState } from 'react';
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
        <ListItem button component={Link} to="/reports">
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

const Sidebar = () => {
  return (
    <Box sx={{ backgroundColor: '#003366', height: '100vh', color: '#fff', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        IMS
      </Typography>
      <Avatar alt="John Doe" src="https://via.placeholder.com/150" />
      <Typography variant="body1" gutterBottom>John Doe</Typography>
      
      <List>
        <ListItem button>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Reports" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Product" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Supplier" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Purchase Order" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="User" />
        </ListItem>
      </List>
    </Box>
  );
}

export default Sidebar;
*/