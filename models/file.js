let mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let FileSchema = new Schema({
  bytes: { type: String },
  contentType: {type: String}}, {strict: false});


module.exports = mongoose.model('files', FileSchema);
