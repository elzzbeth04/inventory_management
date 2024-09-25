import React from 'react';
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
