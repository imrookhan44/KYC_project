const mongoose = require('mongoose');
const formSchema = new mongoose.Schema({
  frontId: String,
  backId: String,
  walletAddress: String,
  gmail: String,
});

const KycFormModel = mongoose.model('KycForm', formSchema);
module.exports = KycFormModel;