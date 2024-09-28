import React, { useState } from 'react';
import { Box, Stack } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/sidebar';
import Dashboard from './components/dashboard';
import AddUser from './components/user/adduser';
import ViewUser from './components/user/viewuser';
import './styles.css';

const App = () => {
  return (
    <Router>
      <Stack direction="row" sx={{ height: '100vh' }}>
        {/* Sidebar */}
        <Box sx={{ width: '16.67%', backgroundColor: '#003366' }}>
          <Sidebar />
        </Box>

        {/* Content area */}
        <Box sx={{ width: '83.33%' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/adduser" element={<AddUser />} />
            <Route path="/viewuser" element={<ViewUser />} />
            {/* Add other routes as necessary */}
          </Routes>
        </Box>
      </Stack>
    </Router>
  );
};

export default App;


/*import React from 'react';
import { Box, Stack } from '@mui/material';
import Sidebar from './components/sidebar';
import Dashboard from './components/dashboard';
<<<<<<< Updated upstream
import AddUser from './components/AddUser';
import './styles.css';
=======
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddProduct from './components/product/addproduct';
import ViewProduct from './components/product/viewprodct'
import './App.css';
import './index.css';
>>>>>>> Stashed changes

const App = () => {
  return (
    <Router>
    <Stack direction="row" sx={{ height: '100vh' }}>
      
      <Box sx={{ width: '16.67%', backgroundColor: '#003366' }}>
        <Sidebar />
      </Box>

<<<<<<< Updated upstream
      
      <Box sx={{ width: '83.33%' }}>
        <Dashboard />
=======
      {/* Dashboard */}
      <Box sx={{ width: '83.33%', backgroundColor: '#f4f4f4' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/viewproduct" element={<ViewProduct />} />
        </Routes>
>>>>>>> Stashed changes
      </Box>
    </Stack>
  </Router>
  );
};

export default App;*/
