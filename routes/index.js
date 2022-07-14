const express = require('express');
const router = express.Router();

const indexController = require('../controllers/index');

router.post('/login', indexController.login);
router.post('/register', indexController.register);


module.exports = { router };