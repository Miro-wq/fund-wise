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
        <Container maxWidth="md" sx={{ mt: 4, mb: 10 }}>
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
                <Typography variant="body1" align="center" gutterBottom>
                    Here is how to use ExpenseTracker:
                </Typography>
                <Box sx={{
                    color: (theme) =>
                        theme.palette.mode === 'dark' ? 'undefined' : 'rgb(255 0 0)', background: (theme) =>
                            theme.palette.mode === 'dark' ? '#26436d' : '#f5f5f5', padding: '10px', textAlign: 'center', borderRadius: '5px'
                }}>
                    <Typography variant='body1'>ATTENTION!</Typography>
                    <Typography variant='body1'>Each time you re-enter your salary or additional income, all expenses and notes will be reset. To avoid losing data, export the current month's expenses as a PDF from the History page.</Typography>
                </Box>
                <List>
                    <ListItem>
                        <ListItemText
                            primary="Entering Monthly Income:"
                            secondary="(for the mobile version only) - Tap the blue Net Monthly Income field. This will open a section where you can enter your monthly income and any additional income. Press SAVE to confirm."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Adding Monthly Utilities:"
                            secondary="- Once you press SAVE for the income, the section will close. Next, proceed to the CLICK TO ADD MONTHLY UTILITIES section. Tap the button to open another section where you can enter your utilities. After entering the data, press the SAVE button."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Finalizing Income & Utilities:"
                            secondary="- After completing both the income and utilities entries, press the SAVE INCOME & UTILITIES button to record your monthly salary, additional income, and utilities. NOTE: If you do not press this button, your entered data will not be saved."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="The Notes section allows you to add notes for future reference:"
                            secondary="- You can add further notes such as shopping lists or other planned expenses as needed."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Bottom Navigation Bar:"
                            secondary="- At the bottom of the screen, you’ll find three buttons: Home, Add, and History. The middle button ( + ) allows you to quickly add expenses. The Home button takes you back to the main page, and the History button allows you to view your expenses history."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Home Page Overview:"
                            secondary="- On the Home page, three sections are displayed: Your entered monthly income, Expenses for the current day, Your daily spending limit (calculated over 30 days) and Notes. The Daily Limit Progress section shows your progress towards your daily limit."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            secondary="If you exceed your Daily Limit, a notification will alert you. This notification can be postponed for one day or closed with the CLOSE button (which only dismisses it once). Upon reopening the app, the notification will reappear if the limit is still exceeded."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="History Page Overview:"
                            secondary="- The History page displays your Monthly Income, Additional Income, and an export of the current month’s expenses. Below these details, there is an advanced search filter to locate specific expenses. After performing a search, press the CLEAR FILTER button to reset the search criteria. Additionally, you can use the calendar on the History page to find expenses on specific days. After using the calendar, press the CLEAR DATE FILTER button to reset the calendar filter."
                        />
                    </ListItem>
                </List>
                <Typography variant="body2" align="center" color="textSecondary">
                    © 2023 ExpenseTracker. All rights reserved.
                </Typography>
            </Paper>
        </Container>
    );
}

export default HowToUse;
