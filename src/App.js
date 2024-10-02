import React, { useState } from 'react';
import { Box, Stack } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/sidebar';
import Dashboard from './components/dashboard';
import AddUser from './components/user/adduser';
import ViewUser from './components/user/viewuser';
import AddProduct from './components/product/addproduct';
import ViewProduct from './components/product/viewprodct';
import SupplierTable from './components/product/suppliers/supplierstable';
import CreateSupplier from './components/product/suppliers/createsupplier';
import ViewSuppliers from './components/product/suppliers/viewsuppliers';
import ViewOrder from './components/order/vieworder';
import CreateOrder from './components/order/createorder';
import './App.css';
import './index.css';
import Reports from './components/reports';

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
            {/* Routes from first version */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/adduser" element={<AddUser />} />
            <Route path="/viewuser" element={<ViewUser />} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/viewproduct" element={<ViewProduct />} />
            
            {/* Routes from second version */}
            <Route path="/create-suppliers" element={<CreateSupplier />} />
            <Route path="/view-suppliers" element={<ViewSuppliers />} />
            <Route path="/view-orders" element={<ViewOrder />} />
            <Route path="/create-orders" element={<CreateOrder />} />
          </Routes>
        </Box>
      </Stack>
    </Router>
  );
};

export default App;
