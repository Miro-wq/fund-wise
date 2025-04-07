import React from 'react';
import { Container, Paper, Typography, List, ListItem, ListItemText, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

function HowToUse() {
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
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton
                    onClick={handleClose}
                >
                    <CloseIcon />
                </IconButton>
                </Box>
                <Typography variant="h4" align="center" gutterBottom>
                    How to use!
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Here is how to use ExpenseTracker:
                </Typography>
                <List>
                    <ListItem>
                        <ListItemText
                            primary="Press the + button to add a new expense."
                            secondary="Enter the expense name and amount, then press the 'Add' button."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="View your expenses in the History page."
                            secondary="You can also filter by date, amount, and category."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Use the Dark Mode toggle to switch between light and dark themes."
                            secondary="The theme will be saved in local storage."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="The app is responsive and works on both mobile and desktop."
                            secondary="The app is also accessible for users with disabilities."
                        />
                    </ListItem>
                    {/* etc*/}
                </List>
                <Typography variant="body2" align="center" color="textSecondary">
                    © 2023 ExpenseTracker. All rights reserved.
                </Typography>
            </Paper>
        </Container>
    );
}

export default HowToUse;
