const express = require('express');
const Router = express.Router();
const itemController = require('../controllers/itemController')


Router.get('/', itemController.itemIndex);

Router.get('/create', itemController.itemCreate);

Router.post('/', itemController.itemSave);

Router.get('/details/:id', itemController.itemDetails);

Router.delete('/:id', itemController.itemDelete);

module.exports = Router;
