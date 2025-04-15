import React, { useState, useEffect, useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { ExpenseContext } from '../context/ExpenseContext';
import axios from 'axios';

function TodayReminderModal() {
  const { token } = useContext(ExpenseContext);
  const [todayReminder, setTodayReminder] = useState(null);
  const [open, setOpen] = useState(false);

  const todayLocaleStr = new Date().toLocaleDateString();
  const todayDateStr = new Date().toDateString();

  useEffect(() => {
    const dismissedDate = localStorage.getItem('reminderDismissed');
    if (dismissedDate === todayDateStr) return;

    axios.get('/api/notes', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        const notes = res.data.notes || [];
        const reminder = notes.find(n => n.startsWith(`Memento (${todayLocaleStr})`));
        if (reminder) {
          setTodayReminder(reminder);
          setOpen(true);
        }
      })
      .catch(err => console.error("Error fetching notes:", err));
  }, [token, todayLocaleStr, todayDateStr]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDismissForToday = () => {
    localStorage.setItem('reminderDismissed', todayDateStr);
    setOpen(false);
  };

  if (!todayReminder) return null;

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Memento pentru astăzi</DialogTitle>
      <DialogContent dividers>
        <Typography variant="body1">{todayReminder}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="primary">
          Închide
        </Button>
        <Button onClick={handleDismissForToday} variant="contained" color="primary">
          Nu-mi mai arăta azi
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default TodayReminderModal;
