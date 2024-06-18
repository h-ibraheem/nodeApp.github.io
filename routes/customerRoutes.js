const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.get("/", customerController.customerIndex);

router.get("/addCustomer", customerController.customerCreate);

router.post("/", customerController.customerSave);

router.get('/details/:id', customerController.customerDetails)

router.delete('/:id', customerController.customerDelete)


module.exports = router;