const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newSchema = new Schema({
  title: String,
  content: String,
  date: Date,
  cover: String
});

module.exports = mongoose.model('drafts', newSchema);