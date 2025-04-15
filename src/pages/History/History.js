import React, { useContext, useState, useMemo } from 'react';
import { ExpenseContext } from '../../context/ExpenseContext';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Box,
} from '@mui/material';
import { Calendar } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import ExpenseLineChart from '../../components/ExpenseLineChart';
import exportPDF from '../../components/Export';
import { Link } from 'react-router-dom';
import UserDisplay from '../../components/UserDisplay';

function History() {
  const { user, expenses, salary, extraIncome } = useContext(ExpenseContext);

  //stări pentru filtre
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minValue, setMinValue] = useState('');
  const [maxValue, setMaxValue] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [selectedDate, setSelectedDate] = useState(null);

  //filtru avansat
  const filteredExpenses = useMemo(() => {
    return expenses.filter(exp => {
      //filtru după nume
      if (searchTerm && !exp.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      //filtru după categorie
      if (selectedCategory && exp.category !== selectedCategory) {
        return false;
      }
      //filtru după valoare minimă
      if (minValue && exp.amount < Number(minValue)) {
        return false;
      }
      //filtru după valoare maximă
      if (maxValue && exp.amount > Number(maxValue)) {
        return false;
      }
      //filtru după interval de date
      if (startDate) {
        const expDate = new Date(exp.date);
        if (expDate < new Date(startDate)) return false;
      }
      if (endDate) {
        const expDate = new Date(exp.date);
        if (expDate > new Date(endDate)) return false;
      }
      if (selectedDate) {
        const expDate = new Date(exp.date);
        const pickedDate = new Date(selectedDate);
        if (expDate.toDateString() !== pickedDate.toDateString()) {
          return false;
        }
      }
      return true;
    });
  }, [expenses, searchTerm, selectedCategory, minValue, maxValue, startDate, endDate, selectedDate]);

  //extrage categoriile unice pentru dropdown
  const categories = useMemo(() => {
    const cats = expenses.map(exp => exp.category).filter(Boolean);
    return [...new Set(cats)];
  }, [expenses]);

  return (
    <>
      <Box sx={(theme) => ({
        display: 'flex', justifyContent: 'space-around', alignItems: 'center', pb: 3, borderBottom: theme.palette.mode === 'dark'
          ? '2px solid #333c45'
          : '2px solid #f5f5f5',
      })}>
        <Link to="/how-to-use">
          <Button variant="contained" color="primary" sx={{ textTransform: 'capitalize'}} >ajutor!</Button>
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
              Venit
            </Typography>

            <Typography variant="subtitle1" sx={{
              m: 0, fontWeight: 'bold', background: 'rgb(208 229 255)', padding: '1rem', textAlign: 'center', borderRadius: '5px', mt: 2, color: (theme) =>
                theme.palette.mode === 'dark' ? '#000' : undefined
            }}>
              Venit lunar: {salary} RON
            </Typography>

            <Typography variant="subtitle1" sx={{
              m: 0, fontWeight: 'bold', background: 'rgb(255 207 236)', padding: '1rem', textAlign: 'center', borderRadius: '5px', mt: 2, color: (theme) =>
                theme.palette.mode === 'dark' ? '#000' : undefined
            }}>
              Venituri suplimentare: {extraIncome} RON
            </Typography>
          </Paper>

          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" color="primary" onClick={() => exportPDF(expenses)}>
              Exportă PDF
            </Button>
          </Box>

          <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
              Filtrați cheltuielile
            </Typography>
            <Typography variant="subtitle1" gutterBottom sx={{ mb: 2, fontWeight: 'bold' }}>
              Interval de date
            </Typography>

            <Box sx={{ mb: 3, display: 'flex', gap: '16px' }}>
              <TextField
                label="Din"
                variant="outlined"
                fullWidth
                type="date"
                value={startDate || ''}
                onChange={(e) => setStartDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Până la"
                variant="outlined"
                fullWidth
                type="date"
                value={endDate || ''}
                onChange={(e) => setEndDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Box>

            <Typography variant="subtitle1" gutterBottom sx={{ mb: 2, fontWeight: 'bold' }}>
              Categorie
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                displayEmpty
                fullWidth
                variant="outlined"
              >
                <MenuItem value="">
                  <em>Toate categoriile</em>
                </MenuItem>
                {categories.map((cat, index) => (
                  <MenuItem key={index} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </Box>

            <Typography variant="subtitle1" gutterBottom sx={{ mb: 2, fontWeight: 'bold' }}>
              Interval de sume
            </Typography>

            <Box sx={{ mb: 3, display: 'flex', gap: '16px' }}>
              <TextField
                label="Valoare minimă"
                variant="outlined"
                fullWidth
                type="number"
                value={minValue || ''}
                onChange={(e) => setMinValue(e.target.value)}
              />
              <TextField
                label="Valoare maximă"
                variant="outlined"
                fullWidth
                type="number"
                value={maxValue || ''}
                onChange={(e) => setMaxValue(e.target.value)}
              />
            </Box>

            <Typography variant="subtitle1" gutterBottom sx={{ mb: 2, fontWeight: 'bold' }}>
              Cuvânt cheie
            </Typography>

            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <TextField
                label="Caută cuvânt cheie"
                variant="outlined"
                fullWidth
                value={searchTerm || ''}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Box>

            <Box>
              {(startDate || endDate || minValue || maxValue || searchTerm) && (
                <Button color="primary"
                  onClick={() => {
                    setStartDate('');
                    setEndDate('');
                    setMinValue('');
                    setMaxValue('');
                    setSearchTerm('');
                  }}
                  variant="contained"
                  sx={{ mt: 1 }}
                >
                  Ștergeți filtrele
                </Button>
              )}
            </Box>

          </Paper>

          <Paper elevation={3} sx={{ p: 2, mb: 3, mt: 3 }}>
            <ExpenseLineChart expenses={expenses} />
          </Paper>
        </Box>

        <Box>
          <Paper elevation={3} sx={{
            mt: { xs: 0, md: 0 },
            p: 2, mb: 3
          }}>
            <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                Vizualizare calendaristică
              </Typography>
              <Calendar bordered
                value={selectedDate}
                onChange={setSelectedDate}
              />
              {selectedDate && (
                <Button color="primary" onClick={() => setSelectedDate(null)} variant="contained" sx={{ mt: 1 }}>
                  Ștergeți data selectată
                </Button>
              )}
            </Box>
          </Paper>

          {expenses.length === 0 ? (
            <Paper elevation={3} sx={{ p: 2, mb: 10 }}>
              <Typography variant="body1" sx={{ textAlign: 'center' }}>
                Nu sunt disponibile date despre cheltuieli. Vă rugăm să adăugați câteva cheltuieli pentru a vedea istoricul.
              </Typography>
            </Paper>
          ) : (
            filteredExpenses.length === 0 ? (
              <Paper elevation={3} sx={{ mb: { xs: 10, md: 0 }, p: 2 }}>
                <Typography variant="body1" sx={{ textAlign: 'center' }}>
                  Nu există date disponibile după parametrul căutat!
                </Typography>
              </Paper>
            ) : (
              <Paper elevation={3} sx={{ mb: { xs: 10, md: 0 }, p: 2 }}>
                <Typography variant="subtitle1" gutterBottom sx={{ mb: 2, fontWeight: 'bold' }}>
                  Intrări cheltuieli
                </Typography>

                <TableContainer component={Paper} sx={{
                  overflowX: { xs: 'auto', md: 'unset' },
                  overflowY: { xs: 'unset', md: 'auto' },
                  maxHeight: { xs: 'unset', md: '11em' }
                }}
                >
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Nume</TableCell>
                        <TableCell>Sumă (RON)</TableCell>
                        <TableCell>Categorie</TableCell>
                        <TableCell>Dată</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredExpenses.map((exp, index) => {
                        const expDate = new Date(exp.date);
                        return (
                          <TableRow key={index}>
                            <TableCell>{exp.name}</TableCell>
                            <TableCell>{exp.amount}</TableCell>
                            <TableCell>{exp.category || "-"}</TableCell>
                            <TableCell>
                              {`${expDate.toLocaleDateString()} ${expDate.toLocaleTimeString()}`}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            )
          )}
        </Box>
      </Container>
    </>
  );

} export default History;
