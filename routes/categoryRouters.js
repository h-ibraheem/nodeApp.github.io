const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/', categoryController.categoryIndex);

router.get('/create', categoryController.categoryCreate);

router.post('/', categoryController.categorySave);

router.get('/details/:id', categoryController.categoryDetails);

router.delete('/:id', categoryController.categoryDelete);

module.exports = router; 
