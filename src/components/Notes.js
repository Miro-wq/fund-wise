import React, { useState, useEffect, useContext } from 'react';
import { Box, TextField, Button, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { ExpenseContext } from '../context/ExpenseContext';

function Notes() {
    const { token } = useContext(ExpenseContext);
    const [note, setNote] = useState('');
    const [notes, setNotes] = useState([]);

    //preia notitele din backend la montare
    useEffect(() => {
        axios.get('/api/notes', { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                setNotes(res.data.notes);
            })
            .catch((err) => console.error("Error fetching notes:", err));
    }, [token]);

    const handleAddNote = () => {
        if (note.trim()) {
            axios.post('/api/notes', { note: note.trim() }, { headers: { Authorization: `Bearer ${token}` } })
                .then((res) => {
                    //actualizez lista de notite din raspuns
                    setNotes(res.data.notes);
                    setNote('');
                })
                .catch((err) => console.error("Error adding note:", err));
        }
    };

    const handleDeleteNote = (index) => {
        axios.delete('/api/notes', {
            headers: { Authorization: `Bearer ${token}` },
            data: { noteIndex: index }
        })
            .then((res) => {
                setNotes(res.data.notes);
            })
            .catch((err) => console.error("Error deleting note:", err));
    };

    return (
        <Box sx={{ mt: 2 }}>
            <Typography variant="h6">Notiţe</Typography>
            <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                <TextField
                    label="Adaugă o notă"
                    variant="outlined"
                    fullWidth
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                />
                <Button variant="contained" onClick={handleAddNote}>
                    Adaugă
                </Button>
            </Box>
            {notes.length > 0 && (
                <List sx={{
                    mt: 1,
                    maxHeight: '16em',
                    overflowY: 'auto',
                    '&::-webkit-scrollbar': {
                        width: '10px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: 'rgba(255, 255, 255, 0)',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: ' #4d5359',
                        borderRadius: '4px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        background: 'rgb(158, 158, 158)',
                    },
                }}>
                    {notes.map((n, index) => (
                        <ListItem sx={(theme) => ({
                            borderBottom: theme.palette.mode === 'dark'
                                ? '2px solid #333c45'
                                : '2px solid #f5f5f5',
                        })}
                            key={index}
                            disablePadding
                            secondaryAction={
                                <IconButton edge="end" onClick={() => handleDeleteNote(index)}>
                                    <DeleteIcon />
                                </IconButton>
                            }
                        >
                            <ListItemText primary={n} sx={{
                                maxWidth: 'calc(100% - 48px)', p: 2,
                            }} />
                        </ListItem>
                    ))}
                </List>
            )}
        </Box>
    );
}

export default Notes;
