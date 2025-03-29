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
  Grid
} from '@mui/material';

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

  //calcularea totalului utilităților din context (cele salvate în DB)
  const totalUtilities =
    Number(rent) +
    Number(water) +
    Number(gas) +
    Number(electricity) +
    Number(internet) +
    Number(tv) +
    Number(phone);

  //venit net lunar = salariu - utilități + venit suplimentar
  const netIncome = Number(localSalary) - totalUtilities + Number(localExtraIncome);
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

  useEffect(() => {
    console.log('dailyLimit:', dailyLimit, 'totalExpensesToday:', totalExpensesToday);
    if (dailyLimit > 0 && totalExpensesToday > dailyLimit) {
      if (Notification.permission === 'granted') {
        new Notification('Ai depășit limita zilnică de cheltuieli!');
      } else {
        console.log('Notificările nu sunt permise.');
      }
    }
  }, [totalExpensesToday, dailyLimit]);

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
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h6" align="right" gutterBottom>
        {user?.username}
      </Typography>

      <Typography variant="h5" align="center" gutterBottom>
        Monthly Overview
      </Typography>

      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
      <p style={{ color: 'rgb(255 0 0)' , marginBottom: '10px', background: '#f5f5f5', padding: '10px', textAlign: 'center', borderRadius: '5px' }}>Before inserting new income, please export your expenses as a PDF from the History page.</p>
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

          <Typography variant="subtitle1" gutterBottom>
            Utilities (paid at the beginning of the month)
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Rent"
                type="number"
                variant="outlined"
                value={localRent}
                onChange={(e) => setLocalRent(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Water"
                type="number"
                variant="outlined"
                value={localWater}
                onChange={(e) => setLocalWater(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Gas"
                type="number"
                variant="outlined"
                value={localGas}
                onChange={(e) => setLocalGas(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Electricity"
                type="number"
                variant="outlined"
                value={localElectricity}
                onChange={(e) => setLocalElectricity(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Internet"
                type="number"
                variant="outlined"
                value={localInternet}
                onChange={(e) => setLocalInternet(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="TV"
                type="number"
                variant="outlined"
                value={localTV}
                onChange={(e) => setLocalTV(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone"
                type="number"
                variant="outlined"
                value={localPhone}
                onChange={(e) => setLocalPhone(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
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

      <Paper elevation={3} sx={{ p: 4 }}>
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
    </Container>
  );
}

export default Home;
