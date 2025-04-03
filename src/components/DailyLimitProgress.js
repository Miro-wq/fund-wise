import React from 'react';
import { LinearProgress, Box, Typography } from '@mui/material';

function DailyLimitProgress({ currentExpense, dailyLimit }) {
  //procent de completare
  const progressValue = dailyLimit > 0 ? (currentExpense / dailyLimit) * 100 : 0;

  return (
    <Box sx={{ width: '100%', my: 2 }}>
      <Typography variant="body2" color="textSecondary" sx={{
        mb: 2, background: 'rgb(219 234 254)', padding: '5px', textAlign: 'center', borderRadius: '5px', color: (theme) =>
          theme.palette.mode === 'dark' ? '#000' : undefined
      }}>
        {currentExpense} RON spent today from {dailyLimit} RON ( {progressValue.toFixed(0)}% )
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
