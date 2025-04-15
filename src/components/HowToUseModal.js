import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';

function HowToUseModal({ open, handleClose }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Cum să folosești această aplicație</DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          Bine ați venit! Iată câteva instrucțiuni despre cum să utilizați aplicația:
        </Typography>
        <Box sx={{
          color: (theme) =>
            theme.palette.mode === 'dark' ? 'undefined' : 'rgb(255 0 0)',
          background: (theme) =>
            theme.palette.mode === 'dark' ? '#26436d' : '#f5f5f5',
          padding: '10px',
          mb: 2,
          textAlign: 'center',
          borderRadius: '5px'
        }}>
          <Typography variant='body1'>ATENȚIE!</Typography>
          <Typography variant='body1'>
            De fiecare dată când reintroduci salariul sau venitul suplimentar, toate cheltuielile și notițele vor fi resetate. Pentru a evita pierderea datelor, exportă cheltuielile din luna curentă în format PDF din pagina Istoric.
          </Typography>
        </Box>
        <Typography variant="body1" gutterBottom>
          1. Setați-vă venitul lunar și utilitățile pe pagina de pornire.
        </Typography>
        <Typography variant='body2' gutterBottom>(doar pentru versiunea mobilă) - Apasă pe câmpul albastru 'Venit lunar net'. Acesta va deschide o secțiune în care poți introduce venitul lunar și venitul suplimentar. Apasă pe 'Salvează' pentru a confirma.</Typography>

        <Typography variant="body1" gutterBottom>
          2. Adăugați cheltuielile folosind formularul.
        </Typography>
        <Typography variant="body2" gutterBottom>După ce ai apăsat 'Salvează' pentru venit, secțiunea se va închide. Urmează secțiunea 'Apăsați pentru adăugare'. Apasă pe buton pentru a deschide o altă secțiune în care poți introduce utilitățile. După introducerea datelor, apasă pe butonul 'Salvează' pentru a salva.</Typography>

        <Typography variant='body1' gutterBottom>
          3. Finalizarea veniturilor și utilităților
        </Typography>
        <Typography variant='body2' gutterBottom>
          După ce ai introdus atât venitul, cât și utilitățile, apasă pe butonul 'Salvează veniturile și utilitățile' pentru a salva salariul lunar, venitul suplimentar și utilitățile.
        </Typography>
        <Typography variant='body2' gutterBottom>
          NOTĂ: Dacă nu apeși butonul 'Salvează veniturile și utilitățile', datele introduse NU vor fi salvate.
        </Typography>

        <Typography variant="body1" gutterBottom>
          4. Secțiunea Notițe îți permite să adaugi notițe pentru referințe viitoare.
        </Typography>

        <Typography variant="body1" gutterBottom>
          5. Utilizați navigarea de jos pentru mobil pentru a comuta rapid între pagini.
        </Typography>
        <Typography variant="body2" gutterBottom>
          În partea de jos a ecranului vei găsi trei butoane: Acasă, Adaugă și Istoric. Butonul din mijloc ( + ) îți permite să adaugi rapid cheltuieli. Butonul 'Acasă' te duce înapoi la pagina principală, iar butonul 'Istoric' îți permite să vizualizezi istoricul cheltuielilor.
        </Typography>

        <Typography variant="body1" gutterBottom>
          Pentru detalii suplimentare, va rugăm consultați pagina 'Ajutor' din aplicație.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="primary">
          Am înţeles!
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default HowToUseModal;
