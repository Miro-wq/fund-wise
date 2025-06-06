require('dotenv').config({ path: process.env.NODE_ENV !== 'production' ? './backend/.env' : undefined });
const serverless = require('serverless-http');
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('../../models/User');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

//conectare la MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB via Netlify Function"))
  .catch(err => console.error("Error connecting to MongoDB:", err));


//=========authenticate===============================
//middleware de autentificare
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

//endpoint pentru login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

//endpoint pentru înregistrare
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    //verifică dacă utilizatorul există deja
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    //creează un nou utilizator
    const newUser = new User({ username, password });
    await newUser.save();
    //token JWT pentru noul utilizator
    const token = jwt.sign({ id: newUser._id, username: newUser.username }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: newUser });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
//=====================================================


//endpoint pentru preluarea datelor pentru luna curentă
app.get('/api/data', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({
      salary: user.salary,
      extraIncome: user.extraIncome,
      rent: user.rent,
      water: user.water,
      gas: user.gas,
      electricity: user.electricity,
      internet: user.internet,
      tv: user.tv,
      phone: user.phone,
      bank: user.bank,
      expenses: user.expenses,
      user: { username: user.username }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

//endpoint pentru actualizarea salariului
app.post('/api/salary', authMiddleware, async (req, res) => {
  const { salary } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.user.id, { salary }, { new: true });
    res.json({ salary: user.salary });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


//=========functii netlify reset si note===============================
//netlify/functions/api.js
app.post('/api/reset', authMiddleware, async (req, res) => {
  console.log("Received body:", req.body);
  const { salary, extraIncome, rent, water, gas, electricity, internet, tv, phone, bank } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (typeof salary !== 'undefined') user.salary = salary;
    if (typeof extraIncome !== 'undefined') user.extraIncome = Number(extraIncome);
    if (typeof rent !== 'undefined') user.rent = Number(rent);
    if (typeof water !== 'undefined') user.water = Number(water);
    if (typeof gas !== 'undefined') user.gas = Number(gas);
    if (typeof electricity !== 'undefined') user.electricity = Number(electricity);
    if (typeof internet !== 'undefined') user.internet = Number(internet);
    if (typeof tv !== 'undefined') user.tv = Number(tv);
    if (typeof phone !== 'undefined') user.phone = Number(phone);
    if (typeof bank !== 'undefined') user.bank = Number(bank);
    user.expenses = [];
    user.notes = [];
    await user.save();
    res.json({ message: 'Income and utilities updated, expenses reset.' });
  } catch (err) {
    console.error("Error in /api/reset:", err);
    res.status(500).json({ message: 'Server error during reset.' });
  }
});


//===========endpoint pentru adăugarea de note si middleware===============================
app.post('/api/notes', authMiddleware, async (req, res) => {
  console.log("Received note:", req.body);
  const { note } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    //adauga nota în arrayul de note
    user.notes.push(note);
    await user.save();
    res.json({ message: 'Note added successfully', notes: user.notes });
  } catch (err) {
    console.error("Error in /api/notes:", err);
    res.status(500).json({ message: 'Server error while adding note' });
  }
});

app.get('/api/notes', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ notes: user.notes });
  } catch (err) {
    console.error("Error in GET /api/notes:", err);
    res.status(500).json({ message: 'Server error while fetching notes' });
  }
});

app.delete('/api/notes', authMiddleware, async (req, res) => {
  const { noteIndex } = req.body; //indexul notei de șters
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    //sterge nota din array-ul user.notes
    user.notes.splice(noteIndex, 1);
    await user.save();
    res.json({ message: 'Note deleted successfully', notes: user.notes });
  } catch (err) {
    console.error("Error in DELETE /api/notes:", err);
    res.status(500).json({ message: 'Server error during note deletion.' });
  }
});
//=====================================================


//===========reminders=========================================
app.post('/api/reminder', authMiddleware, async (req, res) => {
  console.log("Received reminder:", req.body);
  const { date, reminder } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    user.notes.push(`Memento (${new Date(date).toLocaleDateString()}): ${reminder}`);
    await user.save();
    res.json({ message: 'Reminder added successfully', notes: user.notes });
  } catch (err) {
    console.error("Error in /api/reminder:", err);
    res.status(500).json({ message: 'Server error during reminder addition.' });
  }
});
//==========================================================


//endpoint pentru adăugarea unei cheltuieli
app.post('/api/expenses', authMiddleware, async (req, res) => {
  const { name, amount } = req.body;
  try {
    const user = await User.findById(req.user.id);
    user.expenses.push({ name, amount });
    await user.save();
    res.json({ expenses: user.expenses });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

//handler pentru Netlify
module.exports.handler = serverless(app);
