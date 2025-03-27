require('dotenv').config({ path: './backend/.env' });
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
      return res.status(400).json({ message: 'Utilizatorul există deja' });
    }
    //creează un nou utilizator
    const newUser = new User({ username, password });
    await newUser.save();
    //token JWT pentru noul utilizator
    const token = jwt.sign({ id: newUser._id, username: newUser.username }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: newUser });
  } catch (err) {
    res.status(500).json({ message: 'Eroare pe server' });
  }
});

//endpoint pentru preluarea datelor pentru luna curentă
app.get('/api/data', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ salary: user.salary, expenses: user.expenses });
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

//netlify/functions/api.js
app.post('/api/reset', authMiddleware, async (req, res) => {
  const { salary } = req.body;
  try {
    const user = await User.findById(req.user.id);
    user.salary = salary;
    user.expenses = [];
    await user.save();
    res.json({ message: 'Reset complet. Salariu nou și expenses goale.' });
  } catch (err) {
    res.status(500).json({ message: 'Eroare la reset' });
  }
});

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
