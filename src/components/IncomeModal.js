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
      <DialogTitle>Actualizați veniturile</DialogTitle>
      <DialogContent dividers>
        <TextField
          label="Venit lunar"
          type="number"
          fullWidth
          margin="normal"
          value={tempSalary || ''}
          onChange={(e) => setTempSalary(e.target.value)}
        />
        <TextField
          label="Venituri suplimentare"
          type="number"
          fullWidth
          margin="normal"
          value={tempExtraIncome || ''}
          onChange={(e) => setTempExtraIncome(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Anulează</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Salvează
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default IncomeModal;
