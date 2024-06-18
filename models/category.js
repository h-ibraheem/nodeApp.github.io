const mongoose = require('mongoose');
const Schema = mongoose.Schema ;

const categotySchema = new Schema({
    name:{
        type: String,
        require : true,
    },
    details: String,
}, {timestamps: true})

const Category = mongoose.model('category', categotySchema);
module.exports = Category;