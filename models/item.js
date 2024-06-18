const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    category: {
        type: String,
        require: true,
    }
},{
    timestamps: true
});

const Item = mongoose.model('item', itemSchema);
module.exports = Item;
