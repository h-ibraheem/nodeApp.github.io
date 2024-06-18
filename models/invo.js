const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invoSchema = new Schema({
    invoNo: Number,
    invoDate: Date,
    customerNo: Number,
    amount: Number,
    vat: Number,
    net : Number

}, {timestamps:true});

const Invo = mongoose.model('invo', invoSchema);
module.exports = Invo;