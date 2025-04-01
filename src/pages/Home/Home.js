import React, { useContext, useState, useEffect } from 'react';
import { ExpenseContext } from '../../context/ExpenseContext';
import axios from 'axios';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Grid, Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import UtilitiesModal from '../../components/UtilitiesModal';

function Home() {
  const {
    user,
    salary,
    extraIncome,
    token,
    setSalary,
    setExtraIncome,
    addExpense,
    expenses,
    rent,
    water,
    gas,
    electricity,
    internet,
    tv,
    phone,
  } = useContext(ExpenseContext);

  //state pentru salariu și venit suplimentar
  const [localSalary, setLocalSalary] = useState(salary || "");
  const [localExtraIncome, setLocalExtraIncome] = useState(extraIncome || "");

  //state pentru utilități (valori locale înainte de a fi salvate)
  const [localRent, setLocalRent] = useState("");
  const [localWater, setLocalWater] = useState("");
  const [localGas, setLocalGas] = useState("");
  const [localElectricity, setLocalElectricity] = useState("");
  const [localInternet, setLocalInternet] = useState("");
  const [localTV, setLocalTV] = useState("");
  const [localPhone, setLocalPhone] = useState("");

  //state pentru noua cheltuială
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");

  const [openUtilitiesModal, setOpenUtilitiesModal] = useState(false);

  //calcularea totalului utilităților din context (cele salvate în DB)
  // const totalUtilities =
  //   Number(rent) +
  //   Number(water) +
  //   Number(gas) +
  //   Number(electricity) +
  //   Number(internet) +
  //   Number(tv) +
  //   Number(phone);

  //venit net lunar = salariu - utilități + venit suplimentar
  // const netIncome = Number(localSalary) - totalUtilities + Number(localExtraIncome);
  
  //venit net lunar = salariu + venit suplimentar (fără utilități)
  const netIncome = Number(localSalary) + Number(localExtraIncome);
  const dailyLimit = netIncome / 30 || 0;

  //calcul total pt ziua curentă
  const today = new Date();
  const totalExpensesToday = expenses
    .filter(exp => {
      const expDate = new Date(exp.date);
      return expDate.toDateString() === today.toDateString();
    })
    .reduce((acc, e) => acc + e.amount, 0);

  useEffect(() => {
    if (salary) {
      setLocalSalary(salary);
    }
  }, [salary]);

  useEffect(() => {
    setLocalExtraIncome(extraIncome);
  }, [extraIncome]);

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (dailyLimit > 0 && totalExpensesToday > dailyLimit) {
      setOpenModal(true);
    }
  }, [dailyLimit, totalExpensesToday]);

  //salveaz salariul și utilitățile în DB
  const handleSalarySubmit = (e) => {
    e.preventDefault();
    if (localSalary) {
      axios.post('/api/reset', {
        salary: localSalary,
        extraIncome: localExtraIncome,
        rent: localRent,
        water: localWater,
        gas: localGas,
        electricity: localElectricity,
        internet: localInternet,
        tv: localTV,
        phone: localPhone
      }, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(() => {
          //actualizează contextul după reset
          setSalary(localSalary);
          setExtraIncome(localExtraIncome);
        })
        .catch(err => console.error(err));
    }
  };

  const handleSaveUtilities = () => {
    axios.post('/api/reset', {
      salary: localSalary,
      extraIncome: localExtraIncome,
      rent: localRent,
      water: localWater,
      gas: localGas,
      electricity: localElectricity,
      internet: localInternet,
      tv: localTV,
      phone: localPhone,
    }, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        setSalary(localSalary);
        setExtraIncome(localExtraIncome);
        setOpenUtilitiesModal(false);
      })
      .catch(err => console.error(err));
  };

  //adaugă o cheltuială nouă
  const handleAddExpense = (e) => {
    e.preventDefault();
    if (expenseName && expenseAmount && Number(expenseAmount) > 0) {
      addExpense(expenseName, expenseAmount);
      setExpenseName("");
      setExpenseAmount("");
    }
  };

  return (
    <>
      <Typography variant="subtitle1" align="right" gutterBottom sx={{ mb: 0, pr: 3 }}>
        Signed in as: {user?.username}
      </Typography>
      <Container maxWidth={false} sx={{
        mt: 2,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
      }}
      >
        <Box sx={{ mr: { xs: 0, md: 3 } }}>
          <Paper elevation={3} sx={{ p: 4, mb: 3 }}>
            <Typography variant="h5" align="left" gutterBottom>
              Monthly Overview
            </Typography>

            <p style={{ color: 'rgb(255 0 0)', marginBottom: '10px', background: '#f5f5f5', padding: '10px', textAlign: 'center', borderRadius: '5px' }}>Before inserting new income, please export your expenses as a PDF from the History page.</p>

            <Typography variant="h6" gutterBottom>
              Set Monthly Income and Utilities
            </Typography>

            <Box component="form" onSubmit={handleSalarySubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Monthly Income"
                type="number"
                variant="outlined"
                value={localSalary}
                onChange={(e) => setLocalSalary(e.target.value)}
                required
              />

              <p style={{ color: 'rgb(255 0 0)', background: '#f5f5f5', padding: '10px', textAlign: 'center', borderRadius: '5px' }}>CAUTION! new income or extra income will reset all expenses and history!</p>

              <TextField label="Extra Income" type="number" variant="outlined" value={localExtraIncome} onChange={(e) => setLocalExtraIncome(e.target.value)} />
            </Box>
          </Paper>


          <Paper elevation={3} sx={{ p: 4, mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Utilities (paid at the beginning of the month)
            </Typography>
            
        <Box component="form" onSubmit={() => {}} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => setOpenUtilitiesModal(true)}
          >
            Click to add monthly utilities
          </Button>
          {/* Afișează utilitățile introduse (dacă există) */}
          {rent || water || gas || electricity || internet || tv || phone ? (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1">
                Utilities: Rent: {rent}, Water: {water}, Gas: {gas}, Electricity: {electricity}, Internet: {internet}, TV: {tv}, Phone: {phone}
              </Typography>
            </Box>
          ) : null}
          <Button type="submit" variant="contained" color="primary">
            Save Income & Utilities
          </Button>
        </Box>


            <Button type="submit" variant="contained" sx={{ mt: 2 }} color="primary">
              Save
            </Button>
          </Paper>
        </Box>

        <Box>
          <Paper elevation={3} sx={{ p: 4, mb: 3 }}>
            <Typography variant="h6">
              Daily Limit: {localSalary ? dailyLimit.toFixed(2) : ""} RON
            </Typography>
            <Typography variant="subtitle1">
              Net Monthly Income: {localSalary ? netIncome.toFixed(2) : ""} RON
            </Typography>
            <Typography variant="subtitle2">
              Total Expenses for Today: {expenses.length > 0 ? totalExpensesToday : 0} RON
            </Typography>
          </Paper>

          <Paper elevation={3} sx={{ p: 4, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Add New Expense
            </Typography>
            <Box component="form" onSubmit={handleAddExpense} sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <TextField
                label="Expense Name"
                variant="outlined"
                value={expenseName}
                onChange={(e) => setExpenseName(e.target.value)}
                required
              />
              <TextField
                label="Amount"
                type="number"
                variant="outlined"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
                required
              />
              <Button type="submit" variant="contained" color="primary">
                Add Expense
              </Button>
            </Box>
          </Paper>
        </Box>

        <Dialog open={openModal} onClose={() => setOpenModal(false)}>
          <DialogTitle>Daily limit exceeded</DialogTitle>
          <DialogContent>
            <Typography>
              You've exceeded your daily spending limit! Please review your expenses.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenModal(false)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
        <UtilitiesModal
        open={openUtilitiesModal}
        onClose={() => setOpenUtilitiesModal(false)}
        onSave={handleSaveUtilities}
        localRent={localRent}
        setLocalRent={setLocalRent}
        localWater={localWater}
        setLocalWater={setLocalWater}
        localGas={localGas}
        setLocalGas={setLocalGas}
        localElectricity={localElectricity}
        setLocalElectricity={setLocalElectricity}
        localInternet={localInternet}
        setLocalInternet={setLocalInternet}
        localTV={localTV}
        setLocalTV={setLocalTV}
        localPhone={localPhone}
        setLocalPhone={setLocalPhone}
      />
      </Container>
    </>
  );
}

export default Home;
