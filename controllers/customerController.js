const Customer = require("../models/customer");


const customerIndex = (req, res) => {
  Customer.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("customer/index", {customer: result, title: "All Customers"});
    })
    .catch((err) => {
      console.log(err);
    });
}

const customerCreate = (req, res) => {
  res.render("customer/addCustomer", { title: "Add New Customer" });
}

const customerSave = (req, res) => {
  const customer = new Customer(req.body);
  customer
    .save()
    .then((result) => {
      res.redirect("/customer");
    })
    .catch((err) => {
      console.log(err);
    });
}

const customerDetails =  (req, res)=>{
  const id = req.params.id;
  Customer.findById(id)
  .then((result)=> {
    res.render('customer/customerDetails', {customer: result, title:' Customer Details'})
  })
  .catch((err) =>{
    console.log(err)
  })
}

const customerDelete = (req, res)=>{
  const id = req.params.id;
  Customer.findByIdAndDelete(id)
  .then((result)=>{
    res.json({redirect:'/customer'});
  })
  .catch((err)=>{
    console.log(err);
  })
}

module.exports = {
    customerCreate, 
    customerDelete,
    customerDetails,
    customerIndex,
    customerSave
}