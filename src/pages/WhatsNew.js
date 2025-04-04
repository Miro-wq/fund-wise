// src/pages/WhatsNew/WhatsNew.js
import React from 'react';
import { Container, Paper, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

function WhatsNew() {
    const navigate = useNavigate();

    const handleClose = () => {
        //daca este istoric suficient, mergi înapoi; altfel, fallback la "/login" (sau "/register")
        if (window.history.length > 2) {
            navigate(-1);
        } else {
            navigate('/login');
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, position: 'relative' }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <IconButton
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        top: 5,
                        right: 30,
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <Typography variant="h4" align="center" gutterBottom>
                    What's New!
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Here are the latest updates and new functionalities in ExpenseTracker:
                </Typography>
                <List>
                    <ListItem>
                        <ListItemText
                            primary="New Dark Mode Enhancements"
                            secondary="Improved styling for dark mode with custom theme overrides."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Mobile Bottom Navigation"
                            secondary="A new fixed bottom navigation on mobile for easy access to Home, History and Add Expense."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Instructions Modal"
                            secondary="A modal with instructions on how to use the app now appears on first visit to the Home page."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Improved Filters"
                            secondary="New filters for expenses including date, amount, and category have been added."
                        />
                    </ListItem>
                    {/* Adaugă sau modifică item-urile după cum dorești */}
                </List>
                <Typography variant="body2" align="center" color="textSecondary">
                    Stay tuned for more updates!
                </Typography>
            </Paper>
        </Container>
    );
}

export default WhatsNew;
