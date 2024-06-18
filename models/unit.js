const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const unitSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    isActive:{
        type: Boolean,
        default:true,
    }

}, {timestamps: true})

const Unit = mongoose.model('unit', unitSchema);
module.exports = Unit;