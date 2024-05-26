const express = require('express');
const Router = express.Router();
const authController = require('../controllers/authController');

Router.post('/signup', authController.registerUser);
Router.post('/login', authController.loginUser);

module.exports = Router;