"use client";

import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function CircularIndeterminate() {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}
    >
      <CircularProgress />
      <p style={{ color: 'white', marginTop: '16px' }}>Generating your personalized itinerary...</p>
    </Box>
  );
}

export default CircularIndeterminate;
