import React, { useState, useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import axios from 'axios';
import { ExpenseContext } from '../context/ExpenseContext';

function ReminderModal({ open, onClose, selectedDate }) {
    const { token } = useContext(ExpenseContext);
    const [reminderText, setReminderText] = useState("");

    const handleSave = () => {
        //trimite reminderul către endpointul din backend
        axios.post(
            '/api/reminder',
            { date: selectedDate, reminder: reminderText },
            { headers: { Authorization: `Bearer ${token}` } }
        )
            .then((res) => {
                console.log("Reminder saved:", res.data);
                setReminderText("");
                onClose();
            })
            .catch((err) => console.error("Error saving reminder:", err));
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>
                Adăugați un memento pentru {new Date(selectedDate).toLocaleDateString()}
            </DialogTitle>
            <DialogContent dividers>
                <TextField
                    label="Textul mementoului"
                    fullWidth
                    multiline
                    rows={3}
                    value={reminderText}
                    onChange={(e) => setReminderText(e.target.value)}
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

export default ReminderModal;
