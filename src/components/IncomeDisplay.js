import React, { useState } from 'react';
import { Box } from '@mui/material';
import IncomeModal from './IncomeModal';
import { useTheme, useMediaQuery } from '@mui/material';

export default function IncomeDisplay({ netIncome, salary }) {
  const [openIncomeModal, setOpenIncomeModal] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Box onClick={() => isMobile && setOpenIncomeModal(true)} sx={{ cursor: isMobile ? 'pointer' : 'default' }}>
          Net Monthly Income: {salary ? netIncome.toFixed(2) : ""} RON
      </Box>

      <IncomeModal open={openIncomeModal} onClose={() => setOpenIncomeModal(false)} />
    </>
  );
}
