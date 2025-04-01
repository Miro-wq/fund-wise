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
}) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Enter Monthly Utilities</DialogTitle>
      <DialogContent>
        <Paper elevation={0} sx={{ p: 2 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Rent"
                type="number"
                variant="outlined"
                fullWidth
                value={localRent}
                onChange={(e) => setLocalRent(e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Water"
                type="number"
                variant="outlined"
                fullWidth
                value={localWater}
                onChange={(e) => setLocalWater(e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Gas"
                type="number"
                variant="outlined"
                fullWidth
                value={localGas}
                onChange={(e) => setLocalGas(e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Electricity"
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
                label="Phone"
                type="number"
                variant="outlined"
                fullWidth
                value={localPhone}
                onChange={(e) => setLocalPhone(e.target.value)}
              />
            </Grid>
          </Grid>
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSave} variant="contained" color="primary">
          Save Utilities
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UtilitiesModal;
