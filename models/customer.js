const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    country: String,
    mobile: String,
    email: String,
    note: String,
    imgUrl: String,
  },
  { timestamps: true }
);

const Customer = mongoose.model("customer", customerSchema);
module.exports = Customer;