import React, { useState } from 'react';
import { Box, Stack } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/sidebar';
import Dashboard from './components/dashboard';
import AddUser from './components/user/adduser';
import ViewUser from './components/user/viewuser';
import AddProduct from './components/product/addproduct';
import ViewProduct from './components/product/viewprodct';
import CreateSupplier from './components/product/suppliers/createsupplier';
import ViewSuppliers from './components/product/suppliers/viewsuppliers';
import ViewOrder from './components/order/vieworder';
import CreateOrder from './components/order/createorder';
import Homepage from './components/Homepage'; 
import LoginPage from './components/LoginPage';
import './App.css';
import './index.css';
import UserManagement from './components/product/UserManagement '; 

const App = () => {
  return (
    <Router>
<<<<<<< Updated upstream
    <Stack direction="row" sx={{ height: '100vh' }}>
      {/* Sidebar */}
      <Box sx={{ width: '16.67%', backgroundColor: '#003366' }}>
        <Sidebar />
      </Box>
  
      {/* Authenticated Routes */}
      <Routes>
        <Route
          path="/dashboard"
          element={
            <AuthenticatedLayout>
              <Dashboard />
            </AuthenticatedLayout>
          }
        />
        <Route
          path="/reports"
          element={
            <AuthenticatedLayout>
              <Reports />
            </AuthenticatedLayout>
          }
        />
        <Route
          path="/adduser"
          element={
            <AuthenticatedLayout>
              <AddUser />
            </AuthenticatedLayout>
          }
        />
        <Route
          path="/viewuser"
          element={
            <AuthenticatedLayout>
              <ViewUser />
            </AuthenticatedLayout>
          }
        />
        <Route
          path="/addproduct"
          element={
            <AuthenticatedLayout>
              <AddProduct />
            </AuthenticatedLayout>
          }
        />
        <Route
          path="/viewproduct"
          element={
            <AuthenticatedLayout>
              <ViewProduct />
            </AuthenticatedLayout>
          }
        />
        <Route
          path="/create-suppliers"
          element={
            <AuthenticatedLayout>
              <CreateSupplier />
            </AuthenticatedLayout>
          }
        />
        <Route
          path="/view-suppliers"
          element={
            <AuthenticatedLayout>
              <ViewSuppliers />
            </AuthenticatedLayout>
          }
        />
        <Route
          path="/view-orders"
          element={
            <AuthenticatedLayout>
              <ViewOrder />
            </AuthenticatedLayout>
          }
        />
        <Route
          path="/create-orders"
          element={
            <AuthenticatedLayout>
              <CreateOrder />
            </AuthenticatedLayout>
          }
        />
      </Routes>
    </Stack>
  </Router>
=======
      {/* <UserManagement /> */}
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
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/viewproduct" element={<ViewProduct />} />
            {/* Add other routes as necessary */}
          </Routes>
        </Box>
      </Stack>
    </Router>
>>>>>>> Stashed changes
  );
};

export default App;
