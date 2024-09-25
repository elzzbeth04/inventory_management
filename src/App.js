import React from 'react';
import { Box, Stack } from '@mui/material';
import Sidebar from './components/sidebar';
import Dashboard from './components/dashboard';

const App = () => {
  return (
    <Stack direction="row" sx={{ height: '100vh' }}>
      {/* Sidebar */}
      <Box sx={{ width: '16.67%', backgroundColor: '#003366' }}>
        <Sidebar />
      </Box>

      {/* Dashboard */}
      <Box sx={{ width: '83.33%' }}>
        <Dashboard />
      </Box>
    </Stack>
  );
}

export default App;
