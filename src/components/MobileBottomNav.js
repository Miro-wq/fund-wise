import React, { useState, useContext } from 'react';
import {
    BottomNavigation,
    BottomNavigationAction,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
} from '@mui/material';
import { ExpenseContext } from '../context/ExpenseContext';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import HistoryIcon from '@mui/icons-material/History';

function MobileBottomNav() {
    const { addExpense } = useContext(ExpenseContext);
    const [value, setValue] = useState(0);
    const [openModal, setOpenModal] = useState(false);

    const [expenseName, setExpenseName] = useState('');
    const [expenseAmount, setExpenseAmount] = useState('');

    const handleAddExpense = (e) => {
        e.preventDefault();
        if (expenseName && expenseAmount && Number(expenseAmount) > 0) {
            addExpense(expenseName, expenseAmount);
            setExpenseName("");
            setExpenseAmount("");
        }
        setOpenModal(false);
    };

    return (
        <>
            <Paper
                sx={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 2000,
                    display: { xs: 'block', md: 'none' },
                }}
                elevation={3}
            >
                <BottomNavigation
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    showLabels
                >
                    <BottomNavigationAction
                        label="Acasă"
                        icon={<HomeIcon />}
                        component={Link}
                        to="/"
                    />
                    <BottomNavigationAction
                        label="Adaugă"
                        icon={<AddIcon />}
                        onClick={() => setOpenModal(true)}
                    />
                    <BottomNavigationAction
                        label="Istoric"
                        icon={<HistoryIcon />}
                        component={Link}
                        to="/history"
                    />
                </BottomNavigation>
            </Paper>

            <Dialog open={openModal} onClose={() => setOpenModal(false)}>
                <DialogTitle>Adăugați cheltuieli noi</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Nume cheltuială"
                        fullWidth
                        sx={{ mb: 2, mt: 1 }}
                        value={expenseName}
                        onChange={(e) => setExpenseName(e.target.value)}
                    />
                    <TextField
                        label="Sumă"
                        type="number"
                        fullWidth
                        value={expenseAmount}
                        onChange={(e) => setExpenseAmount(e.target.value)}
                    />
                    {/*se poate adăuga și alte câmpuri(ex: categorie) */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenModal(false)}>Anulează</Button>
                    <Button variant="contained" onClick={handleAddExpense}>
                        Salvează
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default MobileBottomNav;
