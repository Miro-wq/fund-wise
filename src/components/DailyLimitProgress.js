import React from 'react';
import { LinearProgress, Box, Typography } from '@mui/material';

function DailyLimitProgress({ currentExpense, dailyLimit }) {
  //procent de completare
  const progressValue = dailyLimit > 0 ? (currentExpense / dailyLimit) * 100 : 0;

  return (
    <Box sx={{ width: '100%', my: 2 }}>
      <Typography variant="body2" color="textSecondary" sx={{
        mb: 2, backgroundColor: '#212830', padding: '5px', textAlign: 'center', borderRadius: '5px', border: '1px solid #424c5d', color: '#fff'
      }}>
        {currentExpense} RON cheltuiți astăzi din {dailyLimit} RON ( {progressValue.toFixed(0)}% )
      </Typography>
      <LinearProgress
        variant="determinate"
        value={progressValue}
        sx={{ height: 10, borderRadius: 5 }}
      />
    </Box>
  );
}

export default DailyLimitProgress;
