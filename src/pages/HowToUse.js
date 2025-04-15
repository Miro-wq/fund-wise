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
                    Cum se utilizează!
                </Typography>
                <Typography variant="body1" align="center" gutterBottom>
                    Iată cum se folosește ExpenseTracker:
                </Typography>
                <Box sx={{
                    color: (theme) =>
                        theme.palette.mode === 'dark' ? 'undefined' : 'rgb(255 0 0)',
                    background: (theme) =>
                        theme.palette.mode === 'dark' ? '#26436d' : '#f5f5f5',
                    padding: '10px',
                    textAlign: 'center',
                    borderRadius: '5px'
                }}>
                    <Typography variant='body1'>ATENȚIE!</Typography>
                    <Typography variant='body1'>
                        De fiecare dată când reintroduci salariul sau venitul suplimentar, toate cheltuielile și notițele vor fi resetate. Pentru a evita pierderea datelor, exportă cheltuielile din luna curentă în format PDF din pagina Istoric.
                    </Typography>
                </Box>
                <List>
                    <ListItem>
                        <ListItemText
                            primary="Introducerea venitului lunar:"
                            secondary="(doar pentru versiunea mobilă) - Apasă pe câmpul albastru 'Venit lunar net'. Acesta va deschide o secțiune în care poți introduce venitul lunar și venitul suplimentar. Apasă pe 'Salvează' pentru a confirma."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Adăugarea utilităților lunare:"
                            secondary="- După ce ai apăsat 'Salvează' pentru venit, secțiunea se va închide. Urmează secțiunea 'Apăsați pentru adăugare'. Apasă pe buton pentru a deschide o altă secțiune în care poți introduce utilitățile. După introducerea datelor, apasă pe butonul 'Salvează' pentru a salva."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Finalizarea veniturilor și utilităților:"
                            secondary="- După ce ai introdus atât venitul, cât și utilitățile, apasă pe butonul 'Salvează veniturile și utilitățile' pentru a salva salariul lunar, venitul suplimentar și utilitățile."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="NOTĂ: Dacă nu apeși butonul 'Salvează veniturile și utilitățile', datele introduse NU vor fi salvate."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Secțiunea Notițe îți permite să adaugi notițe pentru referințe viitoare:"
                            secondary="- Poți adăuga notițe suplimentare, cum ar fi liste de cumpărături sau alte cheltuieli planificate, după necesitate."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Bara de navigare inferioară fixă pentru mobil:"
                            secondary="- În partea de jos a ecranului vei găsi trei butoane: Acasă, Adaugă și Istoric. Butonul din mijloc ( + ) îți permite să adaugi rapid cheltuieli. Butonul 'Acasă' te duce înapoi la pagina principală, iar butonul 'Istoric' îți permite să vizualizezi istoricul cheltuielilor."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Prezentare generală a paginii Acasă:"
                            secondary="- Pe pagina Acasă sunt afișate: Venitul lunar net (calculat dupa introducerea venitului lunar si cel suplimentar din care se scade totalul utilităților), Cheltuielile pentru ziua curentă, Limita zilnică de cheltuieli (calculată pe 30 de zile) și Notițele. Secțiunea de progres cu limita zilnică care arată evoluția către atingerea limitei zilnice, precum și utilitățile adăugate și calculul total al utilităților."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            secondary="Dacă depășești limita zilnică, o notificare te va avertiza. Această notificare poate fi amânată pentru o zi din butonul 'Nu mai arăta astăzi' sau închisă cu butonul 'Închide' (care o respinge o singură dată) însă la redeschiderea aplicației sau întoarcerea pe pagina Acasă, notificarea va apărea din nou."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Prezentare generală a paginii Istoric:"
                            secondary="- Pe pagina Istoric sunt afișate Venitul lunar, Venitul suplimentar (introdus anterior) și opțiunea de export a cheltuielilor din luna curentă în format PDF. Sub aceste informații există un filtru de căutare avansat pentru a localiza cheltuieli specifice. După efectuarea unei căutări, apasă pe butonul 'Ștergeți filtrele' pentru a reseta criteriile. De asemenea, poți folosi calendarul din pagina Istoric pentru a găsi cheltuieli din anumite zile. După utilizarea calendarului, apasă pe butonul 'Ștergeți data selectată' pentru a reseta filtrul de dată."
                        />
                    </ListItem>
                </List>
                <Typography variant="body2" align="center" color="textSecondary">
                    © 2023 ExpenseTracker. Toate drepturile rezervate.
                </Typography>

            </Paper>
        </Container>
    );
}

export default HowToUse;
