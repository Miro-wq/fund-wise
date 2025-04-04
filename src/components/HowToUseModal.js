import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

function HowToUseModal({ open, handleClose }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>How to use this app</DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          Welcome to ExpenseTracker! Here are some instructions on how to use the app:
        </Typography>
        <Typography variant="body2">
          1. Set your monthly income and utilities on the Home page.
        </Typography>
        <Typography variant="body2">
          2. Add your expenses using the form.
        </Typography>
        <Typography variant="body2">
          3. Check your expense history and view charts.
        </Typography>
        <Typography variant="body2">
          4. Use the bottom navigation on mobile to quickly switch between pages.
        </Typography>
        {/* mai multe instrucțiuni in jos */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="primary">
          Got it!
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default HowToUseModal;
