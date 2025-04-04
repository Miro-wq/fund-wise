// src/components/IncomeModal.js
import React, { useContext, useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { ExpenseContext } from '../context/ExpenseContext';

function IncomeModal({ open, onClose }) {
  const { salary, extraIncome, setSalary, setExtraIncome } = useContext(ExpenseContext);
  
  //pt stari temporare pentru input, inițial preluate din context
  const [tempSalary, setTempSalary] = useState(salary);
  const [tempExtraIncome, setTempExtraIncome] = useState(extraIncome);

  //actualizez starile temporare când valorile din context se schimbă
  useEffect(() => {
    setTempSalary(salary);
  }, [salary]);

  useEffect(() => {
    setTempExtraIncome(extraIncome);
  }, [extraIncome]);

  const handleSave = () => {
    setSalary(tempSalary);
    setExtraIncome(tempExtraIncome);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Update Income</DialogTitle>
      <DialogContent dividers>
        <TextField
          label="Monthly Income"
          type="number"
          fullWidth
          margin="normal"
          value={tempSalary || ''}
          onChange={(e) => setTempSalary(e.target.value)}
        />
        <TextField
          label="Additional Income"
          type="number"
          fullWidth
          margin="normal"
          value={tempExtraIncome || ''}
          onChange={(e) => setTempExtraIncome(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default IncomeModal;
