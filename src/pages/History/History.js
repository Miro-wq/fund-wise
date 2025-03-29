import React, { useContext, useState, useMemo } from 'react';
import { ExpenseContext } from '../../context/ExpenseContext';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from '@mui/material';
import ExpenseLineChart from '../../components/ExpenseLineChart';
import exportPDF from '../../components/Export';

function History() {
  const { expenses, salary, extraIncome } = useContext(ExpenseContext);

  //stări pentru filtre
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minValue, setMinValue] = useState('');
  const [maxValue, setMaxValue] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

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
      return true;
    });
  }, [expenses, searchTerm, selectedCategory, minValue, maxValue, startDate, endDate]);

  //extrage categoriile unice pentru dropdown
  const categories = useMemo(() => {
    const cats = expenses.map(exp => exp.category).filter(Boolean);
    return [...new Set(cats)];
  }, [expenses]);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {/* <Typography variant="h4" align="center" gutterBottom>
        Istoric Cheltuieli
      </Typography> */}
      
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6">
        Monthly Income: {salary} RON | Additional income: {extraIncome} RON
        </Typography>
      </Paper>
      
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" color="primary" onClick={() => exportPDF(expenses)}>
          Export PDF
        </Button>
      </Box>

      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
        Filter Expenses
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Search by name"
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              displayEmpty
              fullWidth
              variant="outlined"
            >
              <MenuItem value="">
                <em>All categories</em>
              </MenuItem>
              {categories.map((cat, index) => (
                <MenuItem key={index} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Minimum value"
              variant="outlined"
              fullWidth
              type="number"
              value={minValue}
              onChange={(e) => setMinValue(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Maximum value"
              variant="outlined"
              fullWidth
              type="number"
              value={maxValue}
              onChange={(e) => setMaxValue(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="From date"
              variant="outlined"
              fullWidth
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="To date"
              variant="outlined"
              fullWidth
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
      </Paper>

      {expenses.length === 0 ? (
        <Typography variant="body1">
          No expense data available. Please add some expenses to see the history.
        </Typography>
      ) : (
        <>
          <ExpenseLineChart expenses={expenses} />
          {filteredExpenses.length === 0 ? (
            <Typography variant="body1">
              No expense data available.
            </Typography>
          ) : (
            <Paper elevation={3} sx={{ mt: 3, p: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Amount (RON)</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Date</TableCell>
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
            </Paper>
          )}
        </>
      )}
    </Container>
  );
}

export default History;
