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
                    Ce mai este nou!
                </Typography>
                <Typography variant="body1" align="center" gutterBottom>
                    Iată cele mai recente actualizări și noi funcționalități din ExpenseTracker:
                </Typography>
                <Typography variant='body1' sx={{
                    color: (theme) =>
                        theme.palette.mode === 'dark' ? 'undefined' : 'rgb(255 0 0)', background: (theme) =>
                            theme.palette.mode === 'dark' ? '#26436d' : '#f5f5f5', padding: '10px', textAlign: 'center', borderRadius: '5px'
                }}>
                    Înainte de a utiliza aplicația, vă rugăm să citiți secțiunea "Utilizare" pentru un ghid detaliat.

                </Typography>
                <List>
                    <ListItem>
                        <ListItemText
                            primary="Îmbunătățiri noi pentru modul întunecat"
                            secondary="- Stilizare îmbunătățită pentru modul întunecat, incluzând un nou logo."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Navigare inferioară fixă pentru mobil cu buton rapid pentru adăugarea cheltuielilor"
                            secondary="- Navigare fixă în partea de jos a ecranului pentru dispozitive mobile, oferind acces rapid la Acasă, Istoric și Adaugă Cheltuială."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Instrucțiuni"
                            secondary="- O pagină de vizualizare rapidă cu instrucțiuni despre cum se utilizează aplicația apare la prima accesare a paginii Acasă și poate fi accesată ulterior din paginile Acasă sau Istoric."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Filtre îmbunătățite"
                            secondary="- Au fost adăugate noi filtre pentru cheltuieli, incluzând data, suma și categoria."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Funcție calendar adăugată"
                            secondary="- A fost adăugată o funcție de calendar pentru căutări rapide și ușoare în funcție de dată."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Notificare pentru depășirea limitei zilnice adăugată"
                            secondary="- Când depășiți limita zilnică, va apărea o notificare de avertizare promptă. Puteți amâna notificarea pentru o zi sau o puteți respinge temporar, însă aceasta va reapărea la revenirea în aplicație."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Traduceri viitoare:"
                            secondary="- În curând, vor fi implementate traduceri în mai multe limbi, permițând afișarea aplicației în limba preferată."
                        />
                    </ListItem>
                </List>
                <Typography variant="body2" align="center" color="textSecondary">
                    Rămâneți la curent pentru mai multe actualizări!
                </Typography>

            </Paper>
        </Container>
    );
}

export default WhatsNew;
