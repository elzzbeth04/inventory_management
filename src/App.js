import React, { useState } from 'react';
import { Box, Stack } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/sidebar';
import Dashboard from './components/dashboard';
import AddUser from './components/user/adduser';
import ViewUser from './components/user/viewuser';
import AddProduct from './components/product/addproduct';
import ViewProduct from './components/product/viewprodct'
import './App.css';
import './index.css';


const App = () => {
  return (
    <Router>
      <Stack direction="row" sx={{ height: '100vh' }}>
        {/* Sidebar */}
        <Box sx={{ width: '16.67%', backgroundColor: '#003366' }}>
          <Sidebar />
        </Box>

        {/* Content area */}
        <Box  sx={{ width: '83.33%' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/adduser" element={<AddUser />} />
            <Route path="/viewuser" element={<ViewUser />} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/viewproduct" element={<ViewProduct />} />
            {/* Add other routes as necessary */}
          </Routes>
        </Box>
      </Stack>
    </Router>
  );
};

export default App;


