const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    // name: String,
    // description: String

}, { strict: false });

const Evm = mongoose.model('EVM', itemSchema,'evm');

module.exports = Evm;
