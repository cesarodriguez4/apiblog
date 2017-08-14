const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newSchema = new Schema({
  title: String,
  content: String,
  category: Number,
  language: Number,
  date: Date,
  cover: String
});

module.exports = mongoose.model('new', newSchema);