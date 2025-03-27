const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  salary: { type: Number, default: 0 },
  extraIncome: { type: Number, default: 0 },
  expenses: [ExpenseSchema]
});

module.exports = mongoose.model('User', UserSchema);
