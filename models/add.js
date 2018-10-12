const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Add = new Schema(
  {
    title: {
      type: String
    },
    price: {
        type: Number
    },
    description: {
      type: String
    },
    order: {
      interval: String,
      duration: Number,
      metric: String,
      total: Number
    },
    image: {
      type: String
    }
  },
  {
    collection: 'adds'
  });

module.exports = mongoose.model('Add', Add);
