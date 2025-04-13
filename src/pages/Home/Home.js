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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import UtilitiesModal from '../../components/UtilitiesModal';
import DailyLimitProgress from '../../components/DailyLimitProgress';
import HowToUseModal from '../../components/HowToUseModal';
import IncomeDisplay from '../../components/IncomeDisplay';
import { Link } from 'react-router-dom';
import UserDisplay from '../../components/UserDisplay';
import Notes from '../../components/Notes';


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
    bank,
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
  const [localBank, setLocalBank] = useState("");

  //state pentru noua cheltuială
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");

  const [openUtilitiesModal, setOpenUtilitiesModal] = useState(false);

  //calcularea totalului utilităților din context (cele salvate în DB)
  const totalUtilities =
    Number(rent) +
    Number(water) +
    Number(gas) +
    Number(electricity) +
    Number(internet) +
    Number(tv) +
    Number(phone);
  Number(bank);

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

  const [openModal, setOpenModal] = useState(false);
  const [openInstructionsModal, setOpenInstructionsModal] = useState(false);

  useEffect(() => {
    //modal pentru limita zilnică
    const dismissedDate = localStorage.getItem("limitModalDismissed");
    const todayStr = new Date().toDateString();
    if (dailyLimit > 0 && totalExpensesToday > dailyLimit && dismissedDate !== todayStr) {
      setOpenModal(true);
    }
  }, [dailyLimit, totalExpensesToday]);

  //modal pentru instrucțiuni
  useEffect(() => {
    const hasSeen = localStorage.getItem('hasSeenInstructions');
    if (!hasSeen) {
      setOpenInstructionsModal(true);
    }
  }, []);

  const handleCloseModal = () => {
    setOpenInstructionsModal(false);
    localStorage.setItem('hasSeenInstructions', 'true');
  };
  //===================================================================================


  const handleDismissForToday = () => {
    const todayStr = new Date().toDateString();
    localStorage.setItem("limitModalDismissed", todayStr);
    setOpenModal(false);
  };

  //salveaz salariul și utilitățile în DB
  const handleSalarySubmit = (e) => {
    e.preventDefault();
    if (localSalary) {
      axios.post('/api/reset', {
        salary: localSalary,
        extraIncome: Number(localExtraIncome),
      }, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(() => {
          setSalary(localSalary);
          setExtraIncome(localExtraIncome);
        })
        .catch(err => console.error(err));
    }
  };

  const handleSaveUtilities = () => {
    axios.post(
      '/api/reset',
      {
        salary: localSalary,
        extraIncome: Number(localExtraIncome),
        rent: Number(localRent) || 0,
        water: Number(localWater) || 0,
        gas: Number(localGas) || 0,
        electricity: Number(localElectricity) || 0,
        internet: Number(localInternet) || 0,
        tv: Number(localTV) || 0,
        phone: Number(localPhone) || 0,
        bank: Number(localBank) || 0,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then(() => {
        setOpenUtilitiesModal(false);
      })
      .catch(err => console.error(err));
  };


  //cheltuiala noua
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
      <Box sx={(theme) => ({
        display: 'flex', justifyContent: 'space-around', alignItems: 'center', pb: 3, borderBottom: theme.palette.mode === 'dark'
          ? '2px solid #333c45'
          : '2px solid #f5f5f5',
      })}>
        <Link to="/how-to-use">
          <Button variant="contained" color="primary">How to use?</Button>
        </Link>
        <Typography variant="subtitle1"
          align="right"
          gutterBottom
          sx={{
            mb: 0,
            p: 0,
          }}>
          <UserDisplay username={user?.username} />
        </Typography>
      </Box>
      <Container sx={{
        mt: 2,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
      }}
      >
        <Box sx={{ mr: { xs: 0, md: 3 } }}>
          <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
            <Typography variant="h5" align="left" gutterBottom>
              Monthly Overview
            </Typography>

            <Box sx={{
              display: 'flex',
              justifyContent: 'space-around',
              gap: { xs: '0', md: '15px' },
              flexDirection: { xs: 'column', md: 'row' },
            }}>
              <Typography variant="subtitle1" sx={{
                m: 0, fontWeight: 'bold', background: 'rgb(208 229 255)', padding: '1rem', textAlign: 'center', borderRadius: '5px', mt: 2, color: (theme) =>
                  theme.palette.mode === 'dark' ? '#000' : undefined
              }}>
                <IncomeDisplay netIncome={netIncome} salary={salary} />
              </Typography>

              <Typography variant="subtitle1" sx={{
                m: 0, fontWeight: 'bold', background: 'rgb(255 212 212)', padding: '1rem', textAlign: 'center', borderRadius: '5px', mt: 2, color: (theme) =>
                  theme.palette.mode === 'dark' ? '#000' : undefined
              }}>
                Expenses for Today: {expenses.length > 0 ? totalExpensesToday : 0} RON
              </Typography>

              <Typography variant="subtitle1" sx={{
                m: 0, fontWeight: 'bold', background: 'rgb(212 255 225)', padding: '1rem', textAlign: 'center', borderRadius: '5px', mt: 2, color: (theme) =>
                  theme.palette.mode === 'dark' ? '#000' : undefined
              }}>
                Daily Limit: {localSalary ? dailyLimit.toFixed(2) : ""} RON
              </Typography>
            </Box>
          </Paper>

          <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
            <DailyLimitProgress
              currentExpense={totalExpensesToday}
              dailyLimit={dailyLimit}
            />
          </Paper>

          <Paper elevation={3} sx={{
            display: { xs: 'none', md: 'block' },
            p: 2,
            mb: 3,
          }}>
            <Typography variant="subtitle1" sx={{
              color: (theme) =>
                theme.palette.mode === 'dark' ? 'undefined' : 'rgb(255 0 0)', marginBottom: '10px', background: (theme) =>
                  theme.palette.mode === 'dark' ? '#26436d' : '#f5f5f5', padding: '10px', textAlign: 'center', borderRadius: '5px'
            }}>Before inserting new income, please export your expenses as a PDF from the History page.</Typography>

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

              <Typography variant="subtitle1" sx={{
                color: (theme) =>
                  theme.palette.mode === 'dark' ? 'undefined' : 'rgb(255 0 0)', marginBottom: '10px', background: (theme) =>
                    theme.palette.mode === 'dark' ? '#26436d' : '#f5f5f5', padding: '10px', textAlign: 'center', borderRadius: '5px'
              }}>CAUTION! new income or extra income will reset all expenses and history!</Typography>

              <TextField label="Extra Income" type="number" variant="outlined" value={localExtraIncome} onChange={(e) => setLocalExtraIncome(e.target.value)} />
            </Box>
          </Paper>
        </Box>

        <Box sx={{ maxWidth: { xs: '100%', md: '24em' } }}>
          <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Utilities (paid at the beginning of the month)
            </Typography>

            <Box component="form" onSubmit={() => { }} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                variant="outlined"
                onClick={() => setOpenUtilitiesModal(true)}
              >
                Click to add monthly utilities
              </Button>
              {rent || water || gas || electricity || internet || tv || phone || bank ? (
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ mb: 2, fontWeight: 'bold' }}>
                    Utilities:
                  </Typography>

                  <Box sx={(theme) => ({
                    borderBottom: theme.palette.mode === 'dark'
                      ? '2px solid #333c45'
                      : '2px solid #f5f5f5', mb: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
                  })}>
                    <Typography variant="body1">Rent:</Typography>
                    <Typography variant="body1" sx={{ m: 0, color: 'rgb(255 0 0)' }}>- {rent} RON</Typography>
                  </Box>

                  <Box sx={(theme) => ({
                    borderBottom: theme.palette.mode === 'dark'
                      ? '2px solid #333c45'
                      : '2px solid #f5f5f5', mb: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
                  })}>
                    <Typography variant="body1">Water:</Typography>
                    <Typography variant="body1" sx={{ m: 0, color: 'rgb(255 0 0)' }}>- {water} RON</Typography>
                  </Box>

                  <Box sx={(theme) => ({
                    borderBottom: theme.palette.mode === 'dark'
                      ? '2px solid #333c45'
                      : '2px solid #f5f5f5', mb: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
                  })}>
                    <Typography variant="body1">Gas: </Typography>
                    <Typography variant="body1" sx={{ m: 0, color: 'rgb(255 0 0)' }}>- {gas} RON</Typography>
                  </Box>

                  <Box sx={(theme) => ({
                    borderBottom: theme.palette.mode === 'dark'
                      ? '2px solid #333c45'
                      : '2px solid #f5f5f5', mb: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
                  })}>
                    <Typography variant="body1">Electricity:</Typography>
                    <Typography variant="body1" sx={{ m: 0, color: 'rgb(255 0 0)' }}>- {electricity} RON</Typography>
                  </Box>

                  <Box sx={(theme) => ({
                    borderBottom: theme.palette.mode === 'dark'
                      ? '2px solid #333c45'
                      : '2px solid #f5f5f5', mb: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
                  })}>
                    <Typography variant="body1">Internet:</Typography>
                    <Typography variant="body1" sx={{ m: 0, color: 'rgb(255 0 0)' }}>- {internet} RON</Typography>
                  </Box>

                  <Box sx={(theme) => ({
                    borderBottom: theme.palette.mode === 'dark'
                      ? '2px solid #333c45'
                      : '2px solid #f5f5f5', mb: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
                  })}>
                    <Typography variant="body1">TV: </Typography>
                    <Typography variant="body1" sx={{ m: 0, color: 'rgb(255 0 0)' }}>- {tv} RON</Typography>
                  </Box>

                  <Box sx={(theme) => ({
                    borderBottom: theme.palette.mode === 'dark'
                      ? '2px solid #333c45'
                      : '2px solid #f5f5f5', mb: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
                  })}>
                    <Typography variant="body1">Phone: </Typography>
                    <Typography variant="body1" sx={{ m: 0, color: 'rgb(255 0 0)' }}>- {phone} RON</Typography>
                  </Box>

                  <Box sx={(theme) => ({
                    borderBottom: theme.palette.mode === 'dark'
                      ? '2px solid #333c45'
                      : '2px solid #f5f5f5', mb: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
                  })}>
                    <Typography variant="body1">Bank: </Typography>
                    <Typography variant="body1" sx={{ m: 0, color: 'rgb(255 0 0)' }}>- {bank} RON</Typography>
                  </Box>

                  <Box sx={{ mb: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', }}> Total: </Typography>
                    <Typography variant="body1" sx={{ m: 0, fontWeight: 'bold' }}>{Number(rent) + Number(water) + Number(gas) + Number(electricity) + Number(internet) + Number(tv) + Number(phone) + Number(bank)} RON</Typography>
                  </Box>

                </Box>
              ) : null}
              <Button type="submit" variant="contained" color="primary">
                Save Income & Utilities
              </Button>
            </Box>
          </Paper>

          <Paper elevation={3} sx={{ p: 2, mb: { xs: 10, md: 3 } }}>
            <Notes />
          </Paper>

          <Box>
            <Paper elevation={3} sx={{ display: { xs: 'none', md: 'block' }, mb: { xs: 10, md: 0 }, p: 2 }}>
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
                  fullWidth
                />
                <TextField
                  label="Amount"
                  type="number"
                  variant="outlined"
                  value={expenseAmount}
                  onChange={(e) => setExpenseAmount(e.target.value)}
                  required
                  fullWidth
                />
                <Button type="submit" variant="contained" color="primary">
                  Add Expense
                </Button>
              </Box>
            </Paper>
          </Box>
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
            <Button onClick={handleDismissForToday} color="primary">
              Don't show again for today
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
          localBank={localBank}
          setLocalBank={setLocalBank}
        />
        <HowToUseModal open={openInstructionsModal} handleClose={handleCloseModal} />
      </Container>
    </>
  );
}

export default Home;
