const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newSchema = new Schema({
  title: String,
  content: String,
  category: String
});

module.exports = mongoose.model('new', newSchema);