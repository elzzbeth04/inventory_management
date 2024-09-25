import React from 'react';
import { Box, Paper, Typography, Stack } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const pieOptions = {
  chart: { type: 'pie', backgroundColor: 'transparent' },
  title: { text: '' },
  series: [{
    data: [
      { name: 'Incomplete', y: 3, color: '#00e676' },
      { name: 'Pending', y: 0, color: '#ffeb3b' },
      { name: 'Complete', y: 0, color: '#ff5722' }
    ]
  }]
};

const barOptions = {
  chart: { type: 'column', backgroundColor: 'transparent' },
  title: { text: '' },
  xAxis: { categories: ['Nestle', 'Robinson'] },
  series: [{
    name: 'Product Count',
    data: [2, 2],
    colors: ['#ff1744', '#2979ff']
  }]
};

const lineOptions = {
  chart: { type: 'line', backgroundColor: 'transparent' },
  title: { text: '' },
  series: [{
    name: 'Products Delivered',
    data: [4, 2, 5, 10]
  }]
};

const Dashboard = () => {
  return (
    <Box sx={ { padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ flexWrap: 'wrap' }}>
        {/* Pie Chart */}
        <Box sx={{ flexBasis: { xs: '100%', md: '30%' } }}>
          <Paper elevation={3} sx={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Purchase Orders By Status
            </Typography>
            <HighchartsReact highcharts={Highcharts} options={pieOptions} />
          </Paper>
        </Box>

        {/* Bar Chart */}
        <Box sx={{ flexBasis: { xs: '100%', md: '30%' } }}>
          <Paper elevation={3} sx={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Product Count Assigned to Supplier
            </Typography>
            <HighchartsReact highcharts={Highcharts} options={barOptions} />
          </Paper>
        </Box>

        {/* Line Chart */}
        <Box sx={{ flexBasis: { xs: '100%', md: '30%' } }}>
          <Paper elevation={3} sx={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Delivery History Per Day
            </Typography>
            <HighchartsReact highcharts={Highcharts} options={lineOptions} />
          </Paper>
        </Box>
      </Stack>
    </Box>
  );
};

export default Dashboard;
