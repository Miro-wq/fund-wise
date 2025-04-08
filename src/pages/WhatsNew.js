import React from 'react';
import { Container, Paper, Typography, List, ListItem, ListItemText, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

function WhatsNew() {
    const navigate = useNavigate();

    const handleClose = () => {
        //daca este istoric suficient, înapoi; altfel, fallback la "/login" (sau "/register")
        if (window.history.length > 2) {
            navigate(-1);
        } else {
            navigate('/login');
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                    <IconButton
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Typography variant="h4" align="center" gutterBottom>
                    What's New!
                </Typography>
                <Typography variant="body1" align="center" gutterBottom>
                    Here are the latest updates and new functionalities in ExpenseTracker:
                </Typography>
                <Typography variant='body1' sx={{
                    color: (theme) =>
                        theme.palette.mode === 'dark' ? 'undefined' : 'rgb(255 0 0)', background: (theme) =>
                            theme.palette.mode === 'dark' ? '#26436d' : '#f5f5f5', padding: '10px', textAlign: 'center', borderRadius: '5px'
                }}>
                    Before using the app, please read the "How to Use" section for a detailed guide.

                </Typography>
                <List>
                    <ListItem>
                        <ListItemText
                            primary="New Dark Mode Enhancements"
                            secondary="- Improved styling for dark mode, including a new logo."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Mobile Bottom Navigation with Quick Add Expense Button"
                            secondary="- A new fixed bottom navigation for mobile devices provides easy access to Home, History, and Add Expense."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Instructions"
                            secondary="- A quick view page with instructions on how to use the app now appears upon your first visit to the Home page, and can be accessed later on either the Home or History page."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Improved Filters"
                            secondary="- New filters for expenses including date, amount, and category have been added."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Calendar Function Added"
                            secondary="- A calendar function has been added for quick and easy date searches."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Daily Limit Notification Added"
                            secondary="- When you exceed your daily limit, a prompt alert notification will appear. You can postpone the notification for one day or dismiss it temporarily, but it will reappear when you return to the app."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Upcoming Translations:"
                            secondary="- Soon, translations into multiple languages will be implemented, allowing the app to be displayed in your preferred language."
                        />
                    </ListItem>
                </List>
                <Typography variant="body2" align="center" color="textSecondary">
                    Stay tuned for more updates!
                </Typography>
            </Paper>
        </Container>
    );
}

export default WhatsNew;
