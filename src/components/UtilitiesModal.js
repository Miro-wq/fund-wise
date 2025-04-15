import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Paper,
  Grid,
  TextField
} from '@mui/material';

function UtilitiesModal({
  open,
  onClose,
  onSave,
  localRent,
  setLocalRent,
  localWater,
  setLocalWater,
  localGas,
  setLocalGas,
  localElectricity,
  setLocalElectricity,
  localInternet,
  setLocalInternet,
  localTV,
  setLocalTV,
  localPhone,
  setLocalPhone,
  localBank,
  setLocalBank,
}) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Introduceți utilități lunare</DialogTitle>
      <DialogContent>
        <Paper elevation={0} sx={{ p: 2 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Chirie"
                type="number"
                variant="outlined"
                fullWidth
                value={localRent}
                onChange={(e) => setLocalRent(e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Apă"
                type="number"
                variant="outlined"
                fullWidth
                value={localWater}
                onChange={(e) => setLocalWater(e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Gaz"
                type="number"
                variant="outlined"
                fullWidth
                value={localGas}
                onChange={(e) => setLocalGas(e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Electricitate"
                type="number"
                variant="outlined"
                fullWidth
                value={localElectricity}
                onChange={(e) => setLocalElectricity(e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Internet"
                type="number"
                variant="outlined"
                fullWidth
                value={localInternet}
                onChange={(e) => setLocalInternet(e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="TV"
                type="number"
                variant="outlined"
                fullWidth
                value={localTV}
                onChange={(e) => setLocalTV(e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Telefon"
                type="number"
                variant="outlined"
                fullWidth
                value={localPhone}
                onChange={(e) => setLocalPhone(e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Bancă"
                type="number"
                variant="outlined"
                fullWidth
                value={localBank}
                onChange={(e) => setLocalBank(e.target.value)}
              />
            </Grid>
          </Grid>
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Anulează</Button>
        <Button onClick={onSave} variant="contained" color="primary">
          Salvează
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UtilitiesModal;
